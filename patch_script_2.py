import re
with open("script.js", "r") as f:
    js = f.read()

# 1. Modify Matchmaking generation to use Endless Generator
mm_logic_old = """        if (timeLeft <= 0) {
            clearInterval(mmInterval);

            // Generate Opponent
            const oppData = generateFakeOpponent();
            showVSScreen(oppData, isInit);
        }"""
mm_logic_new = """        if (timeLeft <= 0) {
            clearInterval(mmInterval);

            // Generate Opponent
            let oppData;
            if (currentMatchMode === 'endless') {
                oppData = generateEndlessOpponent();
            } else {
                oppData = generateFakeOpponent();
            }
            showVSScreen(oppData, isInit);
        }"""
js = js.replace(mm_logic_old, mm_logic_new)

# 2. Modify Battle Start for Endless Scaling & HP
# Find where startingHp is set
start_battle_old = """    if (currentMatchMode === 'roguelike' && playerProfile.currentRunState) {
        startingHp = playerProfile.currentRunState.hp;
        maxStartingHp = playerProfile.currentRunState.maxHp;
        deckToUse = [...playerProfile.currentRunState.deck];
    }"""
start_battle_new = """    if (currentMatchMode === 'roguelike' && playerProfile.currentRunState) {
        startingHp = playerProfile.currentRunState.hp;
        maxStartingHp = playerProfile.currentRunState.maxHp;
        deckToUse = [...playerProfile.currentRunState.deck];
    } else if (currentMatchMode === 'endless' && playerProfile.endlessState) {
        startingHp = playerProfile.endlessState.playerHp;
        maxStartingHp = playerProfile.endlessState.maxPlayerHp;
        deckToUse = [...playerProfile.endlessState.deckUsed];
    }"""
js = js.replace(start_battle_old, start_battle_new)

# Inject Enemy HP Scaling directly into startBattle
boss_logic_old = """    if (currentMatchMode === 'roguelike') {
        gameState.inCombat = true;
        saveProfile();
    }"""
boss_logic_new = """    if (currentMatchMode === 'roguelike') {
        gameState.inCombat = true;
        saveProfile();
    }

    if (currentMatchMode === 'endless' && nodeData && nodeData.maxHp) {
        gameState.opponent.maxHp = nodeData.maxHp;
        gameState.opponent.hp = nodeData.maxHp;

        // Endless UI Bar
        const eBar = document.getElementById('endless-info-bar');
        eBar.classList.remove('hidden');
        document.getElementById('endless-wave-display').innerText = playerProfile.endlessState.currentWave;
        document.getElementById('endless-loot-display').innerText = playerProfile.endlessState.loot;

        const mCont = document.getElementById('mutation-container');
        if (playerProfile.endlessState.activeMutation) {
            mCont.classList.remove('hidden');
            mCont.querySelector('#mutation-name').innerText = playerProfile.endlessState.activeMutation.name;
            mCont.querySelector('#mutation-icon').innerText = playerProfile.endlessState.activeMutation.icon;
            mCont.setAttribute('data-desc', playerProfile.endlessState.activeMutation.desc);
        } else {
            mCont.classList.add('hidden');
        }
    } else {
        document.getElementById('endless-info-bar').classList.add('hidden');
    }"""
js = js.replace(boss_logic_old, boss_logic_new)

# Pass nodeData in startMatchmaking
mm_vs_old = """        // Let's modify startBattle slightly in logic if needed, but simplest is to just call it and update UI here
        startBattle(isInit);"""
mm_vs_new = """        // Let's modify startBattle slightly in logic if needed, but simplest is to just call it and update UI here
        startBattle(isInit, oppData);"""
js = js.replace(mm_vs_old, mm_vs_new)


# Fatigue logic on drawCard
draw_old = """function drawCard(side, amount) {"""
draw_new = """function drawCard(side, amount) {
    if (currentMatchMode === 'endless' && side === 'player') {
        const available = gameState.player.deck.length;
        if (amount > available) {
            for(let i=0; i < amount - available; i++) processEndlessFatigue();
        }
    }"""
js = js.replace(draw_old, draw_new)

# Since drawCard doesn't exist explicitly in the printed logic yet, we might need to find where it is defined or inject it safely
# In script.js, drawCard is probably defined but not caught by grep. I will do a regex check.

with open("script.js", "w") as f:
    f.write(js)
