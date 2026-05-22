with open("index.html", "r") as f:
    html = f.read()

# 1. Add Endless Button to Play Modes Modal
old_play_modes = """                        <div class="play-mode-card">
                            <h3>Treino Livre</h3>
                            <p>Partida casual contra o Bot Fácil.</p>
                            <p>Gratuito</p>
                            <button id="btn-play-casual" class="buy-btn">Treinar</button>
                        </div>
                    </div>
                    <button id="btn-close-play-modes" class="danger-btn">Voltar</button>"""

new_play_modes = """                        <div class="play-mode-card">
                            <h3>Treino Livre</h3>
                            <p>Partida casual contra o Bot Fácil.</p>
                            <p>Gratuito</p>
                            <button id="btn-play-casual" class="buy-btn">Treinar</button>
                        </div>
                        <div class="play-mode-card" style="border-color: #8e44ad; box-shadow: 0 0 15px rgba(142,68,173,0.5);">
                            <h3 style="color: #9b59b6;">Fenda da Eternidade</h3>
                            <p>Sobrevivência Infinita. Seu Deck. Risco e Recompensa.</p>
                            <p>Desafio Supremo</p>
                            <button id="btn-play-endless" class="buy-btn" style="background: linear-gradient(to bottom, #9b59b6, #8e44ad);">Entrar na Fenda</button>
                        </div>
                    </div>
                    <button id="btn-close-play-modes" class="danger-btn">Voltar</button>"""
html = html.replace(old_play_modes, new_play_modes)

# 2. Add Leaderboard button to Main Menu
old_menu_buttons = """                <div class="menu-row">
                    <button id="btn-quests" style="width:48%">Quests</button>
                    <button id="btn-achievements" style="width:48%">Trophies</button>
                </div>"""
new_menu_buttons = """                <div class="menu-row">
                    <button id="btn-quests" style="width:48%">Quests</button>
                    <button id="btn-achievements" style="width:48%">Trophies</button>
                </div>
                <button id="btn-leaderboard" style="background: linear-gradient(to bottom, #d35400, #c0392b);">🏆 Hall da Fama</button>"""
html = html.replace(old_menu_buttons, new_menu_buttons)


# 3. Add Mutation UI and Endless Wave text to Battle Screen
old_battle_start = """        <!-- Battle Screen -->
        <div id="battle-screen" class="screen">
            <!-- Top / Opponent -->"""

new_battle_start = """        <!-- Battle Screen -->
        <div id="battle-screen" class="screen">
            <!-- Endless Info -->
            <div id="endless-info-bar" class="hidden" style="position: absolute; top: 10px; left: 10px; z-index: 100; background: rgba(0,0,0,0.8); border: 2px solid #8e44ad; padding: 10px; border-radius: 10px; text-align: center; color: white;">
                <div style="font-size: 1.5rem; font-weight: bold; color: #9b59b6; text-shadow: 0 0 5px #8e44ad;">Onda <span id="endless-wave-display">1</span></div>
                <div id="mutation-container" class="hidden" style="margin-top: 5px; color: #e74c3c; animation: pulse-red 2s infinite;">
                    <span id="mutation-icon" style="font-size: 1.5rem;">☣️</span> <span id="mutation-name" style="font-weight: bold;">Mutação</span>
                </div>
                <div style="margin-top: 5px; font-size: 0.9rem; color: #f1c40f;">Saque: <span id="endless-loot-display">0</span> 💰</div>
            </div>

            <!-- Top / Opponent -->"""
html = html.replace(old_battle_start, new_battle_start)

# 4. Endless Decision Modal & Leaderboard Screen
old_game_over = """            <!-- Game Over Overlay -->
            <div id="game-over-overlay" class="overlay hidden">"""

new_endless_modals = """            <!-- Endless Decision Modal -->
            <div id="endless-decision-modal" class="overlay hidden" style="backdrop-filter: blur(15px); z-index: 1001;">
                <div class="modal-content large" style="background: #110515; border-color: #8e44ad; box-shadow: 0 0 40px #8e44ad;">
                    <h2 style="color: #9b59b6; font-size: 3rem; text-shadow: 0 0 20px #8e44ad;">Chefe Derrotado!</h2>
                    <p style="font-size: 1.2rem; color: #ecf0f1;">Você completou a Onda <span id="decision-wave">5</span>.</p>
                    <p style="font-size: 1.5rem; color: #f1c40f; margin: 20px 0;">Saque Acumulado: <span id="decision-loot">0</span> 💰</p>

                    <div style="display: flex; gap: 30px; width: 100%; justify-content: center; margin-top: 30px;">
                        <div style="flex: 1; text-align: center; background: rgba(0,0,0,0.5); padding: 20px; border-radius: 10px; border: 2px solid #27ae60;">
                            <h3 style="color: #2ecc71;">Fugir</h3>
                            <p style="font-size: 0.9rem; margin-bottom: 20px;">Leve 100% do seu saque em segurança e registre seu recorde.</p>
                            <button id="btn-endless-flee" class="buy-btn" style="background: #27ae60; border-color: #2ecc71; width: 100%; padding: 20px;">Correr (+<span id="btn-flee-loot">0</span> 💰)</button>
                        </div>

                        <div style="flex: 1; text-align: center; background: rgba(0,0,0,0.5); padding: 20px; border-radius: 10px; border: 2px solid #c0392b;">
                            <h3 style="color: #e74c3c;">Avançar</h3>
                            <p style="font-size: 0.9rem; margin-bottom: 20px;">Continue para a próxima onda. Se morrer, perde 70% do saque!</p>
                            <button id="btn-endless-continue" class="danger-btn" style="width: 100%; padding: 20px;">Descer Mais Fundo ☠️</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Game Over Overlay -->
            <div id="game-over-overlay" class="overlay hidden">"""
html = html.replace(old_game_over, new_endless_modals)

leaderboard_screen = """
        <!-- Leaderboard Screen -->
        <div id="leaderboard-screen" class="screen" style="background-color: #000; background-image: radial-gradient(circle, #2c3e50 0%, #000 80%);">
            <h2 class="metallic-text" style="font-size: 4rem; margin-bottom: 5px;">Hall da Fama</h2>
            <h3 style="color: #e67e22; margin-bottom: 40px; font-weight: normal;">Fenda da Eternidade - Top 5 Runs</h3>

            <div id="leaderboard-container" style="width: 80%; max-width: 800px; display: flex; flex-direction: column; gap: 15px; margin: 0 auto; flex-grow: 1; overflow-y: auto; padding: 20px;">
                <!-- Runs injected here -->
            </div>

            <button class="btn-back" style="position: static; margin: 30px auto 0 auto; width: 250px;">Back to Menu</button>
        </div>
"""
notification_sys = "<!-- Notification System -->"
html = html.replace(notification_sys, leaderboard_screen + '\n    ' + notification_sys)

with open("index.html", "w") as f:
    f.write(html)
