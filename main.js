document.addEventListener('contextmenu', e => e.preventDefault());


document.addEventListener('keydown', e => {
    // Bloqueia F12
    if (e.key === 'F12') e.preventDefault();
    // Bloqueia Ctrl+Shift+I / J
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) e.preventDefault();
    // Bloqueia Ctrl+U (Ver código-fonte)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) e.preventDefault();
});


// Debugger Trap

setInterval(() => {
    // debugger trap removed due to syntax error
}, 1000);



document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('game-app').style.display = 'flex';
    loadProfile();

    setupBottomNav();
    initializeNewsHub();
    updateUIProfile();

    setTimeout(() => {
        showNotification("Bem-vindo ao Emoji Arena!", "success");
    }, 1000);


    // Main Menu Buttons

    const btnDraft = document.getElementById('btn-play-draft');
    if (btnDraft) {
        btnDraft.addEventListener('click', () => {
            const modal = document.getElementById('play-modes-modal');
            if (modal) modal.classList.add('hidden');
            startArenaDraft();
        });
    }

    const btnAbandonDraft = document.getElementById('btn-abandon-draft');
    if(btnAbandonDraft) {
        btnAbandonDraft.addEventListener('click', () => {
            if(confirm('Tem certeza que deseja abandonar sua corrida atual na Arena?')) {
                playerProfile.arenaState = null;
                saveProfile();
                showScreenSPA('main-menu');
            }
        });
    }

    if(document.getElementById('btn-play-modes')) document.getElementById('btn-play-modes').addEventListener('click', () => {
        document.getElementById('play-modes-modal').classList.remove('hidden');
    });

    if(document.getElementById('btn-close-play-modes')) document.getElementById('btn-close-play-modes').addEventListener('click', () => {
        document.getElementById('play-modes-modal').classList.add('hidden');
    });

    if(document.getElementById('btn-collection')) document.getElementById('btn-collection').addEventListener('click', () => showScreen(screens.COLLECTION));
    if(document.getElementById('btn-shop')) document.getElementById('btn-shop').addEventListener('click', () => showScreen(screens.SHOP));

    if(document.getElementById('btn-quests')) document.getElementById('btn-quests').addEventListener('click', () => {
        renderQuests();
        document.getElementById('quests-overlay').classList.remove('hidden');
    });
    if(document.getElementById('btn-close-quests')) document.getElementById('btn-close-quests').addEventListener('click', () => {
        document.getElementById('quests-overlay').classList.add('hidden');
    });

    if(document.getElementById('btn-achievements')) document.getElementById('btn-achievements').addEventListener('click', () => {
        renderAchievements();
        document.getElementById('achievements-overlay').classList.remove('hidden');
    });
    if(document.getElementById('btn-close-achievements')) document.getElementById('btn-close-achievements').addEventListener('click', () => {
        document.getElementById('achievements-overlay').classList.add('hidden');
    });


    if(document.getElementById('btn-roguelike')) document.getElementById('btn-roguelike').addEventListener('click', () => {
        if (!playerProfile.currentRunState) {
            startNewRoguelikeRun();
        } else {
            renderMapScreen();
            showScreen(screens.MAP);
        }
    });

    if(document.getElementById('btn-abandon-run')) document.getElementById('btn-abandon-run').addEventListener('click', () => {
        playerProfile.currentRunState = null;
        saveProfile();
        AudioManager.playBGM('bgm_menu');
        showScreen(screens.MENU);
    });

    // Audio Settings Integration
    const sliderMaster = document.getElementById('slider-master-vol');
    const sliderMusic = document.getElementById('slider-music-vol');
    const sliderSfx = document.getElementById('slider-sfx-vol');

    if (sliderMaster && sliderMusic && sliderSfx) {
        sliderMaster.value = AudioManager.masterVolume;
        sliderMusic.value = AudioManager.musicVolume;
        sliderSfx.value = AudioManager.sfxVolume;

        document.getElementById('val-master-vol').innerText = `${Math.round(AudioManager.masterVolume * 100)}%`;
        document.getElementById('val-music-vol').innerText = `${Math.round(AudioManager.musicVolume * 100)}%`;
        document.getElementById('val-sfx-vol').innerText = `${Math.round(AudioManager.sfxVolume * 100)}%`;

        sliderMaster.addEventListener('input', (e) => {
            AudioManager.masterVolume = parseFloat(e.target.value);
            document.getElementById('val-master-vol').innerText = `${Math.round(AudioManager.masterVolume * 100)}%`;
            AudioManager.saveSettings();
            AudioManager.playSFX('ui_beep');
        });

        sliderMusic.addEventListener('input', (e) => {
            AudioManager.musicVolume = parseFloat(e.target.value);
            document.getElementById('val-music-vol').innerText = `${Math.round(AudioManager.musicVolume * 100)}%`;
            AudioManager.saveSettings();
            AudioManager.playSFX('ui_beep');
        });

        sliderSfx.addEventListener('input', (e) => {
            AudioManager.sfxVolume = parseFloat(e.target.value);
            document.getElementById('val-sfx-vol').innerText = `${Math.round(AudioManager.sfxVolume * 100)}%`;
            AudioManager.saveSettings();
            AudioManager.playSFX('ui_beep');
        });
    }

    // Global UI Click and Hover Tracking
    document.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.classList.contains('card') || e.target.classList.contains('tab-btn')) {
            AudioManager.playSFX('ui_hover');
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            if(!e.target.classList.contains('buy-btn')) {
                AudioManager.playSFX('ui_click');
            }
        }
    });

    document.addEventListener('click', () => {
        if (document.getElementById('main-menu').classList.contains('active')) {
            AudioManager.playBGM('bgm_menu');
        }
    }, { once: true });


    if(document.getElementById('btn-leaderboard')) document.getElementById('btn-leaderboard').addEventListener('click', () => {
        renderLeaderboard();
        showScreen(screens.LEADERBOARD);
    });

    if(document.getElementById('btn-play-endless')) document.getElementById('btn-play-endless').addEventListener('click', () => {
        document.getElementById('play-modes-modal').classList.add('hidden');
        if (playerProfile.endlessState) {
            if (confirm("Continuar a Run salva na Onda " + playerProfile.endlessState.currentWave + "?")) {
                currentMatchMode = 'endless';
                startMatchmaking(true);
            } else {
                playerProfile.endlessState = null;
                startEndlessMode();
            }
        } else {
            startEndlessMode();
        }
    });

    if(document.getElementById('btn-settings')) document.getElementById('btn-settings').addEventListener('click', () => {
        document.getElementById('settings-overlay').classList.remove('hidden');
    });
    if(document.getElementById('btn-close-settings')) document.getElementById('btn-close-settings').addEventListener('click', () => {
        document.getElementById('settings-overlay').classList.add('hidden');
    });
    if(document.getElementById('btn-reset-data')) document.getElementById('btn-reset-data').addEventListener('click', resetSaveData);

    // Back Buttons
    document.querySelectorAll('.btn-back').forEach(btn => {
        btn.addEventListener('click', () => showScreen(screens.MENU));
    });

    // Shop Logic
    document.querySelectorAll('.shop-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.shop-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.shop-content').forEach(c => c.classList.remove('active'));
            e.target.classList.add('active');
            document.getElementById(e.target.dataset.target).classList.add('active');
        });
    });

    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = e.target.dataset.type;
            const cost = parseInt(e.target.dataset.cost);
            const currency = e.target.dataset.currency;

            if (type && cost && currency) {
                if (playerProfile[currency] >= cost) {
                    playerProfile[currency] -= cost;
                    saveProfile();
                    if (type === 'tickets') {
                        playerProfile.tickets += 3;
                        showNotification("Comprou 3 Fichas de Arena!", "success");
                    } else {
                        openPack(type);
                    }
                } else {
                    showNotification(`Sem ${currency} suficiente!`, "error");
                }
            }
        });
    });

    if(document.getElementById('btn-close-pack')) document.getElementById('btn-close-pack').addEventListener('click', () => {
        document.getElementById('pack-opening-overlay').classList.add('hidden');
        saveProfile();
    });

    // Collection Logic
    if(document.getElementById('btn-toggle-forge')) document.getElementById('btn-toggle-forge').addEventListener('click', () => {
        isForgeMode = !isForgeMode;
        document.getElementById('btn-toggle-forge').innerText = isForgeMode ? "Exit Forge Mode" : "Enter Forge Mode";
        document.getElementById('collection-instructions').innerText = isForgeMode ?
            "Clique em uma carta não possuída para forjar com Pó Estelar, ou numa possuída para desencantar." :
            "Clique numa carta para adicionar/remover do deck.";
        renderCollection();
    });

    // Forge Buttons
    if(document.getElementById('btn-cancel-forge')) document.getElementById('btn-cancel-forge').addEventListener('click', () => {
        document.getElementById('forge-modal').classList.add('hidden');
    });

    // Play Modes Actions
    if(document.getElementById('btn-play-adventure')) document.getElementById('btn-play-adventure').addEventListener('click', () => {
        currentMatchMode = 'adventure';
        startBattle(true);
    });

    if(document.getElementById('btn-play-ranked')) document.getElementById('btn-play-ranked').addEventListener('click', () => {
        if (playerProfile.tickets > 0) {
            playerProfile.tickets--;
            saveProfile();
            currentMatchMode = 'ranked';
            startBattle(true);
        } else {
            showNotification("Sem Fichas de Arena! Compre na Loja.", "error");
        }
    });

    if(document.getElementById('btn-play-casual')) document.getElementById('btn-play-casual').addEventListener('click', () => {
        currentMatchMode = 'casual';
        startBattle(true);
    });

    // Battle actions
    if(document.getElementById('btn-end-turn')) document.getElementById('btn-end-turn').addEventListener('click', endTurn);

    if(document.getElementById('btn-hero-power')) document.getElementById('btn-hero-power').addEventListener('click', useHeroPower);

    // Tooltip logic
    document.addEventListener('mousemove', (e) => {
        const tooltip = document.getElementById('global-tooltip');
        if (tooltip) {
            tooltip.style.left = e.pageX + 15 + 'px';
            tooltip.style.top = e.pageY + 15 + 'px';
        }
    });
});


