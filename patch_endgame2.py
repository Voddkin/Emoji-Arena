import re

with open('script.js', 'r') as f:
    js = f.read()

endgame_fix = """
function endGame(isWin) {
    AudioManager.playBGM(isWin ? 'bgm_victory' : 'bgm_defeat');

    // Clear the board visual state
    document.getElementById('battle-screen').classList.add('hidden');

    const resultsScreen = document.getElementById('game-over-overlay');
    if (!resultsScreen) {
        console.error("Results screen 'game-over-overlay' not found.");
    } else {
        resultsScreen.classList.remove('hidden');
    }

    const title = document.getElementById('game-over-title');
    const rewards = document.getElementById('game-over-rewards');

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

            // Recompensa Exponencial
            let lootEarned = Math.floor(20 * Math.pow(1.15, s.currentWave));
            s.loot += lootEarned;

            // Heal 20% max HP
            let healAmt = Math.floor(s.maxPlayerHp * 0.20);
            s.playerHp = Math.min(s.maxPlayerHp, gameState.player.hp + healAmt);

            if(rewards) rewards.innerText = `Onda ${s.currentWave} Concluída! (+${lootEarned} 💰 na sacola)`;

            saveProfile();

            document.getElementById('btn-return-menu').onclick = () => {
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
            return; // Skip standard return to menu

        } else {
            // Defeat in endless
            const s = playerProfile.endlessState;
            const keptLoot = Math.floor(s.loot * 0.3); // Perde 70%
            playerProfile.coins += keptLoot;

            showNotification(`Fim da Linha! Você sobreviveu até a Onda ${s.currentWave}. Você salvou ${keptLoot} Moedas.`, "error");

            saveEndlessLeaderboard(s.currentWave, s.dominantTribe, keptLoot);

            playerProfile.endlessState = null;
            saveProfile();

            document.getElementById('btn-return-menu').onclick = () => {
                if(resultsScreen) resultsScreen.classList.add('hidden');
                showScreen(screens.LEADERBOARD);
            };
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
    document.getElementById('btn-return-menu').onclick = () => {
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
"""

js = re.sub(r'function endGame\(isWin\) \{[\s\S]*?\n\}(?=\nfunction checkWinCondition)', endgame_fix, js)

with open('script.js', 'w') as f:
    f.write(js)
