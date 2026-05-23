import re

with open("script.js", "r") as f:
    js = f.read()

# Let's match from "let targetEl =" up to the end of the function block.
start_idx = js.find("let targetEl = index !== null ?")
end_idx = js.find("}", start_idx) + 1
# wait, there's a setTimeout inside
end_idx = js.find("}", end_idx + 1) + 1
end_idx = js.find("}", end_idx + 1) + 1 # just to be safe

# The error causing variables: defenderIdx, defenderSide, damageAmount.
old_block = js[start_idx:end_idx]

heal_fix = """let targetEl = index !== null ?
        document.getElementById(`${side === 'opponent' ? 'opp' : 'player'}-slot-${index}`) :
        document.querySelector(side === 'opponent' ? '.bot-avatar' : '#battle-player-avatar');

    if (targetEl) {
        targetEl.appendChild(healEl);
        setTimeout(() => healEl.remove(), 1000);
    }
}"""

js = js[:start_idx] + heal_fix + js[end_idx:]

with open("script.js", "w") as f:
    f.write(js)
