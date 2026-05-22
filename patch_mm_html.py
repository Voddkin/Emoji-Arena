import re

with open("index.html", "r") as f:
    html = f.read()

# Add Matchmaking Overlay HTML
mm_html = """
        <!-- Matchmaking Overlay -->
        <div id="matchmaking-overlay" class="overlay hidden" style="z-index: 2000; background: radial-gradient(circle, #2c0e0e, #000);">
            <div class="modal-content" style="background: transparent; border: none; box-shadow: none;">
                <h2 style="color: var(--primary-color); font-size: 3rem; text-shadow: 0 0 20px var(--primary-color);">Buscando Oponente...</h2>
                <div class="radar" style="width: 100px; height: 100px; border: 4px solid var(--primary-color); border-radius: 50%; margin: 30px auto; position: relative; overflow: hidden; box-shadow: 0 0 20px var(--primary-color);">
                    <div style="width: 50%; height: 50%; background: var(--primary-color); position: absolute; bottom: 50%; right: 50%; transform-origin: bottom right; animation: scan 2s linear infinite;"></div>
                </div>
                <p id="matchmaking-tip" style="font-size: 1.2rem; margin-top: 20px; font-style: italic; color: #bdc3c7;">Dica: Carregando...</p>
            </div>
        </div>
"""

# Insert before Notification Container
html = html.replace('<div id="notification-container">', mm_html + '\n    <div id="notification-container">')

with open("index.html", "w") as f:
    f.write(html)

with open("styles.css", "a") as f:
    f.write("\n@keyframes scan { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }\n")