function resetSaveData() {
    if (confirm("TEM CERTEZA? Todo o seu progresso será perdido!")) {
        localStorage.removeItem('Emoji_Arena_SaveData_v1');
        location.reload();
    }
}


// --- HTML GENERATORS ---


// --- PACK OPENING LOGIC ---


// --- SHOP: DAILY DEALS & AVATARS ---


// --- COLLECTION & FORGE ---

let isForgeMode = false;

let selectedCardForForge = null;


function addCardToDeck(cardId) {
    const c = getCardById(cardId);
    if(!c) return;

    const maxLimit = (c.rarity === RARITIES.MYTHIC) ? 2 : 4;
    const currentCount = playerProfile.deck.filter(id => id === cardId).length;

    if (playerProfile.deck.length >= 40) {
        showNotification("O deck já possui 40 cartas!", "error");
        return;
    }

    if (currentCount >= maxLimit) {
        showNotification(`Limite alcançado (${maxLimit}x)!`, "error");
        return;
    }

    if (currentCount >= playerProfile.collection[cardId]) {
        showNotification("Você não tem mais cópias dessa carta na coleção!", "error");
        return;
    }

    playerProfile.deck.push(cardId);
    saveProfile();
    renderDeck();
}


function removeCardFromDeck(index) {
    playerProfile.deck.splice(index, 1);
    saveProfile();
    renderDeck();
}


