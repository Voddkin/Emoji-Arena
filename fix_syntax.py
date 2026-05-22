import re

with open("script.js", "r") as f:
    js = f.read()

# Fix addXP
js = js.replace("showNotification(`Level Up! Nível ${playerProfile.level}. +10 Gemas!`, \"success\");\n    }\n}\n\nfunction showScreen", "showNotification(`Level Up! Nível ${playerProfile.level}. +10 Gemas!`, \"success\");\n    }\n});\n\nfunction showScreen")

# Fix openPack
js = js.replace("updateUIProfile();\n}\n\nfunction createParticles", "updateUIProfile();\n});\n\nfunction createParticles")

with open("script.js", "w") as f:
    f.write(js)
