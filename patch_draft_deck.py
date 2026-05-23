import re

with open("script.js", "r") as f:
    js = f.read()

# Fix deck loading for draft mode in startBattle
draft_deck_logic = """
    // Deck and Hand
    let activeDeck = playerProfile.deck;
    if (currentMatchMode === 'draft' && playerProfile.arenaState) activeDeck = playerProfile.arenaState.deck;

    gameState.player.deck = [...activeDeck].sort(() => 0.5 - Math.random());
    gameState.player.hand = [];

    // Fake deck for opponent (could simulate a boss or a similar draft deck)
    gameState.opponent.deck = [...activeDeck].sort(() => 0.5 - Math.random());
    gameState.opponent.hand = [];
"""

js = js.replace("""    // Deck and Hand
    gameState.player.deck = [...playerProfile.deck].sort(() => 0.5 - Math.random());
    gameState.player.hand = [];

    gameState.opponent.deck = [...playerProfile.deck].sort(() => 0.5 - Math.random()); // Fake deck for opponent
    gameState.opponent.hand = [];""", draft_deck_logic.strip())

with open("script.js", "w") as f:
    f.write(js)
