function generateDraftPool() {
    const pool = [];
    const dist = {
        [RARITIES.COMMON]: 45,
        [RARITIES.UNCOMMON]: 20,
        [RARITIES.RARE]: 10,
        [RARITIES.EPIC]: 4,
        [RARITIES.LEGENDARY]: 1
    };

    Object.keys(dist).forEach(rarity => {
        const availableCards = CardDatabase.filter(c => c.rarity === rarity && c.type !== CARD_TYPES.ENVIRONMENT); // Exclude envs to be safe, or include. Let's include everything.
        const allRarityCards = CardDatabase.filter(c => c.rarity === rarity);

        for (let i = 0; i < dist[rarity]; i++) {
            if (allRarityCards.length > 0) {
                const randomCard = allRarityCards[Math.floor(Math.random() * allRarityCards.length)];
                pool.push(randomCard.id);
            }
        }
    });

    // Shuffle pool
    return pool.sort(() => 0.5 - Math.random());
}



function claimArenaVault(wins) {
    // Escala de recompensas garantida
    const goldReward = wins * 50 + 50; // Mínimo 50, Máximo 650
    const stardustReward = wins * 20; // Mínimo 0, Máximo 240
    let packsToGive = 0;

    if (wins >= 3) packsToGive = 1;
    if (wins >= 7) packsToGive = 2;
    if (wins === 12) packsToGive = 3;

    playerProfile.coins += goldReward;
    playerProfile.stardust += stardustReward;

    // Simplificando packs dando gold extra pra comprar, ou podemos dar as cartas direto.
    // Vamos dar ouro equivalente ao pacote básico (100) pra cada pack ganho.
    playerProfile.coins += (packsToGive * 100);

    let msg = `O Cofre da Arena foi aberto! (${wins} Vitórias)\n`;
    msg += `+${goldReward + (packsToGive * 100)} Moedas `;
    if (stardustReward > 0) msg += `| +${stardustReward} Pó Estelar `;
    if (packsToGive > 0) msg += `(Inclui Bônus de Pacotes)`;

    showNotification(msg, "success");

    // Try to trigger achievement if 12 wins
    if (wins === 12) {
        const ach = playerProfile.achievements.find(a => a.id === 'a5');
        if (ach && !ach.completed) {
            ach.progress = 1;
            ach.completed = true;
            playerProfile.unlockedAvatars.push(ach.reward.value);
            showNotification(`Troféu Conquistado: ${ach.desc}!`, "success");
        }
    }

    playerProfile.arenaState = null;
    saveProfile();
    showScreenSPA('main-menu');
}


function startArenaDraft() {
    if (playerProfile.coins < 150 && !playerProfile.arenaState) {
        showNotification("Moedas insuficientes para entrar na Arena (Custo: 150 💰)", "error");
        return;
    }

    // Only charge if starting a fresh run
    if (!playerProfile.arenaState) {
        playerProfile.coins -= 150;
        playerProfile.arenaState = {
            pool: generateDraftPool(),
            deck: [],
            wins: 0,
            losses: 0,
            currentChoices: []
        };
        saveProfile();
        showNotification("Bem-vindo à Arena! Custo: 150 💰", "success");
    }

    currentMatchMode = 'draft';
    showScreenSPA('draft-screen');
    renderDraftChoices();
}