// --- PROGRESSION UI ---


function updateQuests(type, amount = 1) {
    playerProfile.quests.forEach(q => {
        if (q.completed) return;

        if (type === 'win' && q.id === 'q2') q.progress += amount;
        if (type === 'play' && q.id === 'q1') q.progress += amount;
        if (type === 'damage' && q.id === 'q3') q.progress += amount;
        if (type === 'card' && q.id === 'q4') q.progress += amount;
        if (type === 'spell' && q.id === 'q5') q.progress += amount;

        if (q.progress >= q.target) {
            q.progress = q.target;
            q.completed = true;
            playerProfile[q.reward.type] += q.reward.amount;
            showNotification(`Missão Concluída: ${q.desc}! +${q.reward.amount} ${q.reward.type}`, "success");
        }
    });
    saveProfile();
}


function checkAchievements() {
    playerProfile.achievements.forEach(a => {
        if (a.completed) return;

        if (a.id === 'a1' && playerProfile.stats.wins >= 1) a.progress = 1;
        if (a.id === 'a2') a.progress = playerProfile.stats.wins;

        let uniqueCards = 0;
        for (let key in playerProfile.collection) {
            if (playerProfile.collection[key] > 0) uniqueCards++;
        }
        if (a.id === 'a3') a.progress = uniqueCards;

        if (a.id === 'a4' && playerProfile.coins >= 5000) a.progress = 5000;

        // a5 is updated dynamically in draft win

        if (a.progress >= a.target) {
            a.progress = a.target;
            a.completed = true;
            if (a.reward.type === 'avatar') {
                playerProfile.unlockedAvatars.push(a.reward.value);
            } else {
                playerProfile[a.reward.type] += a.reward.amount;
            }
            showNotification(`Troféu Conquistado: ${a.desc}!`, "success");
        }
    });
    saveProfile();
}


