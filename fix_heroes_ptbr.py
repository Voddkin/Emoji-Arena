import re

with open("script.js", "r") as f:
    js = f.read()

translations = {
    "desc: 'Causa 2 de dano a qualquer alvo.'": "desc: 'Causa 2 de dano a qualquer alvo.'",
    "desc: 'Ganha +2 de Armadura (HP máximo).'": "desc: 'Ganha +2 de Armadura (HP máximo).'",
    "desc: 'Rouba 1 de Vida do herói inimigo.'": "desc: 'Rouba 1 de Vida do herói inimigo.'",
}
# they are already translated inside heroes.
# Let's check quests