function startTurn(side) {
    gameState.turn++;

    // M6 Battery logic: Normal credits reset and increment. Remaining credits DO NOT carry over.
    // Battery only fills from specific card effects.
    const maxCred = Math.min(10, Math.ceil(gameState.turn / 2));
    gameState[side].maxCredits = maxCred;
    gameState[side].credits = maxCred;
    if (currentMatchMode === 'roguelike' && gameState.turn === 1 && side === 'player') RelicManager.triggerStartCombat();
    gameState[side].heroUsed = false;

        // Mutations Turn Hook
    if (currentMatchMode === 'endless' && side === 'player') {
        triggerEndlessMutationEvent('turn');
        if (playerProfile.endlessState.activeMutation && playerProfile.endlessState.activeMutation.id === 'toxic_spores') {
            gameState.player.board.forEach(c => { if(c) c.hp -= 1; });
            gameState.opponent.board.forEach(c => { if(c) c.hp -= 1; });
            showNotification("Esporos Tóxicos causaram 1 de dano global!", "error");
        }
    }
    drawCard(side, 1);

    // Reset attack state and trigger start-of-turn auras/environments
    gameState[side].board.forEach((card, index) => {
        if (card) {
            // Remove frozen status
            if (card.keywords && card.keywords.includes('congelado')) {
                card.keywords = card.keywords.filter(k => k !== 'congelado');
                card.exhausted = true; // Still can't attack this turn
            } else {
                card.exhausted = false;
            }

            // Env effects
            const env = gameState.environments[index];
            if (env) {
                if (env.envType === 'fire-env') {
                    card.hp -= 1;
                    triggerDamageAnimation(null, null, side, index, 1);
                } else if (env.envType === 'heal-env') {
                    card.hp += 2;
                } else if (env.envType === 'dark-env') {
                    if (!card.darkEnvTimer) card.darkEnvTimer = 1;
                    else {
                        card.hp = 0; // Dies
                    }
                }
            }

            // Aura effects
            if (card.aura) {
                if (card.aura.randomDamage) {
                    const targets = [];
                    const oppSide = side === 'player' ? 'opponent' : 'player';
                    gameState[oppSide].board.forEach((c, i) => { if(c) targets.push(i); });
                    if (targets.length > 0) {
                        const targetIdx = targets[Math.floor(Math.random() * targets.length)];
                        triggerDamageAnimation(side, index, oppSide, targetIdx, card.aura.randomDamage);
                        gameState[oppSide].board[targetIdx].hp -= card.aura.randomDamage;
                    } else {
                        triggerDamageAnimation(side, index, oppSide, null, card.aura.randomDamage);
                        gameState[oppSide].hp -= card.aura.randomDamage;
                    }
                }
                if (card.aura.healHero) {
                    gameState[side].hp = Math.min(gameState[side].maxHp, gameState[side].hp + card.aura.healHero);
                }
                if (card.aura.addBattery) {
                    gameState[side].battery += card.aura.addBattery;
                }
            }
        }
    });

    checkDeadCards();
    updateBattleUI();

    if (side === 'opponent') {
        setTimeout(botTurn, 1000);
    }
}


function endTurn() {
    if (!gameState.isPlayerTurn) return;
    gameState.isPlayerTurn = false;
    updateBattleUI();
    startTurn('opponent');
}


function playCard(laneIndex, side = 'player') {
    if (gameState.selectedCardIndex === null && side === 'player') return;

    const handIndex = side === 'player' ? gameState.selectedCardIndex : gameState.opponent.selectedCardIndex;
    const card = gameState[side].hand[handIndex];

    // Pay cost using Credits first, then Battery
    let remainingCost = card.cost;
    if (gameState[side].credits >= remainingCost) {
        gameState[side].credits -= remainingCost;
    } else {
        remainingCost -= gameState[side].credits;
        gameState[side].credits = 0;
        gameState[side].battery -= remainingCost;
    }

    if (side === 'player') {
        matchStats.creditsSpent += card.cost;
        if (card.tribes && card.tribes.length > 0) {
            matchStats.tribesPlayed[card.tribes[0]] = (matchStats.tribesPlayed[card.tribes[0]] || 0) + 1;
        }
    }

    gameState[side].hand.splice(handIndex, 1);

    if (currentMatchMode === 'roguelike') RelicManager.triggerPlayCard(card);

    AudioManager.playSFX('card_play');
    if (card.type === CARD_TYPES.TROOP) {
        if (side === 'player') matchStats.troopsPlayed++;
        card.exhausted = true; // Summoning sickness
        gameState[side].board[laneIndex] = card;

        // M6: Trigger Battlecry
        if (card.battlecry) triggerBattlecry(side, laneIndex, card.battlecry);

    } else if (card.type === CARD_TYPES.ENVIRONMENT) {
        if (side === 'player') matchStats.envPlayed++;
        gameState.environments[laneIndex] = card;

    } else if (card.type === CARD_TYPES.SECRET) {
        gameState[side].secrets.push(card);
        showNotification(`${side === 'player' ? 'Você' : 'Oponente'} jogou um Segredo!`, "info");

    } else if (card.type === CARD_TYPES.SPELL) {
        if (side === 'player') matchStats.spellsPlayed++;
        resolveSpell(side, card, laneIndex); // Pass laneIndex as target for simplicity
    }

    if (side === 'player') {
        gameState.selectedCardIndex = null;
        updateQuests('card');
        if (card.type === CARD_TYPES.SPELL) updateQuests('spell');
    }

    updateBattleUI();
}


