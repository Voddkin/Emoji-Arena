import re

with open("script.js", "r") as f:
    js = f.read()

# Add gameState back at the top
game_state_declaration = """
let currentMatchMode = 'casual'; // casual, ranked, roguelike, endless, draft
let gameState = {
    turn: 0,
    isPlayerTurn: true,
    player: {
        hp: 30, maxHp: 30,
        credits: 1, maxCredits: 1,
        battery: 0,
        deck: [], hand: [], board: [null, null, null, null, null],
        secrets: [],
        heroUsed: false
    },
    opponent: {
        hp: 30, maxHp: 30,
        credits: 1, maxCredits: 1,
        battery: 0,
        deck: [], hand: [], board: [null, null, null, null, null],
        secrets: [],
        isBot: true, botLevel: 'medium',
        heroUsed: false,
        selectedCardIndex: null
    }
};
"""

js = js.replace("let currentMatchMode = 'casual'; // casual, ranked, adventure, draft", game_state_declaration)

with open("script.js", "w") as f:
    f.write(js)
