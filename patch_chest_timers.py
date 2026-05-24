import re

with open("script.js", "r") as f:
    js = f.read()

chest_timer_logic = """
// Chest Time Updater
setInterval(() => {
    if (!playerProfile.chests) return;
    const now = Date.now();
    let updated = false;
    for(let i=0; i<4; i++) {
        const chest = playerProfile.chests[i];
        if (chest && chest.unlockTime) {
            const slotEl = document.querySelector(`#chest-slot-${i} .chest-timer`);
            if (slotEl) {
                const diff = chest.unlockTime - now;
                if (diff <= 0) {
                    slotEl.innerText = "PRONTO!";
                    slotEl.style.color = "#2ecc71";
                } else {
                    const sec = Math.ceil(diff / 1000);
                    const m = Math.floor(sec / 60);
                    const s = sec % 60;
                    slotEl.innerText = `${m}m ${s}s`;
                }
            }
        }
    }
}, 1000);
"""

js = js.replace("// --- MATCHMAKING & VS SCREEN ---", chest_timer_logic + "\n// --- MATCHMAKING & VS SCREEN ---")

with open("script.js", "w") as f:
    f.write(js)