function triggerBattlecry(side, laneIndex, battlecry) {
    if (battlecry.effect.addBattery) {
        gameState[side].battery += battlecry.effect.addBattery;
    }
    if (battlecry.effect.draw) {
        drawCard(side, battlecry.effect.draw);
    }
    // Simplification for other battlecries (random targets)
}





function endGame(isWin) {
    AudioManager.playBGM(isWin ? 'bgm_victory' : 'bgm_defeat');

    // SPA Transition is handled via showScreenSPA
    // Do NOT hide the battle screen manually here to avoid desync

    const resultsScreen = document.getElementById('game-over-overlay');
    if (resultsScreen) {
        resultsScreen.classList.remove('hidden');
    }

    const title = document.getElementById('game-over-title');
    const rewards = document.getElementById('game-over-rewards');
    const btnReturnMenu = document.getElementById('btn-return-menu');

    if (isWin) {
        if(title) { title.innerText = "VITÓRIA!"; title.style.color = "#FFD700"; }
        if(rewards) rewards.innerText = "+25 XP | +10 Moedas";

        addXP(25);
        playerProfile.coins += 10;

        // Battle Pass integration (Módulo 8.1)
        if(typeof addCrowns === 'function') addCrowns(10);
        // Grant a chest if there's an empty slot
        if (!playerProfile.chests) playerProfile.chests = [null, null, null, null];
        const emptySlotIdx = playerProfile.chests.findIndex(c => c === null);
        if (emptySlotIdx !== -1) {
            playerProfile.chests[emptySlotIdx] = { id: 'basic_chest', unlockTime: Date.now() + 30000 }; // 30 sec dummy
        }


        if (currentMatchMode === 'ranked') {
            playerProfile.elo += 25;
            playerProfile.rankedWins++;
        }

    } else {
        if(title) { title.innerText = "DERROTA"; title.style.color = "#FF4444"; }
        if(rewards) rewards.innerText = "+5 XP | +2 Moedas";

        addXP(5);
        playerProfile.coins += 2;

        // Battle Pass integration (Módulo 8.1)
        if(typeof addCrowns === 'function') addCrowns(2);

        if (currentMatchMode === 'ranked') {
            playerProfile.elo = Math.max(0, playerProfile.elo - 15);
            playerProfile.rankedLosses++;
        }
    }


    // Draft Arena End Game Logic (Módulo 9.2)
    if (currentMatchMode === 'draft') {
        const s = playerProfile.arenaState;
        if (s) {
            if (isWin) s.wins++;
            else s.losses++;

            saveProfile();

            if (s.wins >= 12 || s.losses >= 3) {
                if (rewards) rewards.innerText = `Fim da Arena! Vitórias: ${s.wins}`;
                if (btnReturnMenu) {
                    btnReturnMenu.innerText = "Resgatar Recompensas";
                    btnReturnMenu.onclick = () => {
                        if(resultsScreen) resultsScreen.classList.add('hidden');
                        claimArenaVault(s.wins);
                    };
                }
                return; // Stop default menu routing
            } else {
                if (rewards) rewards.innerText = `Vitórias: ${s.wins}/12 | Derrotas: ${s.losses}/3`;
                if (btnReturnMenu) {
                    btnReturnMenu.innerText = "Continuar Arena";
                    btnReturnMenu.onclick = () => {
                        if(resultsScreen) resultsScreen.classList.add('hidden');
                        showScreenSPA('draft-screen');
                        renderDraftChoices(); // Update UI counters
                    };
                }
                return;
            }
        }
    }

    // Endless Mode End Game Logic (Módulo 9.1)
    if (currentMatchMode === 'endless') {
        if (isWin) {
            const s = playerProfile.endlessState;
            if(!s) return;

            // Recompensa Exponencial
            let lootEarned = Math.floor(20 * Math.pow(1.15, s.currentWave));
            s.loot += lootEarned;

            // Heal 20% max HP
            let healAmt = Math.floor(s.maxPlayerHp * 0.20);
            s.playerHp = Math.min(s.maxPlayerHp, gameState.player.hp + healAmt);

            if(rewards) rewards.innerText = `Onda ${s.currentWave} Concluída! (+${lootEarned} 💰 na sacola)`;

            saveProfile();

            if (btnReturnMenu) {
                btnReturnMenu.innerText = "Continuar";
                btnReturnMenu.onclick = () => {
                    if(resultsScreen) resultsScreen.classList.add('hidden');
                    if (s.currentWave % 5 === 0) {
                        // Trigger Risk / Reward Modal
                        openEndlessDecisionModal();
                    } else {
                        s.currentWave++;
                        saveProfile();
                        startMatchmaking(false); // Next wave
                    }
                };
            }
            return; // Skip standard return to menu

        } else {
            // Defeat in endless
            const s = playerProfile.endlessState;
            if(!s) return;
            const keptLoot = Math.floor(s.loot * 0.3); // Perde 70%
            playerProfile.coins += keptLoot;

            showNotification(`Fim da Linha! Você sobreviveu até a Onda ${s.currentWave}. Você salvou ${keptLoot} Moedas.`, "error");

            saveEndlessLeaderboard(s.currentWave, s.dominantTribe, keptLoot);

            playerProfile.endlessState = null;
            saveProfile();

            if (btnReturnMenu) {
                btnReturnMenu.innerText = "Voltar";
                btnReturnMenu.onclick = () => {
                    if(resultsScreen) resultsScreen.classList.add('hidden');
                    showScreen(screens.LEADERBOARD);
                };
            }
            return; // Skip standard return to menu
        }
    }

    // Roguelike End Game Logic (Módulo 9)
    if (currentMatchMode === 'roguelike') {
        if (isWin) {
            playerProfile.roguelikeState.currentNode.completed = true;
            playerProfile.roguelikeState.coins += 15;
            playerProfile.roguelikeState.playerHp = gameState.player.hp;
            saveProfile();
            if(rewards) rewards.innerText += " | +15 Ouro (Run)";
        } else {
            playerProfile.roguelikeState = null;
            saveProfile();
        }
    }

    saveProfile();
    updateUIProfile();

    // Default return to menu behavior
    if (btnReturnMenu) {
        btnReturnMenu.innerText = "Voltar ao Menu";
        btnReturnMenu.onclick = () => {
            if(resultsScreen) resultsScreen.classList.add('hidden');
            if (currentMatchMode === 'roguelike' && isWin) {
                renderMapScreen();
            } else if (currentMatchMode === 'roguelike' && !isWin) {
                showScreen(screens.MENU);
            } else {
                showScreen(screens.MENU);
            }
            AudioManager.playBGM('bgm_menu');
        };
    }
}


