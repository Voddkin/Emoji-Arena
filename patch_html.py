import re

with open("index.html", "r") as f:
    html = f.read()

# Try again cleanly.
# Revert to git version first to avoid partial patching mess
import subprocess
subprocess.run(["git", "checkout", "--", "index.html"])

with open("index.html", "r") as f:
    html = f.read()

font_link = '<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Lilita+One&display=swap" rel="stylesheet">\n    <link rel="stylesheet" href="styles.css">'
html = html.replace('<link rel="stylesheet" href="styles.css">', font_link)

app_structure = """
    <div id="game-app">
        <!-- TOP HUD -->
        <header id="top-hud">
            <div class="hud-left">
                <div class="rank-shield" id="hud-rank-shield">🟤</div>
                <div class="hud-xp-container">
                    <div class="hud-level">Nível <span id="hud-level-val">1</span></div>
                    <div class="hud-xp-bar"><div class="hud-xp-fill" id="hud-xp-fill"></div></div>
                </div>
            </div>
            <div class="hud-right">
                <div class="currency-pill gold-pill">🪙 <span id="hud-coins">0</span></div>
                <div class="currency-pill gem-pill">💎 <span id="hud-gems">0</span></div>
                <div class="currency-pill dust-pill">✨ <span id="hud-dust">0</span></div>
            </div>
        </header>

        <div id="game-container">
"""
html = html.replace('<div id="game-container">', app_structure)

live_lobby = """
        <!-- Main Menu (Live Lobby) -->
        <div id="main-menu" class="screen active lobby-screen">
            <!-- Background Particles -->
            <div class="bg-particles"></div>

            <!-- Hero Display (Center Stage) -->
            <div class="hero-display">
                <div class="peeking-cards" id="lobby-peeking-cards">
                    <div class="peek-card card-1"></div>
                    <div class="peek-card card-2"></div>
                    <div class="peek-card card-3"></div>
                </div>
                <div class="hero-avatar-giant idle-breathe" id="lobby-avatar">🧙‍♂️</div>
            </div>

            <!-- Mega Battle Button -->
            <div class="mega-battle-container">
                <button id="btn-play-modes" class="mega-battle-btn">BATALHA</button>
            </div>

            <!-- 4 Chest Slots -->
            <div class="chest-slots-container">
                <div class="chest-slot" id="chest-slot-0">Vazio</div>
                <div class="chest-slot" id="chest-slot-1">Vazio</div>
                <div class="chest-slot" id="chest-slot-2">Vazio</div>
                <div class="chest-slot" id="chest-slot-3">Vazio</div>
            </div>
"""
# There is a risk that play-modes-modal is hidden deeper
html = re.sub(r'<div id="main-menu" class="screen active">.*?<!-- Play Modes Modal -->', live_lobby + '\n        </div>\n            <!-- Play Modes Modal -->', html, flags=re.DOTALL)

# Bottom Nav Bar
bottom_nav = """
        </div> <!-- End of game-container -->

        <!-- BOTTOM NAV BAR -->
        <nav id="bottom-nav">
            <div class="nav-item" id="nav-shop">
                <div class="nav-icon">🛒</div>
                <div class="nav-label">Loja</div>
            </div>
            <div class="nav-item" id="nav-collection">
                <div class="nav-icon">🎴</div>
                <div class="nav-label">Cartas</div>
            </div>
            <div class="nav-item active" id="nav-home">
                <div class="nav-icon">🏠</div>
                <div class="nav-label">Batalha</div>
            </div>
            <div class="nav-item" id="nav-quests">
                <div class="nav-icon">📜</div>
                <div class="nav-label">Missões</div>
            </div>
            <div class="nav-item" id="nav-guild">
                <div class="nav-icon">🛡️</div>
                <div class="nav-label">Guilda</div>
            </div>
        </nav>
    </div> <!-- End of game-app -->
"""

# Find the end of game-container. In the old code it ends before Notification Container.
html = html.replace('    <div id="notification-container"></div>', bottom_nav + '\n    <div id="notification-container"></div>')

with open("index.html", "w") as f:
    f.write(html)
