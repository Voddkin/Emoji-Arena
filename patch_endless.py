import re

with open('script.js', 'r') as f:
    js = f.read()

# Add startEndlessMode function since it's completely missing
endless_logic = """
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
"""

if "function startEndlessMode" not in js:
    js += "\n\n" + endless_logic
    with open('script.js', 'w') as f:
        f.write(js)
