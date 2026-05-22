import re

with open("script.js", "r") as f:
    js = f.read()

matchmaking = """
// --- MATCHMAKING & VS SCREEN ---
function startMatchmaking(isBot = true) {
    if (playerProfile.deck.length < 40 && currentMatchMode !== 'draft' && currentMatchMode !== 'roguelike') {
        showNotification("Seu deck precisa de 40 cartas!", "error");
        return;
    }

    // Configura bot ou oponente fake
    gameState.opponent.isBot = isBot;
    gameState.opponent.botLevel = 'medium';

    showScreen('battle-screen');
    startBattle();
}

function startBattle() {
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
    gameState.player.deck = [...playerProfile.deck].sort(() => 0.5 - Math.random());
    gameState.player.hand = [];

    gameState.opponent.deck = [...playerProfile.deck].sort(() => 0.5 - Math.random()); // Fake deck for opponent
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
"""

if "function startMatchmaking" not in js:
    js = js.replace("// --- HEURISTIC AI & BOT EMOTES ---", matchmaking + "\n// --- HEURISTIC AI & BOT EMOTES ---")
    with open("script.js", "w") as f:
        f.write(js)
