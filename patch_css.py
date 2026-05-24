import re

with open("styles.css", "r") as f:
    css = f.read()

new_css = """
/* MODULE 10: LOBBY VIVO & GAME FEEL AAA */
:root {
    --bg-color: #1a0b2e;
    --text-color: #ecf0f1;
    --primary-color: #f1c40f; /* Ouro */
    --secondary-color: #9b59b6; /* Roxo */
    --accent-color: #e74c3c;

    --hud-glass: rgba(255, 255, 255, 0.1);
    --hud-border: rgba(255, 255, 255, 0.2);

    --button-shadow: #b33939;
    --button-face: #ff5252;
}

body {
    font-family: 'Fredoka One', 'Lilita One', sans-serif;
    background-color: #000;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
    color: var(--text-color);
}

#game-app {
    width: 100%;
    max-width: 600px; /* Mobile Aspect Ratio / PC wrapper */
    height: 100vh;
    background: radial-gradient(circle at center, #2c1654 0%, #1a0b2e 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 50px rgba(0,0,0,0.8);
}

/* Background Particles & Grid */
.bg-particles {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background-image:
        radial-gradient(circle at 15% 50%, rgba(155, 89, 182, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 85% 30%, rgba(241, 196, 15, 0.05) 0%, transparent 50%);
    z-index: 0;
    pointer-events: none;
    animation: breathe-bg 6s infinite alternate ease-in-out;
}
@keyframes breathe-bg {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(1.05); opacity: 1; }
}

/* Top HUD */
#top-hud {
    position: absolute;
    top: 0; left: 0; width: 100%;
    height: 60px;
    padding: 10px 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
    background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%);
}

.hud-left {
    display: flex;
    align-items: center;
    gap: 10px;
}

.rank-shield {
    font-size: 2rem;
    filter: drop-shadow(0 4px 4px rgba(0,0,0,0.5));
}

.hud-xp-container {
    display: flex;
    flex-direction: column;
}

.hud-level {
    font-size: 0.9rem;
    -webkit-text-stroke: 1px #000;
    text-shadow: 1px 1px 0 #000;
}

.hud-xp-bar {
    width: 100px;
    height: 10px;
    background: rgba(0,0,0,0.5);
    border: 2px solid #555;
    border-radius: 5px;
    overflow: hidden;
}
.hud-xp-fill {
    height: 100%;
    background: #3498db;
    width: 0%;
    transition: width 0.3s;
}

.hud-right {
    display: flex;
    gap: 8px;
}

.currency-pill {
    background: var(--hud-glass);
    border: 1px solid var(--hud-border);
    backdrop-filter: blur(5px);
    border-radius: 20px;
    padding: 5px 10px;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 5px;
    -webkit-text-stroke: 1px #000;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
}

/* Single Page App Container */
#game-container {
    flex-grow: 1;
    position: relative;
    width: 100%;
    height: calc(100vh - 140px); /* Space for HUD and NAV */
    margin-top: 60px;
    overflow-y: auto;
    overflow-x: hidden;
}

/* Smooth Slide Transitions */
.screen {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s;
    transform: translateX(100%);
    opacity: 0;
    display: flex;
    flex-direction: column;
    pointer-events: none;
}
.screen.active {
    transform: translateX(0);
    opacity: 1;
    pointer-events: auto;
}
.screen.slide-left {
    transform: translateX(-100%);
    opacity: 0;
}

/* --- LOBBY VIVO --- */
.lobby-screen {
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
}

/* Hero Center Stage */
.hero-display {
    position: relative;
    margin-top: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

.hero-avatar-giant {
    font-size: 8rem;
    filter: drop-shadow(0px 15px 20px rgba(0,0,0,0.8));
    z-index: 2;
}

.idle-breathe {
    animation: breathe 3s infinite ease-in-out;
}
@keyframes breathe {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-10px) scale(1.02); }
}

/* Peeking Cards Behind Hero */
.peeking-cards {
    position: absolute;
    top: 20%;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    z-index: 1;
}
.peek-card {
    width: 60px; height: 90px;
    background: linear-gradient(135deg, #34495e, #2c3e50);
    border: 3px solid #f1c40f;
    border-radius: 8px;
    position: absolute;
    box-shadow: 0 10px 15px rgba(0,0,0,0.5);
    transition: transform 0.3s;
}
.card-1 { transform: rotate(-25deg) translate(-70px, 20px); }
.card-2 { transform: translateY(-30px); z-index: 2;}
.card-3 { transform: rotate(25deg) translate(70px, 20px); }

/* Mega Battle Button */
.mega-battle-container {
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 10;
    margin-top: auto;
    margin-bottom: 20px;
}
.mega-battle-btn {
    font-family: 'Lilita One', cursive;
    font-size: 3rem;
    color: white;
    background: var(--button-face);
    border: none;
    border-radius: 15px;
    padding: 15px 60px;
    text-transform: uppercase;
    -webkit-text-stroke: 2px #731b1b;
    box-shadow: 0 12px 0 var(--button-shadow), 0 20px 30px rgba(0,0,0,0.6);
    cursor: pointer;
    transition: transform 0.1s, box-shadow 0.1s, filter 0.3s;
    animation: pulse-glow 2s infinite;
}
.mega-battle-btn:active {
    transform: translateY(12px);
    box-shadow: 0 0px 0 var(--button-shadow), 0 5px 10px rgba(0,0,0,0.6);
}
@keyframes pulse-glow {
    0%, 100% { filter: brightness(1); }
    50% { filter: brightness(1.2); }
}

/* Chest Slots */
.chest-slots-container {
    display: flex;
    justify-content: center;
    gap: 15px;
    width: 100%;
    padding: 10px;
    z-index: 10;
}
.chest-slot {
    width: 70px;
    height: 80px;
    background: rgba(0,0,0,0.6);
    border: 3px solid #555;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    color: #888;
    box-shadow: inset 0 5px 10px rgba(0,0,0,0.8);
    position: relative;
    -webkit-text-stroke: 0;
}
.chest-slot.filled {
    border-color: #f1c40f;
    background: linear-gradient(to bottom, #8e44ad, #2c3e50);
    color: white;
    font-weight: bold;
    -webkit-text-stroke: 1px #000;
}
.chest-slot .chest-timer {
    background: rgba(0,0,0,0.7);
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 0;
    border-bottom-left-radius: 9px;
    border-bottom-right-radius: 9px;
    font-size: 0.7rem;
    padding: 2px 0;
}

/* --- BOTTOM NAV BAR --- */
#bottom-nav {
    position: absolute;
    bottom: 0; left: 0; width: 100%;
    height: 80px;
    background: #0b0514;
    border-top: 2px solid #333;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 1000;
    box-shadow: 0 -5px 20px rgba(0,0,0,0.8);
}
.nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #888;
    cursor: pointer;
    transition: transform 0.2s, color 0.2s;
    width: 20%;
}
.nav-icon {
    font-size: 1.8rem;
    margin-bottom: 5px;
    filter: drop-shadow(0 2px 2px rgba(0,0,0,0.5));
}
.nav-label {
    font-size: 0.7rem;
    font-weight: bold;
    text-transform: uppercase;
}
.nav-item.active {
    color: var(--primary-color);
    transform: translateY(-5px);
}
.nav-item.active .nav-icon {
    filter: drop-shadow(0 5px 10px var(--primary-color));
}

/* --- ARENA 3D FEEL --- */
.battlefield {
    background: linear-gradient(180deg, #110515 0%, #2c1654 100%);
    perspective: 1000px;
}

.lane {
    position: relative;
    border: none;
}
.lane::before {
    content: '';
    position: absolute;
    top: 0; left: 10%; width: 80%; height: 100%;
    background: linear-gradient(to bottom, rgba(255,255,255,0.05), transparent);
    transform: rotateX(45deg);
    pointer-events: none;
    z-index: 0;
}

/* Brutal Attack Animation */
@keyframes attack-clash {
    0% { transform: translateY(0) scale(1); }
    40% { transform: translateY(-100px) scale(1.1); z-index: 100; filter: drop-shadow(0 20px 20px rgba(255,0,0,0.8)); }
    50% { transform: translateY(-80px) scale(1); }
    100% { transform: translateY(0) scale(1); }
}
.attack-animation {
    animation: attack-clash 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
}

/* General Typography & Juice */
h1, h2, h3 {
    -webkit-text-stroke: 1.5px #000;
    text-shadow: 2px 2px 0px #000;
}

button {
    font-family: 'Fredoka One', 'Lilita One', sans-serif;
    text-transform: uppercase;
    -webkit-text-stroke: 1px rgba(0,0,0,0.5);
}

.card, .hero-avatar {
    filter: drop-shadow(0px 10px 10px rgba(0,0,0,0.6));
}
"""

css = new_css + "\n\n" + css

with open("styles.css", "w") as f:
    f.write(css)
