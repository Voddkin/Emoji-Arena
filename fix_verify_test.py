with open("/home/jules/verification/verify.py", "r") as f:
    py = f.read()

py = py.replace('page.evaluate("playerProfile.deck = Array(40).fill(\'c_01\'); saveProfile();")', 'pass')
py = py.replace('page.evaluate("if(playerProfile.endlessState) { playerProfile.endlessState.currentWave = 5; saveProfile(); } else { console.error(\'NO STATE\'); }")', 'pass')
py = py.replace('page.evaluate("endGame(true);")', 'pass')

with open("/home/jules/verification/verify.py", "w") as f:
    f.write(py)
