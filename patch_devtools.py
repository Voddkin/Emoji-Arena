import re

with open("script.js", "r") as f:
    js = f.read()

devtools_logic = """
// --- SecOps: DevTools & Reverse Engineering Traps ---
document.addEventListener('contextmenu', e => e.preventDefault());

document.addEventListener('keydown', e => {
    // Bloqueia F12
    if (e.key === 'F12') e.preventDefault();
    // Bloqueia Ctrl+Shift+I / J
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) e.preventDefault();
    // Bloqueia Ctrl+U (Ver código-fonte)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) e.preventDefault();
});

// Debugger Trap
setInterval(() => {
    (function() {
        return false;
    }
    ['constructor']('debugger')
    ());
}, 1000);
// --- Fim SecOps ---
"""

js = js.replace("// --- Helper functions ---", devtools_logic + "\n// --- Helper functions ---")
# Wait, let's inject it at the top of the IIFE
js = js.replace("'use strict';", "'use strict';\n" + devtools_logic)

with open("script.js", "w") as f:
    f.write(js)
