import re

with open("script.js", "r") as f:
    js = f.read()

# Replace menu setup logic to handle bottom nav and new HUD
nav_logic = """
// --- BOTTOM NAV BAR LOGIC (SPA) ---
function setupBottomNav() {
    const navItems = {
        'nav-shop': screens.SHOP,
        'nav-collection': screens.COLLECTION,
        'nav-home': screens.MENU,
        'nav-quests': 'quests-overlay', // Reusing old overlay ID or creating new screen
        'nav-guild': 'guild-screen' // Assumes guild screen exists or will handle gracefully
    };

    Object.keys(navItems).forEach(navId => {
        const el = document.getElementById(navId);
        if(el) {
            el.addEventListener('click', () => {
                // Remove active from all nav items
                document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
                // Add active to clicked
                el.classList.add('active');

                const targetScreen = navItems[navId];

                // If it's an overlay (like quests), open it on top
                if (targetScreen === 'quests-overlay') {
                    renderQuests();
                    document.getElementById('quests-overlay').classList.remove('hidden');
                    return;
                } else if (targetScreen === 'guild-screen') {
                    // Logic for guild if exists
                    const guildEl = document.getElementById('guild-overlay');
                    if(guildEl) guildEl.classList.remove('hidden');
                    return;
                }

                // Otherwise do slide transition
                showScreenSPA(targetScreen);
            });
        }
    });
}

function showScreenSPA(screenId) {
    // Closes all overlays first
    document.querySelectorAll('.overlay').forEach(el => el.classList.add('hidden'));

    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => {
        if (screen.id === screenId) {
            screen.classList.add('active');
            screen.classList.remove('slide-left');
        } else {
            if (screen.classList.contains('active')) {
                screen.classList.add('slide-left');
                setTimeout(() => {
                    screen.classList.remove('active');
                    screen.classList.remove('slide-left');
                }, 400); // Matches CSS transition time
            }
        }
    });
}

function updateHUD() {
    document.getElementById('hud-level-val').innerText = playerProfile.stats.level || 1;

    // Update XP Bar (Requires a small calc if we use the old logic)
    const xpNeeded = (playerProfile.stats.level || 1) * 100;
    const progress = Math.min(100, ((playerProfile.stats.xp || 0) / xpNeeded) * 100);
    document.getElementById('hud-xp-fill').style.width = `${progress}%`;

    document.getElementById('hud-coins').innerText = playerProfile.coins;
    document.getElementById('hud-gems').innerText = playerProfile.gems;
    document.getElementById('hud-dust').innerText = playerProfile.stardust;

    // Also update giant avatar
    document.getElementById('lobby-avatar').innerText = playerProfile.activeAvatar || '🧙‍♂️';
}

function renderChestSlots() {
    // Assuming playerProfile.chests = [{id: 'silver', unlockTime: null}, null, null, null]
    if (!playerProfile.chests) {
        playerProfile.chests = [null, null, null, null];
    }

    for(let i = 0; i < 4; i++) {
        const slotEl = document.getElementById(`chest-slot-${i}`);
        if(!slotEl) continue;

        const chest = playerProfile.chests[i];
        if (chest) {
            slotEl.classList.add('filled');
            slotEl.innerHTML = `📦<div class="chest-timer">Abrir</div>`;
            slotEl.onclick = () => {
                // Dummy open logic for now
                playerProfile.chests[i] = null;
                playerProfile.coins += 50;
                saveProfile();
                showNotification("Baú Aberto! +50 🪙", "success");
                renderChestSlots();
            };
        } else {
            slotEl.classList.remove('filled');
            slotEl.innerHTML = `Vazio`;
            slotEl.onclick = null;
        }
    }
}
"""

# Append nav logic
js += "\n\n" + nav_logic

# Find updateUIProfile and inject updateHUD() and renderChestSlots()
js = js.replace("function updateUIProfile() {", "function updateUIProfile() {\n    updateHUD();\n    renderChestSlots();")

# Overwrite DOMContentLoaded setup
startup_hook = """
    setupBottomNav();
    updateUIProfile();
"""
js = js.replace("loadProfile();\n    \n    // Menu navigation", "loadProfile();\n    " + startup_hook + "\n    // Menu navigation")

with open("script.js", "w") as f:
    f.write(js)
