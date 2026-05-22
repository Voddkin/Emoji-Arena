import re

with open("script.js", "r") as f:
    js = f.read()

crypto_class = """
class SaveManager {
    static SECRET_KEY = 'Em0j!@r3n4#2026';

    static xorCipher(text) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            result += String.fromCharCode(text.charCodeAt(i) ^ this.SECRET_KEY.charCodeAt(i % this.SECRET_KEY.length));
        }
        return result;
    }

    static generateHash(text) {
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            hash = (hash << 5) - hash + text.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return hash.toString(16); // Return hex string
    }

    static encryptAndSave(dataObj) {
        const jsonStr = JSON.stringify(dataObj);
        const xored = this.xorCipher(jsonStr);
        const base64 = btoa(unescape(encodeURIComponent(xored)));
        const hash = this.generateHash(jsonStr);

        const finalSave = `${base64}|${hash}`;
        localStorage.setItem('Emoji_Arena_SaveData_v1', finalSave);
    }

    static loadAndDecrypt() {
        const saved = localStorage.getItem('Emoji_Arena_SaveData_v1');
        if (!saved) return null;

        // Anti-tamper simple check (Legacy save migration fallback disabled for security, but we check delimiter)
        if (!saved.includes('|')) {
            // Assume it's an old save (pre-crypto) and migrate it once
            try {
                const parsed = JSON.parse(saved);
                this.encryptAndSave(parsed);
                return parsed;
            } catch(e) {
                // If it fails, it's garbage
                this.triggerBan();
                return null;
            }
        }

        const [base64, storedHash] = saved.split('|');
        try {
            const xored = decodeURIComponent(escape(atob(base64)));
            const jsonStr = this.xorCipher(xored);

            const calculatedHash = this.generateHash(jsonStr);
            if (calculatedHash !== storedHash) {
                this.triggerBan();
                return null;
            }

            return JSON.parse(jsonStr);
        } catch(e) {
            this.triggerBan();
            return null;
        }
    }

    static triggerBan() {
        localStorage.removeItem('Emoji_Arena_SaveData_v1');
        // Reset local memory state
        playerProfile = {
            level: 1, xp: 0, elo: 0, coins: 0, gems: 0, stardust: 0, tickets: 0,
            collection: { 'c_01': 2, 'c_02': 2, 'c_03': 2, 'c_04': 2, 'c_05': 2 },
            deck: ['c_01','c_01','c_02','c_02','c_03','c_03','c_04','c_04','c_05','c_05'],
            stats: { wins: 0, losses: 0, level: 1 }
        };
        // Show permanent red notification
        const container = document.getElementById('notification-container');
        if (container) {
            const notif = document.createElement('div');
            notif.className = 'notification error';
            notif.style.backgroundColor = '#c0392b';
            notif.style.color = 'white';
            notif.innerText = 'DADOS CORROMPIDOS: Tentativa de manipulação detectada. Seu progresso foi resetado.';
            container.appendChild(notif);
        }
    }
}
"""

js = js.replace("function saveProfile() {", crypto_class + "\n\nfunction saveProfile() {")

# Update saveProfile
save_profile_new = """function saveProfile() {
    SaveManager.encryptAndSave(playerProfile);
    updateUIProfile();
}"""
js = re.sub(r'function saveProfile\(\) \{[\s\S]*?\}', save_profile_new, js, count=1)

# Update loadProfile
load_profile_new = """function loadProfile() {
    const parsed = SaveManager.loadAndDecrypt();

    if (parsed) {
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
}"""
js = re.sub(r'function loadProfile\(\) \{[\s\S]*?enforceDeckLimits\(\);\n    \}\n    updateUIProfile\(\);\n\}', load_profile_new, js, count=1)

with open("script.js", "w") as f:
    f.write(js)
