import re

with open("script.js", "r") as f:
    js = f.read()

# I see my previous patch script `fix_init_nav.py` completely missed because the string wasn't "document.addEventListener('DOMContentLoaded', () => {\n    // Generate initial shop and collection".
# Let's cleanly inject setupBottomNav and the notification inside DOMContentLoaded.

startup_fix = """document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
    setupBottomNav();
    updateUIProfile();
    setTimeout(() => {
        showNotification("Bem-vindo ao Emoji Arena!", "success");
    }, 1000);
"""

js = js.replace("document.addEventListener('DOMContentLoaded', () => {\n    loadProfile();", startup_fix)

with open("script.js", "w") as f:
    f.write(js)