function checkWinCondition() {
    const pRatio = gameState.player.hp / gameState.player.maxHp;
    const oRatio = gameState.opponent.hp / gameState.opponent.maxHp;
    if (pRatio <= 0.3 || oRatio <= 0.3) {
        AudioManager.playBGM('bgm_battle_tension');
    }
    if (gameState.player.hp <= 0 && gameState.opponent.hp <= 0) {
        endGame(false); // Tie goes to opponent for simplicity
    } else if (gameState.opponent.hp <= 0) {
        endGame(true);
    } else if (gameState.player.hp <= 0) {
        endGame(false);
    }
}



function startBattle() {
    document.getElementById('player-hand').innerHTML = '';
    document.getElementById('enemy-hand').innerHTML = '';
    const slots = document.querySelectorAll('.board-slot');
    slots.forEach(slot => { slot.innerHTML = ''; slot.className = 'board-slot empty'; });

    // Reset battle state
    gameState.turn = 0;
    gameState.player.hp = gameState.player.maxHp = (currentMatchMode === 'endless' && playerProfile.endlessState) ? playerProfile.endlessState.playerHp : 30;
    gameState.opponent.hp = gameState.opponent.maxHp = (currentMatchMode === 'endless' && playerProfile.endlessState) ? 30 + (playerProfile.endlessState.currentWave * 5) : 30;

    gameState.player.credits = 1;
    gameState.player.maxCredits = 1;
    gameState.opponent.credits = 1;
    gameState.opponent.maxCredits = 1;

    gameState.player.battery = 0;
    gameState.opponent.battery = 0;

    gameState.player.board = [null, null, null, null, null];
    gameState.opponent.board = [null, null, null, null, null];

    gameState.player.secrets = [];
    gameState.opponent.secrets = [];

    // Módulo 9.1 Mutations logic
    if (currentMatchMode === 'endless' && playerProfile.endlessState && playerProfile.endlessState.activeMutation) {
        const mut = playerProfile.endlessState.activeMutation;
        if (mut.effect === 'all_poison') {
            // Apply logic during summon
        } else if (mut.effect === 'double_damage') {
            // Handled in triggerDamageAnimation or executeAttack
        } else if (mut.effect === 'no_heal') {
            // Handled in heal functions
        } else if (mut.effect === 'half_energy') {
             gameState.player.maxCredits = Math.ceil(gameState.player.maxCredits / 2);
        }
    }

// Deck and Hand
    let activeDeck = playerProfile.deck;
    if (currentMatchMode === 'draft' && playerProfile.arenaState) activeDeck = playerProfile.arenaState.deck;

    gameState.player.deck = [...activeDeck].sort(() => 0.5 - Math.random());
    gameState.player.hand = [];

    // Fake deck for opponent (could simulate a boss or a similar draft deck)
    gameState.opponent.deck = [...activeDeck].sort(() => 0.5 - Math.random());
    gameState.opponent.hand = [];

    for(let i = 0; i < 5; i++) {
        drawCard('player');
        drawCard('opponent');
    }

    AudioManager.playBGM('bgm_battle_1');
    updateBattleUI();

    // Start game
    gameState.isPlayerTurn = Math.random() > 0.5;
    if (gameState.isPlayerTurn) {
        startTurn('player');
    } else {
        startTurn('opponent');
        if (gameState.opponent.isBot) {
            botTurn();
        }
    }
}


