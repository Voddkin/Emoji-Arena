import re

with open("styles.css", "r") as f:
    css = f.read()

# Make the lanes look like 3D paths disappearing into the horizon
arena_css = """
/* Arena 3D Floor Perspective */
.battlefield {
    background: radial-gradient(circle at center top, #2c1654 0%, #110515 80%);
    perspective: 800px;
    position: relative;
    overflow: hidden;
}

.board-container {
    transform: rotateX(10deg);
    transform-style: preserve-3d;
    position: relative;
    z-index: 2;
    padding-bottom: 20px;
}

.lane {
    position: relative;
    background: transparent;
    border: none;
    border-radius: 0;
}

.lane::before {
    content: '';
    position: absolute;
    bottom: -20%;
    left: 10%;
    width: 80%;
    height: 140%;
    background: linear-gradient(to top, rgba(241,196,15,0.1) 0%, transparent 100%);
    transform: perspective(300px) rotateX(40deg);
    z-index: -1;
    pointer-events: none;
    border-bottom: 2px solid rgba(241,196,15,0.3);
}

.card-slot {
    background: rgba(0,0,0,0.4);
    border: 2px dashed rgba(255,255,255,0.1);
    box-shadow: inset 0 10px 20px rgba(0,0,0,0.5);
    border-radius: 12px;
    transform: translateZ(10px);
}

/* Screen Shake effect for brutal impacts */
@keyframes screen-shake-brutal {
    0% { transform: translate(0, 0) rotate(0deg); }
    10% { transform: translate(-10px, -10px) rotate(-2deg); }
    20% { transform: translate(10px, -10px) rotate(2deg); }
    30% { transform: translate(-10px, 10px) rotate(-2deg); }
    40% { transform: translate(10px, 10px) rotate(2deg); }
    50% { transform: translate(-5px, -5px) rotate(-1deg); }
    60% { transform: translate(5px, -5px) rotate(1deg); }
    70% { transform: translate(-5px, 5px) rotate(-1deg); }
    80% { transform: translate(5px, 5px) rotate(1deg); }
    90% { transform: translate(-2px, -2px) rotate(0deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
}

.screen-shake-brutal {
    animation: screen-shake-brutal 0.4s cubic-bezier(.36,.07,.19,.97) both;
}
"""

css += "\n\n" + arena_css

with open("styles.css", "w") as f:
    f.write(css)

# Update javascript to trigger brutal screen shake on big damage
with open("script.js", "r") as f:
    js = f.read()

shake_logic = """
    // Brutal screen shake on damage >= 5
    if (damageAmount >= 5) {
        const appEl = document.getElementById('game-app') || document.body;
        appEl.classList.add('screen-shake-brutal');
        setTimeout(() => appEl.classList.remove('screen-shake-brutal'), 400);
    }
"""

js = js.replace("const gameContainer = document.getElementById('battle-screen');", "const gameContainer = document.getElementById('battle-screen');\n" + shake_logic)

with open("script.js", "w") as f:
    f.write(js)
