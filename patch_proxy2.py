import re

with open("script.js", "r") as f:
    js = f.read()

# Let's just find "let playerProfile = {" and inject the proxy stuff around it
start_idx = js.find("let playerProfile = {")
end_idx = js.find("};", start_idx) + 2

profile_obj = js[start_idx:end_idx].replace("let playerProfile =", "let rawPlayerProfile =")

proxy_logic = """
// --- SecOps: Memory Proxy Trap ---
const profileHandler = {
    set(target, property, value) {
        if (['coins', 'gems', 'stardust'].includes(property)) {
            const diff = value - (target[property] || 0);
            if (diff > 1000) {
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

new_js = js[:start_idx] + proxy_logic + profile_obj + "\nlet playerProfile = new Proxy(rawPlayerProfile, profileHandler);\n" + js[end_idx:]

with open("script.js", "w") as f:
    f.write(new_js)
