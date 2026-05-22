import re

with open("script.js", "r") as f:
    js = f.read()

translations = {
    # Notifications
    'showNotification("Not enough energy!", "error");': 'showNotification("Energia insuficiente!", "error");',
    'showNotification(`Select target for ${card.name}`, "info");': 'showNotification(`Selecione o alvo para ${card.name}`, "info");',

    # Generic UI / Hardcoded innerText
    "title.innerText = \"VITÓRIA!\";": "title.innerText = \"VITÓRIA!\";", # already fine
    "title.innerText = \"DERROTA\";": "title.innerText = \"DERROTA\";",

    # Turn texts
    "document.getElementById('turn-indicator').innerText = side === 'player' ? \"Your Turn\" : \"Opponent's Turn\";":
        "document.getElementById('turn-indicator').innerText = side === 'player' ? \"Seu Turno\" : \"Turno do Oponente\";",

    "document.getElementById('turn-indicator').innerText = \"Opponent's Turn\";":
        "document.getElementById('turn-indicator').innerText = \"Turno do Oponente\";",

    # Prompts / Confirms
    'confirm("TEM CERTEZA? Todo o seu progresso será perdido!")': 'confirm("TEM CERTEZA? Todo o seu progresso será perdido!")',

    # Quests texts that might be left
    "q.desc = 'Jogue 5 Partidas'": "q.desc = 'Jogue 5 Partidas'", # Already translated in DAILY_QUESTS

    # Missing Matchmaking
    '<p>Finding a worthy opponent...</p>': '<p>Encontrando um oponente digno...</p>',

    # Shop Text JS
    "shopEl.innerHTML = `<div style='text-align:center;'>Nenhuma oferta hoje.</div>`;": "shopEl.innerHTML = `<div style='text-align:center;'>Nenhuma oferta hoje.</div>`;"
}

for eng, pt in translations.items():
    js = js.replace(eng, pt)

with open("script.js", "w") as f:
    f.write(js)
