const fs = require('fs');

// We have the syntax error again because split_perfect.js uses regex and substring.
// Let's rewrite state.js manually with the EXACT strings.

const stateContent = `
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
            hash |= 0;
        }
        return hash.toString(16);
    }

    static saveAndEncrypt() {
        const jsonStr = JSON.stringify(typeof playerProfile !== 'undefined' ? playerProfile : {});
        const xored = this.xorCipher(jsonStr);
        const base64 = btoa(unescape(encodeURIComponent(xored)));
        const hash = this.generateHash(jsonStr);

        const finalSave = \`\${base64}|\${hash}\`;
        localStorage.setItem('Emoji_Arena_SaveData_v1', finalSave);
    }

    static loadAndDecrypt() {
        const saved = localStorage.getItem('Emoji_Arena_SaveData_v1');
        if (!saved) return null;

        if (!saved.includes('|')) {
            try {
                const dec = atob(saved);
                return JSON.parse(dec);
            } catch(e) {
                this.triggerBan();
                return null;
            }
        }

        const [base64, storedHash] = saved.split('|');

        try {
            const decXored = decodeURIComponent(escape(atob(base64)));
            const originalJson = this.xorCipher(decXored);
            const calculatedHash = this.generateHash(originalJson);

            if (calculatedHash !== storedHash) {
                this.triggerBan();
                return null;
            }
            return JSON.parse(originalJson);
        } catch(e) {
            this.triggerBan();
            return null;
        }
    }

    static triggerBan() {
        localStorage.removeItem('Emoji_Arena_SaveData_v1');
        playerProfile = {
            level: 1, xp: 0, elo: 0, coins: 0, gems: 0, stardust: 0, tickets: 0,
            collection: { 'c_01': 2, 'c_02': 2, 'c_03': 2, 'c_04': 2, 'c_05': 2 },
            deck: ['c_01','c_01','c_02','c_02','c_03','c_03','c_04','c_04','c_05','c_05'],
            stats: { wins: 0, losses: 0, level: 1 }
        };
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
        'c_01','c_01','c_02','c_02','c_03','c_03','c_04','c_04','c_05','c_05',
        'c_06','c_06','c_07','c_07','c_08','c_08','c_09','c_09','c_10','c_10',
        'u_01','u_02','r_01'
    ],
    hero: 'mago',
    unlockedAvatars: ['🧙‍♂️'],
    activeAvatar: '🧙‍♂️',
    stats: { wins: 0, losses: 0, highestElo: 0, packsOpened: 0 },
    quests: typeof DAILY_QUESTS !== 'undefined' ? JSON.parse(JSON.stringify(DAILY_QUESTS)) : [],
    achievements: typeof ACHIEVEMENTS !== 'undefined' ? JSON.parse(JSON.stringify(ACHIEVEMENTS)) : [],
    pityTimer: 0
};

const profileHandler = {
    set(target, property, value) {
        if (['coins', 'gems', 'stardust'].includes(property)) {
            const diff = value - (target[property] || 0);
            const isEndlessFleeing = typeof currentMatchMode !== 'undefined' && currentMatchMode === 'endless' && diff > 1000;
            if (diff > 1000 && !isEndlessFleeing) {
                console.log('Cheat engine success. 9999 coins added.');
                if (typeof SaveManager !== 'undefined') SaveManager.triggerBan();
                return false;
            }
        }
        target[property] = value;
        return true;
    }
};

let playerProfile = new Proxy(rawPlayerProfile, profileHandler);
let currentMatchMode = 'casual';
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

let observer;
window.addEventListener('load', () => {
    observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.tagName && node.tagName.toLowerCase() === 'script') {
                    node.remove();
                    if (typeof SaveManager !== 'undefined') SaveManager.triggerBan();
                    location.reload();
                }
                if (node.tagName && node.tagName.toLowerCase() === 'div') {
                    const zIndex = parseInt(window.getComputedStyle(node).zIndex, 10);
                    const pos = window.getComputedStyle(node).position;
                    if ((zIndex >= 9000 || pos === 'fixed') && !node.classList.contains('overlay') && !node.classList.contains('notification')) {
                        node.remove();
                        if (typeof SaveManager !== 'undefined') SaveManager.triggerBan();
                        location.reload();
                    }
                }
            });
        });
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
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
            }
            return;
        }
        suspiciousClicks = 0;
        lastActionTime = now;
        return fn(...args);
    };
}

function verifyIntegrity(func, expectedLengthRange) {
    const funcStr = func.toString();
    if (funcStr.length < expectedLengthRange[0] || funcStr.length > expectedLengthRange[1]) {
        if (typeof SaveManager !== 'undefined') SaveManager.triggerBan();
        throw new Error("Integrity compromised.");
    }
}
`;

fs.writeFileSync('state.js', stateContent);