function botTurn() {
    triggerBotEmote('calculating');

    setTimeout(() => {
        const level = gameState.opponent.botLevel || 'easy';

        // 1. Play Cards Phase
        for (let i = gameState.opponent.hand.length - 1; i >= 0; i--) {
            const card = gameState.opponent.hand[i];
            const totalEnergy = gameState.opponent.credits + gameState.opponent.battery;

            if (totalEnergy >= card.cost) {
                if (card.type === CARD_TYPES.TROOP || card.type === CARD_TYPES.ENVIRONMENT) {
                    const emptyLanes = [];
                    for(let j=0; j<5; j++) if(!gameState.opponent.board[j]) emptyLanes.push(j);

                    if (emptyLanes.length > 0) {
                        gameState.opponent.selectedCardIndex = i;
                        // Smart placement for higher levels
                        let targetLane = emptyLanes[Math.floor(Math.random() * emptyLanes.length)];

                        if (level === 'hard' || level === 'expert') {
                            // Try to block player's highest attack card
                            let highestThreatLane = -1;
                            let maxThreat = -1;
                            for (let pLane = 0; pLane < 5; pLane++) {
                                const pCard = gameState.player.board[pLane];
                                if (pCard && pCard.atk > maxThreat && emptyLanes.includes(pLane)) {
                                    maxThreat = pCard.atk;
                                    highestThreatLane = pLane;
                                }
                            }
                            if (highestThreatLane !== -1) targetLane = highestThreatLane;
                        }

                        playCard(targetLane, 'opponent');
                    }
                } else if (card.type === CARD_TYPES.SPELL) {
                    gameState.opponent.selectedCardIndex = i;
                    let targetIndex = null;
                    if (card.effect.damage && card.target.includes('troop')) {
                        const targets = [];
                        gameState.player.board.forEach((c, idx) => { if(c) targets.push(idx); });
                        if (targets.length > 0) {
                            if (level === 'hard' || level === 'expert') {
                                // Target highest threat
                                targets.sort((a,b) => gameState.player.board[b].atk - gameState.player.board[a].atk);
                                targetIndex = targets[0];
                            } else {
                                targetIndex = targets[Math.floor(Math.random() * targets.length)];
                            }
                        }
                    }
                    playCard(targetIndex, 'opponent');
                } else if (card.type === CARD_TYPES.SECRET) {
                    gameState.opponent.selectedCardIndex = i;
                    playCard(null, 'opponent');
                }
            }
        }

        // 2. Attack Phase
        if (evaluateLethal()) triggerBotEmote('lethal');

        let attackPromises = [];
        for (let i = 0; i < 5; i++) {
            const card = gameState.opponent.board[i];
            if (card && !card.exhausted && card.atk > 0 && !(card.keywords && card.keywords.includes('defensor'))) {
                attackPromises.push(new Promise(resolve => {
                    setTimeout(() => {
                        const attackerEl = document.querySelector(`#opp-slot-${i} .card`);
                        if(attackerEl) attackerEl.classList.add('attack-animation-bot');

                        // Secret check
                        const pSecretIdx = gameState.player.secrets.findIndex(s => s.trigger === 'on_attacked');
                        if (pSecretIdx > -1 && gameState.player.secrets[pSecretIdx].effect.killAttacker) {
                            card.hp = 0;
                            showNotification(`SEGREDO REVELADO: ${gameState.player.secrets[pSecretIdx].name} destruiu o atacante!`, "success");
                            gameState.player.secrets.splice(pSecretIdx, 1);
                            checkDeadCards();
                            updateBattleUI();
                            resolve();
                            return;
                        }

                        setTimeout(() => {
                            const pCard = gameState.player.board[i];
                            if (pCard) {
                                // Trade
                                let pDmg = pCard.atk;
                                let oDmg = card.atk;

                                if (pCard.keywords && pCard.keywords.includes('escudo')) { pCard.keywords = pCard.keywords.filter(k=>k!=='escudo'); oDmg = 0; }
                                if (card.keywords && card.keywords.includes('escudo')) { card.keywords = card.keywords.filter(k=>k!=='escudo'); pDmg = 0; }

                                pCard.hp -= oDmg;
                                card.hp -= pDmg;

                                if(card.keywords && card.keywords.includes('veneno') && oDmg>0) pCard.hp = 0;
                                if(pCard.keywords && pCard.keywords.includes('veneno') && pDmg>0) card.hp = 0;

                                triggerDamageAnimation('opponent', i, 'player', i, oDmg);
                                if (pDmg > 0) triggerDamageAnimation('player', i, 'opponent', i, pDmg);

                                const pSlotEl = document.querySelector(`#player-slot-${i} .card`);
                                if(pSlotEl) pSlotEl.classList.add('collision-flash');

                            } else {
                                // Face
                                const hSecretIdx = gameState.player.secrets.findIndex(s => s.trigger === 'on_hero_attacked');
                                if (hSecretIdx > -1 && gameState.player.secrets[hSecretIdx].effect.preventDamage) {
                                    showNotification(`SEGREDO REVELADO: Preveniu o ataque do oponente!`, "success");
                                    if(gameState.player.secrets[hSecretIdx].effect.summon) {
                                        gameState.player.board[i] = JSON.parse(JSON.stringify(getCardById(gameState.player.secrets[hSecretIdx].effect.summon)));
                                    }
                                    gameState.player.secrets.splice(hSecretIdx, 1);
                                } else {
                                    gameState.player.hp -= card.atk;
                                    triggerDamageAnimation('opponent', i, 'player', null, card.atk);

                                    const pAvatar = document.getElementById('battle-player-avatar');
                                    if(pAvatar) {
                                        pAvatar.classList.add('screen-shake');
                                        setTimeout(() => pAvatar.classList.remove('screen-shake'), 400);
                                    }
                                    triggerBotEmote('damage');
                                }
                            }

                            if(attackerEl) attackerEl.classList.remove('attack-animation-bot');
                            card.exhausted = true;
                            checkDeadCards();
                            updateBattleUI();
                            resolve();
                        }, 200);
                    }, i * 600); // Stagger attacks
                }));
            }
        }

        Promise.all(attackPromises).then(() => {
            setTimeout(() => {
                checkWinCondition();
                if (gameState.opponent.hp > 0 && gameState.player.hp > 0) {
                    gameState.isPlayerTurn = true;
                    startTurn('player');
                }
            }, 500);
        });

    }, 1500);
}

