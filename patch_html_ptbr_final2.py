import re

with open("index.html", "r") as f:
    html = f.read()

translations = {
    '<h2 id="game-over-title">Victory!</h2>': '<h2 id="game-over-title">VITÓRIA!</h2>',
    '<h2>Configurações de Áudio</h2>': '<h2>Configurações</h2>',
    '<h2>Trophies & Achievements</h2>': '<h2>Troféus e Conquistas</h2>',
    '<h2 id="forge-title">Forge Card</h2>': '<h2 id="forge-title">Forjar Carta</h2>',
}

for eng, pt in translations.items():
    html = html.replace(eng, pt)

with open("index.html", "w") as f:
    f.write(html)
