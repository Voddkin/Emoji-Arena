with open("script.js", "r") as f:
    js = f.read()

target = "document.getElementById('btn-settings').addEventListener('click', () => {"

new_listeners = """
    document.getElementById('btn-play-endless').addEventListener('click', () => {
        document.getElementById('play-modes-modal').classList.add('hidden');
        if (playerProfile.endlessState) {
            if (confirm("Continuar a Run salva na Onda " + playerProfile.endlessState.currentWave + "?")) {
                currentMatchMode = 'endless';
                startMatchmaking(true);
            } else {
                playerProfile.endlessState = null;
                startEndlessMode();
            }
        } else {
            startEndlessMode();
        }
    });

    document.getElementById('btn-leaderboard').addEventListener('click', () => {
        renderLeaderboard();
        showScreen(screens.LEADERBOARD);
    });

"""
if "btn-play-endless" not in js:
    js = js.replace(target, new_listeners + target)

with open("script.js", "w") as f:
    f.write(js)
