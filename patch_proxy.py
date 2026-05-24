import re

with open("script.js", "r") as f:
    js = f.read()

proxy_logic = """
// --- SecOps: Memory Proxy Trap ---
const profileHandler = {
    set(target, property, value) {
        if (['coins', 'gems', 'stardust'].includes(property)) {
            const diff = value - (target[property] || 0);
            if (diff > 1000) {
                console.log('Cheat engine success. 9999 coins added.'); // Fake log
                SaveManager.triggerBan();
                return false;
            }
        }
        target[property] = value;
        return true;
    }
};

let rawPlayerProfile = {
    coins: 500,
    gems: 50,
    stardust: 0,
    tickets: 0,
    xp: 0,
    level: 1,
    elo: 0,
    adventureProgress: 0,
    collection: {
        'c_01': 2, 'c_02': 2, 'c_03': 2, 'c_04': 2, 'c_05': 2,
        'c_06': 2, 'c_07': 2, 'c_08': 2, 'c_09': 2, 'c_10': 2,
        'u_01': 1, 'u_02': 1, 'r_01': 1
    },
    deck: [
        'c_01', 'c_01', 'c_02', 'c_02', 'c_03', 'c_03', 'c_04', 'c_04', 'c_05', 'c_05',
        'c_06', 'c_06', 'c_07', 'c_07', 'c_08', 'c_08', 'c_09', 'c_09', 'c_10', 'c_10',
        'c_01', 'c_02', 'c_03', 'c_04', 'c_05', 'c_06', 'c_07', 'c_08', 'c_09', 'c_10',
        'u_01', 'u_02', 'r_01', 'c_01', 'c_02', 'c_03', 'c_04', 'c_05', 'c_06', 'c_07'
    ],
    stats: { wins: 0, losses: 0, level: 1 }
};

let playerProfile = new Proxy(rawPlayerProfile, profileHandler);
"""

# We need to replace the original let playerProfile = { ... } declaration
js = re.sub(r'let playerProfile = \{[\s\S]*?stats: \{ wins: 0, losses: 0, level: 1 \}\n\};', proxy_logic, js)

with open("script.js", "w") as f:
    f.write(js)
