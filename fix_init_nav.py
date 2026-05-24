import re

with open("script.js", "r") as f:
    js = f.read()

# Add setupBottomNav to DOMContentLoaded
startup_block = """
document.addEventListener('DOMContentLoaded', () => {
    // Generate initial shop and collection
    renderDailyDeals();
    renderCollection();
    renderDeck();
    renderAvatars();
    renderQuests();
    renderAchievements();

    // Attempt load
    loadProfile();

    // Módulo 10: Setup bottom nav
    if(typeof setupBottomNav === 'function') {
        setupBottomNav();
    }
"""

js = js.replace("document.addEventListener('DOMContentLoaded', () => {\n    // Generate initial shop and collection", startup_block)

with open("script.js", "w") as f:
    f.write(js)
