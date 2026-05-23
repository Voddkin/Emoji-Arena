import re

with open("script.js", "r") as f:
    js = f.read()

# Replace the hidden class addition with proper SPA handling later, or just remove it, because results overlay goes on top, then Return to Menu calls showScreenSPA.
endgame_logic_fix = """
    // Clear the board visual state (handled by SPA slide transition later)
    // Removed battleScreen.classList.add('hidden'); to prevent SPA desync
"""

js = js.replace("    const battleScreen = document.getElementById('battle-screen');\n    if (battleScreen) battleScreen.classList.add('hidden');", endgame_logic_fix)

# We also need to check what btnReturnMenu does:
# `showScreen(screens.MENU);` -> It should call `showScreenSPA`. Wait, we already modified `showScreen` or created `showScreenSPA`?
