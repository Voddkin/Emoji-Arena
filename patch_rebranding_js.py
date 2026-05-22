import re

with open("script.js", "r") as f:
    js = f.read()

# 1. Update SaveData keys and migrate old saves
save_logic = """
function saveProfile() {
    localStorage.setItem('Emoji_Arena_SaveData_v1', JSON.stringify(playerProfile));
    updateUIProfile();
}

function loadProfile() {
    // Migration logic
    let saved = localStorage.getItem('Emoji_Arena_SaveData_v1');
    if (!saved) {
        const oldSaved = localStorage.getItem('cardWarsUltimateProfile');
        if (oldSaved) {
            saved = oldSaved;
            localStorage.setItem('Emoji_Arena_SaveData_v1', oldSaved);
            localStorage.removeItem('cardWarsUltimateProfile');
            console.log("Migração de save antigo concluída com sucesso!");
        }
    }

    if (saved) {
        const parsed = JSON.parse(saved);
        playerProfile = { ...playerProfile, ...parsed };

        if(!playerProfile.unlockedAvatars) playerProfile.unlockedAvatars = ['🧙‍♂️'];
        if(!playerProfile.activeAvatar) playerProfile.activeAvatar = '🧙‍♂️';
        if(!playerProfile.hero) playerProfile.hero = 'mago';
        if(!playerProfile.quests) playerProfile.quests = JSON.parse(JSON.stringify(DAILY_QUESTS));
        if(!playerProfile.achievements) playerProfile.achievements = JSON.parse(JSON.stringify(ACHIEVEMENTS));
        if(playerProfile.pityTimer === undefined) playerProfile.pityTimer = 0;

        enforceDeckLimits();
    }
    updateUIProfile();
}
"""

js = re.sub(r'function saveProfile\(\) \{[\s\S]*?\}\n\nfunction loadProfile\(\) \{[\s\S]*?\}\n\n// Ensure', save_logic + "\n// Ensure", js)

# 2. Audio Prefs key update
js = js.replace("'cardWarsAudioPrefs'", "'EmojiArenaAudioPrefs'")

# 3. Welcome Notification
welcome_hook = """
    setupBottomNav();
    updateUIProfile();
    setTimeout(() => {
        showNotification("Bem-vindo ao Emoji Arena!", "success");
    }, 1000);
"""
js = js.replace("setupBottomNav();\n    updateUIProfile();", welcome_hook)

# 4. Reset Data update
js = js.replace("localStorage.removeItem('cardWarsUltimateProfile');", "localStorage.removeItem('Emoji_Arena_SaveData_v1');")

with open("script.js", "w") as f:
    f.write(js)
