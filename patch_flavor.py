import re

with open("index.html", "r") as f:
    html = f.read()

html = html.replace('<h3>Pacote Básico</h3>', '<h3>Pacote Emoji Arena</h3>')

with open("index.html", "w") as f:
    f.write(html)
