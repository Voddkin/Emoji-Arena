import re

with open("script.js", "r") as f:
    js = f.read()

# Add empty triggerEndlessMutationEvent to prevent crash, since it was mentioned it was missing
# We will just declare it safely.
mutation_func = """
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
"""

js = js.replace("// --- MATCHMAKING & VS SCREEN ---", mutation_func + "\n// --- MATCHMAKING & VS SCREEN ---")

with open("script.js", "w") as f:
    f.write(js)
