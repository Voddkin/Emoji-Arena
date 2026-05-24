import re

with open("script.js", "r") as f:
    js = f.read()

# Connect btn-play-draft to startArenaDraft()
draft_btn_logic = """
    const btnDraft = document.getElementById('btn-play-draft');
    if (btnDraft) {
        btnDraft.addEventListener('click', () => {
            const modal = document.getElementById('play-modes-modal');
            if (modal) modal.classList.add('hidden');
            startArenaDraft();
        });
    }

    const btnAbandonDraft = document.getElementById('btn-abandon-draft');
    if(btnAbandonDraft) {
        btnAbandonDraft.addEventListener('click', () => {
            if(confirm('Tem certeza que deseja abandonar sua corrida atual na Arena?')) {
                playerProfile.arenaState = null;
                saveProfile();
                showScreenSPA('main-menu');
            }
        });
    }
"""

js = js.replace("// Main Menu Buttons", "// Main Menu Buttons\n" + draft_btn_logic)

with open("script.js", "w") as f:
    f.write(js)
