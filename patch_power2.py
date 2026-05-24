import re

with open("script.js", "r") as f:
    js = f.read()

# Let's also make sure targetEl resolves to the bot avatar properly if defenderIdx is null
target_fix = """
    let targetEl;
    if (defenderIdx !== null) {
        targetEl = document.getElementById(`${defenderSide === 'opponent' ? 'opp' : 'player'}-slot-${defenderIdx}`);
    } else {
        // Fallback to avatar if no index provided (Hero damage)
        targetEl = defenderSide === 'opponent' ? document.querySelector('.bot-avatar') : document.getElementById('battle-player-avatar');
    }
"""

js = re.sub(r'    let targetEl;\n    if \(defenderIdx !== null\) \{[\s\S]*?targetEl = document\.getElementById\(`\$\{defenderSide === \'opponent\' \? \'opp\' \: \'player\'\}-slot-\$\{defenderIdx\}`\);\n    \}\n', target_fix, js)

with open("script.js", "w") as f:
    f.write(js)
