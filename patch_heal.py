import re

with open("script.js", "r") as f:
    js = f.read()

heal_fix = """
    let targetEl = index !== null ?
        document.getElementById(`${side === 'opponent' ? 'opp' : 'player'}-slot-${index}`) :
        document.querySelector(side === 'opponent' ? '.bot-avatar' : '#battle-player-avatar');

    // Fix: Removed copy-pasted block that checked defenderIdx and damageAmount

    if (targetEl) {
        targetEl.appendChild(healEl);
        setTimeout(() => healEl.remove(), 1000);
    }
}
"""

js = re.sub(r"let targetEl = index !== null \? [\s\S]*?setTimeout\(\(\) => healEl\.remove\(\), 1000\);\n    \}\n\}", heal_fix, js)

with open("script.js", "w") as f:
    f.write(js)
