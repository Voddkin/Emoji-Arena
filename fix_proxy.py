import re

with open("script.js", "r") as f:
    js = f.read()

# Fix proxy trap for Endless Mode massive loot dumps.
proxy_fix = """
const profileHandler = {
    set(target, property, value) {
        if (['coins', 'gems', 'stardust'].includes(property)) {
            const diff = value - (target[property] || 0);

            // Endless mode is an exception to the anti-cheat rule because the player can legitimately dump thousands of coins at once.
            const isEndlessFleeing = currentMatchMode === 'endless' && diff > 1000;

            if (diff > 1000 && !isEndlessFleeing) {
                console.log('Cheat engine success. 9999 coins added.'); // Fake log
                if (typeof SaveManager !== 'undefined') SaveManager.triggerBan();
                return false;
            }
        }
        target[property] = value;
        return true;
    }
};
"""

js = re.sub(r'const profileHandler = \{[\s\S]*?return true;\n    \}\n\};', proxy_fix, js)

with open("script.js", "w") as f:
    f.write(js)
