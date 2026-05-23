import re

with open("script.js", "r") as f:
    js = f.read()

# I see the leftover block from my previous bad regex.
bad_block = """    if (defenderIdx === null) AudioManager.playSFX('hero_damage');

    if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        healEl.style.left = (rect.left + rect.width/2 - 20) + 'px';
        healEl.style.top = (rect.top + rect.height/2 - 20) + 'px';
        gameContainer.appendChild(healEl);
        setTimeout(() => healEl.remove(), 1200);
    }
}"""

js = js.replace(bad_block, "")

with open("script.js", "w") as f:
    f.write(js)
