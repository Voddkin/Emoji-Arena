import re

with open("script.js", "r") as f:
    js = f.read()

draft_logic = """
// --- MODULE 9.2: ARENA DRAFT ENGINE ---
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
"""

js = js.replace("// --- MODULE 14:", draft_logic + "\n// --- MODULE 14:")

with open("script.js", "w") as f:
    f.write(js)
