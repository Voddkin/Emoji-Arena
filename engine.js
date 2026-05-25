

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
    const pHand = document.getElementById('player-hand');
    const eHand = document.getElementById('enemy-hand');
    if(pHand) pHand.innerHTML = '';
    if(eHand) eHand.innerHTML = '';
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