function resolveSpell(side, card, targetIndex) {
    if (currentMatchMode === 'roguelike' && side === 'player' && playerProfile.currentRunState && playerProfile.currentRunState.currentNodeTier === 29) {
        showNotification("ANOMALIA: O Mestre do Clima ataca!", "error");
        triggerDamageAnimation('opponent', null, 'player', null, 2);
        gameState.player.hp -= 2;
    }
    // Check for Counter-Spell Secret
    const oppSide = side === 'player' ? 'opponent' : 'player';
    const counterIdx = gameState[oppSide].secrets.findIndex(s => s.effect.cancelSpell);
    if (counterIdx > -1) {
        gameState[oppSide].secrets.splice(counterIdx, 1);
        showNotification(`SEGREDO REVELADO: Contra-Feitiço cancelou ${card.name}!`, "error");
        return;
    }

    if (card.effect.draw) {
        drawCard(side, card.effect.draw);
    }
    if (card.effect.heal) {
        gameState[side].hp = Math.min(gameState[side].maxHp, gameState[side].hp + card.effect.heal);
    }
    if (card.effect.addBattery) {
        gameState[side].battery += card.effect.addBattery;
    }
    if (card.effect.damage) {
        if (currentMatchMode === 'endless' && side === 'opponent' && playerProfile.endlessState.activeMutation && playerProfile.endlessState.activeMutation.id === 'vampirism') {
            gameState.opponent.hp += card.effect.damage;
            AudioManager.playSFX('hero_heal');
        }
        // Simple random target for now if not specified
        const oppBoard = gameState[side === 'player' ? 'opponent' : 'player'].board;
        let validTargets = [];
        oppBoard.forEach((c, i) => { if (c) validTargets.push(i); });

        if (card.target === 'all_troops') {
            gameState.player.board.forEach(c => { if(c) c.hp -= card.effect.damage; });
            gameState.opponent.board.forEach(c => { if(c) c.hp -= card.effect.damage; });
        } else if (validTargets.length > 0) {
            const tIdx = validTargets[Math.floor(Math.random() * validTargets.length)];
            triggerDamageAnimation(side, null, oppSide, tIdx, card.effect.damage);
            oppBoard[tIdx].hp -= card.effect.damage;
        } else {
            triggerDamageAnimation(side, null, oppSide, null, card.effect.damage);
            gameState[oppSide].hp -= card.effect.damage;
        }
    }
    if (card.effect.kill) {
        if (targetIndex !== null && gameState[oppSide].board[targetIndex]) {
            gameState[oppSide].board[targetIndex].hp = 0;
        }
    }

    checkDeadCards();
}

// --- MISSING CORE FUNCTIONS ---
function drawCard(side, amount = 1) {
    if (!gameState || !gameState[side]) return;
    for (let i = 0; i < amount; i++) {
        if (gameState[side].deck.length > 0 && gameState[side].hand.length < 10) {
            let cardId = gameState[side].deck.shift();
            if (cardId) {
                let cardObj = JSON.parse(JSON.stringify(getCardById(cardId)));
                gameState[side].hand.push(cardObj);
            }
        }
    }
    if (typeof updateBattleUI === 'function') {
        updateBattleUI();
    }
}
