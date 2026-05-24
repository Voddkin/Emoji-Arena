import re
with open("script.js", "r") as f:
    js = f.read()

# 1. Update Endgame logic for endless scaling and risk/reward
end_game_logic = """
        if (currentMatchMode === 'endless') {
            const s = playerProfile.endlessState;

            // Recompensa Exponencial
            let lootEarned = Math.floor(20 * Math.pow(1.15, s.currentWave));
            s.loot += lootEarned;

            // Heal 20% max HP
            let healAmt = Math.floor(s.maxPlayerHp * 0.20);
            s.playerHp = Math.min(s.maxPlayerHp, gameState.player.hp + healAmt);

            rewards.innerText = `Onda ${s.currentWave} Concluída! (+${lootEarned} 💰 na sacola)`;

            saveProfile();
        }"""
js = js.replace("if (currentMatchMode === 'roguelike') {", end_game_logic + "\n        if (currentMatchMode === 'roguelike') {")

menu_ret_old = """        } else if (currentMatchMode === 'roguelike' && !isWin) {"""
menu_ret_new = """        } else if (currentMatchMode === 'endless') {
            if (isWin) {
                const s = playerProfile.endlessState;
                if (s.currentWave % 5 === 0) {
                    // Trigger Risk / Reward Modal
                    openEndlessDecisionModal();
                } else {
                    s.currentWave++;
                    saveProfile();
                    startMatchmaking(false); // Next wave
                }
            } else {
                // Defeat in endless
                const s = playerProfile.endlessState;
                const keptLoot = Math.floor(s.loot * 0.3); // Perde 70%
                playerProfile.coins += keptLoot;

                showNotification(`Fim da Linha! Você sobreviveu até a Onda ${s.currentWave}. Você salvou ${keptLoot} Moedas.`, "error");

                saveEndlessLeaderboard(s.currentWave, s.dominantTribe, keptLoot);

                playerProfile.endlessState = null;
                saveProfile();
                showScreen(screens.LEADERBOARD);
            }
        } else if (currentMatchMode === 'roguelike' && !isWin) {"""
js = js.replace(menu_ret_old, menu_ret_new)


# 2. Risk/Reward Modal Logic and Leaderboard Logic
endless_modals = """
// --- ENDLESS MODALS & LEADERBOARD ---
function openEndlessDecisionModal() {
    const modal = document.getElementById('endless-decision-modal');
    modal.classList.remove('hidden');

    const s = playerProfile.endlessState;
    document.getElementById('decision-wave').innerText = s.currentWave;
    document.getElementById('decision-loot').innerText = s.loot;
    document.getElementById('btn-flee-loot').innerText = s.loot;

    document.getElementById('btn-endless-flee').onclick = () => {
        AudioManager.playSFX('ui_buy');
        playerProfile.coins += s.loot;
        showNotification(`Você fugiu com o saque! +${s.loot} Moedas`, "success");

        saveEndlessLeaderboard(s.currentWave, s.dominantTribe, s.loot);

        playerProfile.endlessState = null;
        saveProfile();

        modal.classList.add('hidden');
        showScreen(screens.LEADERBOARD);
    };

    document.getElementById('btn-endless-continue').onclick = () => {
        AudioManager.playSFX('ui_click');
        s.currentWave++;

        // Sorteia nova mutação
        s.activeMutation = ENDLESS_MUTATIONS[Math.floor(Math.random() * ENDLESS_MUTATIONS.length)];

        saveProfile();
        modal.classList.add('hidden');

        showNotification(`MUTAÇÃO GLOBAL ATIVA: ${s.activeMutation.name}`, "error");

        startMatchmaking(false);
    };
}

function saveEndlessLeaderboard(wave, tribe, loot) {
    playerProfile.endlessLeaderboard.push({
        wave: wave,
        tribe: tribe,
        loot: loot,
        date: new Date().toLocaleDateString()
    });

    // Sort descending by wave, then keep top 5
    playerProfile.endlessLeaderboard.sort((a, b) => b.wave - a.wave);
    playerProfile.endlessLeaderboard = playerProfile.endlessLeaderboard.slice(0, 5);

    saveProfile();
    renderLeaderboard();
}

function renderLeaderboard() {
    const container = document.getElementById('leaderboard-container');
    container.innerHTML = '';

    if (playerProfile.endlessLeaderboard.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#555;">Nenhum recorde registrado ainda.</p>';
        return;
    }

    playerProfile.endlessLeaderboard.forEach((run, idx) => {
        const rankClass = idx === 0 ? 'rank-1' : (idx === 1 ? 'rank-2' : (idx === 2 ? 'rank-3' : ''));

        const div = document.createElement('div');
        div.className = `leaderboard-entry ${rankClass}`;

        div.innerHTML = `
            <div class="lb-rank">#${idx + 1}</div>
            <div class="lb-details">
                <div class="lb-wave">Onda ${run.wave}</div>
                <div class="lb-stats">Tribo Focada: [${run.tribe}] | Data: ${run.date}</div>
            </div>
            <div class="lb-loot">+${run.loot} 💰</div>
        `;

        container.appendChild(div);
    });
}
"""

js = js.replace("// --- MATCHMAKING & VS SCREEN ---", endless_modals + "\n// --- MATCHMAKING & VS SCREEN ---")


# Route leaderboard buttons
listeners = """
    document.getElementById('btn-leaderboard').addEventListener('click', () => {
        renderLeaderboard();
        showScreen(screens.LEADERBOARD);
    });

    document.getElementById('btn-play-endless').addEventListener('click', () => {
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
"""
target = "document.getElementById('btn-settings').addEventListener('click', () => {"
js = js.replace(target, listeners + "\n    " + target)

with open("script.js", "w") as f:
    f.write(js)
