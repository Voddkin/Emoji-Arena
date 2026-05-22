import re

with open('script.js', 'r') as f:
    js = f.read()

modal_logic = """
// --- ENDLESS MODALS & LEADERBOARD ---
function openEndlessDecisionModal() {
    const modal = document.getElementById('endless-decision-modal');
    if (!modal) return;

    modal.classList.remove('hidden');

    const s = playerProfile.endlessState;
    if (!s) return;

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
        if (typeof ENDLESS_MUTATIONS !== 'undefined' && ENDLESS_MUTATIONS.length > 0) {
            s.activeMutation = ENDLESS_MUTATIONS[Math.floor(Math.random() * ENDLESS_MUTATIONS.length)];
            showNotification(`MUTAÇÃO GLOBAL ATIVA: ${s.activeMutation.name}`, "error");
        }

        saveProfile();
        modal.classList.add('hidden');

        startMatchmaking(false);
    };
}
"""

# The logic was supposed to be added by patch_endless_endgame.py, but maybe it wasn't or got stripped.
# Let's check if it exists
if "function openEndlessDecisionModal()" not in js:
    # Append it at the end
    js += "\n\n" + modal_logic
    with open('script.js', 'w') as f:
        f.write(js)