// --- BATTLE ACTIONS & HERO POWERS ---


function selectCardInHand(index) {
    if (!gameState.isPlayerTurn) return;

    const card = gameState.player.hand[index];
    if (gameState.player.credits + gameState.player.battery < card.cost) {
        showNotification("Energia insuficiente!", "error");
        return;
    }

    if (gameState.selectedCardIndex === index) {
        gameState.selectedCardIndex = null;
    } else {
        gameState.selectedCardIndex = index;
    }

    // Spells or Secrets might not need a lane target
    if (gameState.selectedCardIndex !== null && (card.type === CARD_TYPES.SPELL || card.type === CARD_TYPES.SECRET)) {
        if (card.target === 'none' || card.type === CARD_TYPES.SECRET) {
            playCard(null); // Instacast
        } else {
            // Need targetting logic... For simplicity, if it's a spell, we'll click the target directly.
            showNotification(`Selecione o alvo para ${card.name}`, "info");
            enableSpellTargeting(card);
        }
    }

    updateBattleUI();
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



function checkDeadCards() {
    ["player", "opponent"].forEach(side => {
        gameState[side].board.forEach((card, i) => {
            if (card && card.hp <= 0) {
                // Necromancy check
                if (card.keywords && card.keywords.includes('necromancia_infinita')) {
                    card.hp = card.baseHp; // Respawn
                    showNotification(`${card.name} renasceu das cinzas!`, "info");
                } else if (card.keywords && card.keywords.includes('necromancia')) {
                    card.keywords = card.keywords.filter(k => k !== 'necromancia'); // remove keyword
                    card.hp = card.baseHp; // Respawn once
                    showNotification(`${card.name} usou necromancia!`, "info");
                } else {
                    // M6: Graveyard push
                    gameState[side].graveyard.push(card.id);
                    // Deathrattle check
                    if (card.deathrattle) {
                        if (card.deathrattle.effect.draw) drawCard(side, card.deathrattle.effect.draw);
                    }
                    gameState[side].board[i] = null;
                }
            }
        });
    });
}




// Chest Time Updater



function triggerEndlessMutationEvent(event, target) {
    if (currentMatchMode !== 'endless' || !playerProfile.endlessState || !playerProfile.endlessState.activeMutation) return;
    const mut = playerProfile.endlessState.activeMutation;

    if (event === 'turn' && mut.effect === 'toxic_gas') {
        // Example logic: damage all troops slightly each turn
        const side = gameState.isPlayerTurn ? 'player' : 'opponent';
        gameState[side].board.forEach((card, idx) => {
            if(card) {
                card.hp -= 1;
                triggerDamageAnimation(side === 'player'?'opponent':'player', null, side, idx, 1);
            }
        });
    }
}


// --- MATCHMAKING & VS SCREEN ---


const LOADING_TIPS = [

    'Dica: No Emoji Arena, gerenciar seus Créditos é a chave para a vitória.',

    'Dica: Combine tribos iguais para criar sinergias devastadoras!',

    'Dica: Fique de olho na Energia da Bateria. Ela não reseta entre turnos.',

    'Dica: Cartas Lendárias e Míticas são raras, mas não imortais.',

    'Dica: O Modo Fenda da Eternidade oferece recompensas que escalam infinitamente.'

];


// --- HEURISTIC AI & BOT EMOTES ---


function evaluateLethal() {
    let potentialDamage = 0;
    gameState.opponent.board.forEach(card => {
        if (card && !card.exhausted && card.atk > 0) potentialDamage += card.atk;
    });
    // Check hand for spells that deal direct damage
    gameState.opponent.hand.forEach(card => {
        if (card.type === CARD_TYPES.SPELL && card.effect.damage && (card.target === 'any' || card.target === 'enemy_hero')) {
            if (gameState.opponent.credits + gameState.opponent.battery >= card.cost) {
                potentialDamage += card.effect.damage;
            }
        }
    });
    return potentialDamage >= gameState.player.hp;
}



// --- ENDLESS MODALS & LEADERBOARD ---




// --- ENDLESS MODE INITIALIZATION ---

function startEndlessMode() {
    if (playerProfile.deck.length < 40) {
        showNotification("Seu deck precisa de 40 cartas para jogar o Modo Infinito!", "error");
        return;
    }

    playerProfile.endlessState = {
        currentWave: 1,
        loot: 0,
        playerHp: 30, // Start with 30 HP
        maxPlayerHp: 30,
        dominantTribe: 'Neutro', // Can be updated during run
        activeMutation: { name: "Nenhuma", effect: "Padrão" }
    };

    saveProfile();
    currentMatchMode = 'endless';
    startMatchmaking(true);
}




// --- BOTTOM NAV BAR LOGIC (SPA) ---
function initiateMatchmaking(mode) {
    currentMatchMode = mode;
    const modals = document.querySelectorAll('.modal, .overlay');
    modals.forEach(m => m.classList.add('hidden'));

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'matchmaking-overlay';
    overlay.style.zIndex = '2000';
    overlay.innerHTML = `<div style="background: rgba(26, 11, 46, 0.95); padding: 40px; border-radius: 20px; border: 4px solid #ffcc00; text-align: center; color: white;"><h2 style="font-family: 'Lilita One', sans-serif; font-size: 2.5rem; margin-bottom: 20px;">Buscando Oponente...</h2><div class="spinner" style="font-size: 4rem; animation: spin 2s linear infinite;">⏳</div></div>`;
    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.remove();
        showScreenSPA('battle-screen');
        setTimeout(() => { startBattle(); }, 100);
    }, 2500);
}
if (!document.getElementById('matchmaking-styles')) {
    const style = document.createElement('style');
    style.id = 'matchmaking-styles';
    style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', () => {
    const el_btn_play_mega = document.getElementById('btn-play-mega');
    if (el_btn_play_mega) {
        el_btn_play_mega.addEventListener('click', () => {
            if (typeof initiateMatchmaking === 'function') {
                initiateMatchmaking('casual');
            }
        });
    }
});
