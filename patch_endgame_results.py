import re

with open('script.js', 'r') as f:
    js = f.read()

endgame_clean = """
function endGame(isWin) {
    AudioManager.playBGM(isWin ? 'bgm_victory' : 'bgm_defeat');

    // Clear the board visual state
    const battleScreen = document.getElementById('battle-screen');
    if (battleScreen) battleScreen.classList.add('hidden');

    const resultsScreen = document.getElementById('game-over-overlay');
    if (resultsScreen) {
        resultsScreen.classList.remove('hidden');
    }

    const title = document.getElementById('game-over-title');
    const rewards = document.getElementById('game-over-rewards');
    const btnReturnMenu = document.getElementById('btn-return-menu');

    if (isWin) {
        if(title) { title.innerText = "VITÓRIA!"; title.style.color = "#FFD700"; }
        if(rewards) rewards.innerText = "+25 XP | +10 Moedas";

        addXP(25);
        playerProfile.coins += 10;

        // Battle Pass integration (Módulo 8.1)
        if(typeof addCrowns === 'function') addCrowns(10);

        if (currentMatchMode === 'ranked') {
            playerProfile.elo += 25;
            playerProfile.rankedWins++;
        }

    } else {
        if(title) { title.innerText = "DERROTA"; title.style.color = "#FF4444"; }
        if(rewards) rewards.innerText = "+5 XP | +2 Moedas";

        addXP(5);
        playerProfile.coins += 2;

        // Battle Pass integration (Módulo 8.1)
        if(typeof addCrowns === 'function') addCrowns(2);

        if (currentMatchMode === 'ranked') {
            playerProfile.elo = Math.max(0, playerProfile.elo - 15);
            playerProfile.rankedLosses++;
        }
    }

    // Endless Mode End Game Logic (Módulo 9.1)
    if (currentMatchMode === 'endless') {
        if (isWin) {
            const s = playerProfile.endlessState;
            if(!s) return;

            // Recompensa Exponencial
            let lootEarned = Math.floor(20 * Math.pow(1.15, s.currentWave));
            s.loot += lootEarned;

            // Heal 20% max HP
            let healAmt = Math.floor(s.maxPlayerHp * 0.20);
            s.playerHp = Math.min(s.maxPlayerHp, gameState.player.hp + healAmt);

            if(rewards) rewards.innerText = `Onda ${s.currentWave} Concluída! (+${lootEarned} 💰 na sacola)`;

            saveProfile();

            if (btnReturnMenu) {
                btnReturnMenu.innerText = "Continuar";
                btnReturnMenu.onclick = () => {
                    if(resultsScreen) resultsScreen.classList.add('hidden');
                    if (s.currentWave % 5 === 0) {
                        // Trigger Risk / Reward Modal
                        openEndlessDecisionModal();
                    } else {
                        s.currentWave++;
                        saveProfile();
                        startMatchmaking(false); // Next wave
                    }
                };
            }
            return; // Skip standard return to menu

        } else {
            // Defeat in endless
            const s = playerProfile.endlessState;
            if(!s) return;
            const keptLoot = Math.floor(s.loot * 0.3); // Perde 70%
            playerProfile.coins += keptLoot;

            showNotification(`Fim da Linha! Você sobreviveu até a Onda ${s.currentWave}. Você salvou ${keptLoot} Moedas.`, "error");

            saveEndlessLeaderboard(s.currentWave, s.dominantTribe, keptLoot);

            playerProfile.endlessState = null;
            saveProfile();

            if (btnReturnMenu) {
                btnReturnMenu.innerText = "Voltar";
                btnReturnMenu.onclick = () => {
                    if(resultsScreen) resultsScreen.classList.add('hidden');
                    showScreen(screens.LEADERBOARD);
                };
            }
            return; // Skip standard return to menu
        }
    }

    // Roguelike End Game Logic (Módulo 9)
    if (currentMatchMode === 'roguelike') {
        if (isWin) {
            playerProfile.roguelikeState.currentNode.completed = true;
            playerProfile.roguelikeState.coins += 15;
            playerProfile.roguelikeState.playerHp = gameState.player.hp;
            saveProfile();
            if(rewards) rewards.innerText += " | +15 Ouro (Run)";
        } else {
            playerProfile.roguelikeState = null;
            saveProfile();
        }
    }

    saveProfile();
    updateUIProfile();

    // Default return to menu behavior
    if (btnReturnMenu) {
        btnReturnMenu.innerText = "Voltar ao Menu";
        btnReturnMenu.onclick = () => {
            if(resultsScreen) resultsScreen.classList.add('hidden');
            if (currentMatchMode === 'roguelike' && isWin) {
                renderMapScreen();
            } else if (currentMatchMode === 'roguelike' && !isWin) {
                showScreen(screens.MENU);
            } else {
                showScreen(screens.MENU);
            }
            AudioManager.playBGM('bgm_menu');
        };
    }
}
"""

# Regex to safely remove ALL occurrences of function endGame(...) {...}
# It matches function endGame followed by opening brace, up to the next function declaration or end of file.
cleaned_js = re.sub(r'function endGame\(.*?\) \{[\s\S]*?(?=\nfunction [a-zA-Z0-9_]+\()', '', js)

# Insert it before checkWinCondition
final_js = cleaned_js.replace('function checkWinCondition() {', endgame_clean + '\nfunction checkWinCondition() {')

with open('script.js', 'w') as f:
    f.write(final_js)
