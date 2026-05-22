import re

with open("index.html", "r") as f:
    html = f.read()

# Fix duplicate google font
html = html.replace('<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Lilita+One&display=swap" rel="stylesheet">\n    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Lilita+One&display=swap" rel="stylesheet">', '<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Lilita+One&display=swap" rel="stylesheet">')

# Fix duplicate game-app
html = re.sub(r'<div id="game-app">[\s\S]*?<div id="game-app">', '<div id="game-app">', html, count=1)

with open("index.html", "w") as f:
    f.write(html)
