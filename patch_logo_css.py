import re

with open("styles.css", "r") as f:
    css = f.read()

logo_css = """
/* MODULE 11: REBRANDING CSS LOGO */
#game-logo {
    font-family: 'Lilita One', 'Fredoka One', cursive;
    font-size: clamp(3rem, 10vw, 5rem);
    text-transform: uppercase;
    text-align: center;
    margin-top: 20px;
    z-index: 20;
    position: relative;

    /* Fire/Gold Gradient Text */
    background: linear-gradient(to bottom, #f1c40f 0%, #e67e22 50%, #c0392b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    /* Thick Stroke & 3D Shadow */
    -webkit-text-stroke: 3px #2c0e0e;
    filter: drop-shadow(0px 8px 10px rgba(0,0,0,0.8));

    /* Game Juice Animation */
    animation: logo-float 4s ease-in-out infinite;
}

#game-logo::before {
    content: "⚔️";
    position: absolute;
    left: -10%;
    top: 50%;
    transform: translateY(-50%) rotate(-20deg);
    font-size: clamp(2rem, 6vw, 3rem);
    -webkit-text-fill-color: initial; /* Reset gradient for emoji */
    -webkit-text-stroke: 0px;
    filter: drop-shadow(0 5px 5px rgba(0,0,0,0.8));
    z-index: -1;
}

#game-logo::after {
    content: "🃏";
    position: absolute;
    right: -5%;
    top: 50%;
    transform: translateY(-50%) rotate(15deg);
    font-size: clamp(2rem, 6vw, 3rem);
    -webkit-text-fill-color: initial;
    -webkit-text-stroke: 0px;
    filter: drop-shadow(0 5px 5px rgba(0,0,0,0.8));
    z-index: -1;
}

@keyframes logo-float {
    0%, 100% { transform: translateY(0); filter: drop-shadow(0px 8px 10px rgba(0,0,0,0.8)) brightness(1); }
    50% { transform: translateY(-8px); filter: drop-shadow(0px 15px 15px rgba(230,126,34,0.6)) brightness(1.2); }
}

"""

css += "\n\n" + logo_css

with open("styles.css", "w") as f:
    f.write(css)
