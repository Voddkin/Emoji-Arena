import re

with open("script.js", "r") as f:
    js = f.read()

rl_logic = """
// --- SecOps: Auto-Clicker & Rate Limiting ---
let lastActionTime = 0;
let suspiciousClicks = 0;

function withRateLimit(actionName, fn) {
    return function(...args) {
        const now = Date.now();
        if (now - lastActionTime < 300) {
            suspiciousClicks++;
            if (suspiciousClicks > 5) {
                console.warn("Auto-clicker detectado. Ignorando.");
                // Optionally trigger ban if it gets too high, but let's just block for now
            }
            return; // Block execution
        }
        suspiciousClicks = 0;
        lastActionTime = now;
        return fn.apply(this, args);
    };
}
"""

js = js.replace("// --- Fim SecOps ---", "// --- Fim SecOps ---\n" + rl_logic)

# Wrap critical functions
# openPack -> openPack = withRateLimit('openPack', function(type) { ... })
js = js.replace("function openPack(type)", "const openPack = withRateLimit('openPack', function(type)")
js = js.replace("function addXP(amount)", "const addXP = withRateLimit('addXP', function(amount)")

with open("script.js", "w") as f:
    f.write(js)
