with open("script.js", "r") as f:
    js = f.read()

# 1. Update screen mappings
js = js.replace("MAP: 'map-screen'", "MAP: 'map-screen',\n    LEADERBOARD: 'leaderboard-screen'")

# 2. Update player profile to include Endless specific states
old_profile = """    currentRunState: null
};"""

new_profile = """    currentRunState: null,

    // MÓDULO 9.1 - ENDLESS
    endlessState: null,
    endlessLeaderboard: [] // Array of top 5 runs
};"""
js = js.replace(old_profile, new_profile)

# 3. Update load profile
old_load = """        if (playerProfile.currentRunState && gameState && gameState.inCombat) {"""
new_load = """        if(playerProfile.endlessState === undefined) playerProfile.endlessState = null;
        if(!playerProfile.endlessLeaderboard) playerProfile.endlessLeaderboard = [];

        if (playerProfile.currentRunState && gameState && gameState.inCombat) {"""
js = js.replace(old_load, new_load)


# 4. Add Endless Core Logic
endless_core = """
// --- ENDLESS MODE (A FENDA DA ETERNIDADE) ---
function startEndlessMode() {
    if (playerProfile.deck.length < 40) {
        showNotification("Seu deck precisa de 40 cartas para a Fenda!", "error");
        return;
    }

    // Determine dominant tribe for leaderboard tracking
    const tribeCounts = {};
    playerProfile.deck.forEach(cid => {
        const c = getCardById(cid);
        if (c && c.tribes && c.tribes.length > 0) {
            let t = c.tribes[0];
            tribeCounts[t] = (tribeCounts[t] || 0) + 1;
        }
    });
    let domTribe = 'Misto';
    let max = 0;
    for (let t in tribeCounts) {
        if (tribeCounts[t] > max) { max = tribeCounts[t]; domTribe = t; }
    }

    playerProfile.endlessState = {
        currentWave: 1,
        loot: 0,
        fatigueDamage: 1,
        activeMutation: null,
        playerHp: 50, // Base standard endless HP
        maxPlayerHp: 50,
        dominantTribe: domTribe,
        deckUsed: [...playerProfile.deck]
    };
    saveProfile();

    currentMatchMode = 'endless';
    startMatchmaking(true);
}

// Generate scaled enemy
function generateEndlessOpponent() {
    const s = playerProfile.endlessState;
    const wave = s.currentWave;

    const names = ["Aberraçao", "Eco Sombrio", "Cão do Caos", "Vazio", "Ruptura"];
    let name = names[Math.floor(Math.random() * names.length)] + ` (W${wave})`;
    let avatar = '🌌';

    let isBoss = (wave % 5 === 0);
    if (isBoss) {
        name = "SENHOR DA FENDA";
        avatar = '👁️‍🗨️';
    }

    // Scaling Math
    let hpMod = (wave - 1) * 10;
    let baseHp = isBoss ? 50 : 30;
    let finalHp = baseHp + hpMod;

    return { name, elo: '???', avatar, maxHp: finalHp, isBoss };
}

// Called when player buys/draws but deck is empty
function processEndlessFatigue() {
    if (currentMatchMode !== 'endless' || !playerProfile.endlessState) return;

    let dmg = playerProfile.endlessState.fatigueDamage;
    gameState.player.hp -= dmg;
    triggerDamageAnimation('opponent', null, 'player', null, dmg);
    AudioManager.playSFX('hero_damage');
    showNotification(`FADIGA! Você tomou ${dmg} de dano por falta de cartas.`, "error");

    playerProfile.endlessState.fatigueDamage++;
    saveProfile();
    checkWinCondition();
    updateBattleUI();
}
"""

js = js.replace("// --- MATCHMAKING & VS SCREEN ---", endless_core + "\n// --- MATCHMAKING & VS SCREEN ---")

with open("script.js", "w") as f:
    f.write(js)
