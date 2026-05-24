import re

with open("script.js", "r") as f:
    js = f.read()

observer_code = """
// --- SecOps: DOM Watchdog (Anti-Tampermonkey) ---
const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.tagName && node.tagName.toLowerCase() === 'script') {
                node.remove();
                SaveManager.triggerBan();
                location.reload();
            }
            if (node.tagName && node.tagName.toLowerCase() === 'div') {
                const zIndex = parseInt(window.getComputedStyle(node).zIndex, 10);
                const pos = window.getComputedStyle(node).position;
                if ((zIndex >= 9000 || pos === 'fixed') && !node.classList.contains('overlay') && !node.classList.contains('notification')) {
                    node.remove();
                    SaveManager.triggerBan();
                    location.reload();
                }
            }
        });
    });
});
observer.observe(document.documentElement, { childList: true, subtree: true });

// Morte ao Eval
window.eval = function() { throw new Error('Cheat Detected'); };
const originalSetTimeout = window.setTimeout;
window.setTimeout = function(func, delay) {
    if (typeof func === 'string') throw new Error('Cheat Detected');
    return originalSetTimeout(func, delay);
};
const originalSetInterval = window.setInterval;
window.setInterval = function(func, delay) {
    if (typeof func === 'string') throw new Error('Cheat Detected');
    return originalSetInterval(func, delay);
};
// --- Fim SecOps Watchdog ---
"""

# Insert right after 'use strict';
js = js.replace("'use strict';", "'use strict';\n" + observer_code)

with open("script.js", "w") as f:
    f.write(js)
