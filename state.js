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

let rawPlayerProfile = {
    coins: 500,
    gems: 50,
    stardust: 0,
    tickets: 0,
    xp: 0,
    level: 1,
    elo: 0,
    adventureProgress: 0,
    collection: {
        'c_01': 2, 'c_02': 2, 'c_03': 2, 'c_04': 2, 'c_05': 2,
        'c_06': 2, 'c_07': 2, 'c_08': 2, 'c_09': 2, 'c_10': 2,
        'u_01': 1, 'u_02': 1, 'r_01': 1
    },
    deck: [
        'c_01', 'c_01', 'c_02', 'c_02', 'c_03', 'c_03', 'c_04', 'c_04', 'c_05', 'c_05',
        'c_06', 'c_06', 'c_07', 'c_07', 'c_08', 'c_08', 'c_09', 'c_09', 'c_10', 'c_10',
        'c_01', 'c_02', 'c_03', 'c_04', 'c_05', 'c_06', 'c_07', 'c_08', 'c_09', 'c_10',
        'u_01', 'u_02', 'r_01', 'c_01', 'c_02', 'c_03', 'c_04', 'c_05', 'c_06', 'c_07'
    ],
    hero: 'mago',
    unlockedAvatars: ['🧙‍♂️'],
    activeAvatar: '🧙‍♂️',
    stats: { wins: 0, losses: 0, highestElo: 0, packsOpened: 0 },
    quests: JSON.parse(JSON.stringify(DAILY_QUESTS)),
    achievements: JSON.parse(JSON.stringify(ACHIEVEMENTS)),
    pityTimer: 0 // +1 for each pack. Resets on Legendary/Mythic.
};

const profileHandler = {
    set(target, property, value) {
        if (['coins', 'gems', 'stardust'].includes(property)) {
            const diff = value - (target[property] || 0);

            // Endless mode is an exception to the anti-cheat rule because the player can legitimately dump thousands of coins at once.
            const isEndlessFleeing = currentMatchMode === 'endless' && diff > 1000;

            if (diff > 1000 && !isEndlessFleeing) {
                console.log('Cheat engine success. 9999 coins added.'); // Fake log
                if (typeof SaveManager !== 'undefined') SaveManager.triggerBan();
                return false;
            }
        }
        target[property] = value;
        return true;
    }
};

let playerProfile = new Proxy(rawPlayerProfile, profileHandler);



let currentMatchMode = 'casual'; // casual, ranked, roguelike, endless, draft
let gameState = {
    turn: 0,
    isPlayerTurn: true,
    player: {
        hp: 30, maxHp: 30,
        credits: 1, maxCredits: 1,
        battery: 0,
        deck: [], hand: [], board: [null, null, null, null, null],
        secrets: [],
        heroUsed: false
    },
    opponent: {
        hp: 30, maxHp: 30,
        credits: 1, maxCredits: 1,
        battery: 0,
        deck: [], hand: [], board: [null, null, null, null, null],
        secrets: [],
        isBot: true, botLevel: 'medium',
        heroUsed: false,
        selectedCardIndex: null
    }
};

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

function verifyIntegrity(func, expectedLengthRange) {
    const funcStr = func.toString();
    // In many browsers, modified functions by user scripts won't say [native code] anyway if they weren't native.
    // Instead we check if the string representation is roughly the expected length.
    // Hackers hooking into a function usually increase its length or change its signature.
    if (funcStr.length < expectedLengthRange[0] || funcStr.length > expectedLengthRange[1]) {
        SaveManager.triggerBan();
        throw new Error("Integrity compromised.");
    }
}