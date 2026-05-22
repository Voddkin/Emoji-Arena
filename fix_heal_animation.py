import re

with open("script.js", "r") as f:
    js = f.read()

# Fix the copy-paste bug inside triggerHealAnimation where it uses damageAmount
old_heal = """function triggerHealAnimation(side, index, amount) {
    if (amount <= 0) return;
    const gameContainer = document.getElementById('battle-screen');

    // Brutal screen shake on damage >= 5
    if (damageAmount >= 5) {
        const appEl = document.getElementById('game-app') || document.body;
        appEl.classList.add('screen-shake-brutal');
        setTimeout(() => appEl.classList.remove('screen-shake-brutal'), 400);
    }"""

new_heal = """function triggerHealAnimation(side, index, amount) {
    if (amount <= 0) return;
    const gameContainer = document.getElementById('battle-screen');
"""

js = js.replace(old_heal, new_heal)

with open("script.js", "w") as f:
    f.write(js)
