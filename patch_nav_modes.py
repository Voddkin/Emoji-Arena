import re

with open("script.js", "r") as f:
    js = f.read()

# Connect the Mega Battle Button to the Play Modes overlay
battle_btn_logic = """
    const btnPlayModes = document.getElementById('btn-play-modes');
    if (btnPlayModes) {
        btnPlayModes.addEventListener('click', () => {
            const modal = document.getElementById('play-modes-modal');
            if (modal) modal.classList.remove('hidden');
        });
    }
"""

js = js.replace("// Menu navigation", "// Menu navigation\n" + battle_btn_logic)

with open("script.js", "w") as f:
    f.write(js)
