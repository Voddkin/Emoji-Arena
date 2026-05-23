import re

with open("script.js", "r") as f:
    js = f.read()

# Replace the hidden logic
js = js.replace("""    // Clear the board visual state
    const battleScreen = document.getElementById('battle-screen');
    if (battleScreen) battleScreen.classList.add('hidden');""", """    // SPA Transition is handled via showScreenSPA
    // Do NOT hide the battle screen manually here to avoid desync""")

with open("script.js", "w") as f:
    f.write(js)
