import re

# Update CSS
with open("styles.css", "r") as f:
    css = f.read()

css = css.replace("#game-app {\n    width: 100%;", "#game-app {\n    display: none; /* SecOps Default Hide */\n    width: 100%;")

noscript_css = """
/* SecOps Noscript Container */
#noscript-warning {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background-color: #0b0514;
    color: #e74c3c;
    z-index: 9999999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Lilita One', cursive;
    text-align: center;
    padding: 20px;
}
"""
css += "\n" + noscript_css
with open("styles.css", "w") as f:
    f.write(css)

# Update HTML
with open("index.html", "r") as f:
    html = f.read()

noscript_tag = """
    <noscript>
        <div id="noscript-warning">
            <img src="assets/images/anti_cheat_warning.png" alt="Anti-Cheat Warning" style="max-width: 200px; margin-bottom: 20px;">
            <h1 style="font-size: 3rem; -webkit-text-stroke: 2px #5a0b0b;">ERRO CRÍTICO</h1>
            <p style="font-size: 1.5rem;">O Javascript está desativado. Habilite os scripts para jogar.</p>
        </div>
    </noscript>
"""
html = html.replace('<body>', '<body>\n' + noscript_tag)

with open("index.html", "w") as f:
    f.write(html)

# Update JS to display: flex on load
with open("script.js", "r") as f:
    js = f.read()

js = js.replace("document.addEventListener('DOMContentLoaded', () => {", "document.addEventListener('DOMContentLoaded', () => {\n    document.getElementById('game-app').style.display = 'flex';")

with open("script.js", "w") as f:
    f.write(js)
