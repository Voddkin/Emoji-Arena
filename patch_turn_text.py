import re

with open("script.js", "r") as f:
    js = f.read()

# I am looking for things like "Your Turn" that might be hidden.
# Also "Not enough energy!"
translations = {
    'showNotification("Not enough energy!", "error");': 'showNotification("Energia Insuficiente!", "error");',
    "Select target for": "Selecione um alvo para",
    "Opponent's Turn": "Turno do Oponente",
    "Your Turn": "Seu Turno",
}

for eng, pt in translations.items():
    js = js.replace(eng, pt)

with open("script.js", "w") as f:
    f.write(js)
