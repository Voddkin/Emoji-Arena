import re

with open("script.js", "r") as f:
    js = f.read()

# Make showScreen delegate to showScreenSPA to fix legacy code calling it
spa_logic = """function showScreen(screenId) {
    showScreenSPA(screenId);

    AudioManager.playBGM('bgm_menu');
    if (screenId === screens.COLLECTION) {
        renderCollection();
        renderDeck();
    } else if (screenId === screens.SHOP) {
        renderDailyDeals();
        renderAvatars();
    }
}
"""

js = re.sub(r'function showScreen\(screenId\) \{[\s\S]*?renderAvatars\(\);\n    \}\n\}', spa_logic, js)

with open("script.js", "w") as f:
    f.write(js)
