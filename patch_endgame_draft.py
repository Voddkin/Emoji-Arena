import re

with open("script.js", "r") as f:
    js = f.read()

draft_win_logic = """
    // Draft Arena End Game Logic (Módulo 9.2)
    if (currentMatchMode === 'draft') {
        const s = playerProfile.arenaState;
        if (s) {
            if (isWin) s.wins++;
            else s.losses++;

            saveProfile();

            if (s.wins >= 12 || s.losses >= 3) {
                if (rewards) rewards.innerText = `Fim da Arena! Vitórias: ${s.wins}`;
                if (btnReturnMenu) {
                    btnReturnMenu.innerText = "Resgatar Recompensas";
                    btnReturnMenu.onclick = () => {
                        if(resultsScreen) resultsScreen.classList.add('hidden');
                        claimArenaVault(s.wins);
                    };
                }
                return; // Stop default menu routing
            } else {
                if (rewards) rewards.innerText = `Vitórias: ${s.wins}/12 | Derrotas: ${s.losses}/3`;
                if (btnReturnMenu) {
                    btnReturnMenu.innerText = "Continuar Arena";
                    btnReturnMenu.onclick = () => {
                        if(resultsScreen) resultsScreen.classList.add('hidden');
                        showScreenSPA('draft-screen');
                        renderDraftChoices(); // Update UI counters
                    };
                }
                return;
            }
        }
    }
"""

js = js.replace("// Endless Mode End Game Logic (Módulo 9.1)", draft_win_logic + "\n    // Endless Mode End Game Logic (Módulo 9.1)")

with open("script.js", "w") as f:
    f.write(js)
