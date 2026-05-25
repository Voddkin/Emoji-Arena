/*

=============================================================================

🛠️ ZONA DO DESENVOLVEDOR - BANCO DE DADOS DE ATUALIZAÇÕES (PATCH NOTES) 🛠️

=============================================================================

COMO ADICIONAR UM NOVO PATCH:

1. Copie o bloco de um objeto existente (com { id, version, date, title... }).

2. Cole no topo deste array (para ficar em primeiro na lista).

3. Mude o 'id' para um valor único, ex: 'patch_1_1'.

4. Escreva o conteúdo livremente usando tags HTML como <strong>, <ul> e <li>.

=============================================================================

*/





// --- SecOps: DOM Watchdog (Anti-Tampermonkey) ---



observer.observe(document.documentElement, { childList: true, subtree: true });


// Morte ao Eval

window.eval = function() { throw new Error('Cheat Detected'); };





// --- Fim SecOps Watchdog ---



// --- MODULE 9.2: ARENA DRAFT ENGINE ---

function generateDraftPool() {
    const pool = [];
    const dist = {
        [RARITIES.COMMON]: 45,
        [RARITIES.UNCOMMON]: 20,
        [RARITIES.RARE]: 10,
        [RARITIES.EPIC]: 4,
        [RARITIES.LEGENDARY]: 1
    };

    Object.keys(dist).forEach(rarity => {
        const availableCards = CardDatabase.filter(c => c.rarity === rarity && c.type !== CARD_TYPES.ENVIRONMENT); // Exclude envs to be safe, or include. Let's include everything.
        const allRarityCards = CardDatabase.filter(c => c.rarity === rarity);

        for (let i = 0; i < dist[rarity]; i++) {
            if (allRarityCards.length > 0) {
                const randomCard = allRarityCards[Math.floor(Math.random() * allRarityCards.length)];
                pool.push(randomCard.id);
            }
        }
    });

    // Shuffle pool
    return pool.sort(() => 0.5 - Math.random());
}


function startArenaDraft() {
    if (playerProfile.coins < 150 && !playerProfile.arenaState) {
        showNotification("Moedas insuficientes para entrar na Arena (Custo: 150 💰)", "error");
        return;
    }

    // Only charge if starting a fresh run
    if (!playerProfile.arenaState) {
        playerProfile.coins -= 150;
        playerProfile.arenaState = {
            pool: generateDraftPool(),
            deck: [],
            wins: 0,
            losses: 0,
            currentChoices: []
        };
        saveProfile();
        showNotification("Bem-vindo à Arena! Custo: 150 💰", "success");
    }

    currentMatchMode = 'draft';
    showScreenSPA('draft-screen');
    renderDraftChoices();
}


// --- MODULE 14: NEWS HUB LOGIC ---




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


// --- SecOps: Auto-Clicker & Rate Limiting ---





// --- SecOps: Anti-Tampering (Integrity Check) ---





// We will run this periodically on critical functions

setInterval(() => {
    try {
        verifyIntegrity(triggerDamageAnimation, [500, 4000]);
        verifyIntegrity(SaveManager.encryptAndSave, [200, 1000]);
    } catch(e) {
        // App dies here
    }
}, 5000);




















const screens = {
    MENU: 'main-menu',
    SHOP: 'shop-screen',
    COLLECTION: 'collection-screen',
    BATTLE: 'battle-screen',
    DRAFT: 'draft-screen'
};








const ADVENTURE_BOSSES = [

    { name: 'O Fazendeiro Louco', hp: 40, avatar: '👨‍🌾', desc: 'Usa apenas cartas de Natureza e Animais.', deckFilter: c => c.tribes && (c.tribes.includes(TRIBES.NATUREZA) || c.tribes.includes(TRIBES.ANIMAL)), botLevel: 'easy' },

    { name: 'Máquina de Guerra', hp: 50, avatar: '🤖', desc: 'Deck focado em Tecnologia e Veículos.', deckFilter: c => c.tribes && (c.tribes.includes(TRIBES.TECNOLOGIA) || c.tribes.includes(TRIBES.VEICULO)), botLevel: 'normal' },

    { name: 'Lorde das Sombras', hp: 60, avatar: '🧛‍♂️', desc: 'Necromancia e feitiços Místicos.', deckFilter: c => c.tribes && c.tribes.includes(TRIBES.MISTICO), botLevel: 'hard' },

    { name: 'Mestre da Cidade', hp: 70, avatar: '🏙️', desc: 'Usa Profissões e Urbano. Muita cura e controle.', deckFilter: c => c.tribes && (c.tribes.includes(TRIBES.URBANO) || c.tribes.includes(TRIBES.PROFISSAO)), botLevel: 'expert' },

    { name: 'O Criador', hp: 100, avatar: '🌌', desc: 'Deck com LENDÁRIAS e MÍTICAS. Boa sorte.', deckFilter: c => c.rarity === RARITIES.LEGENDARY || c.rarity === RARITIES.MYTHIC, botLevel: 'expert' }

];



// --- AUDIO CONTROLLER (SINGLETON) ---

class AudioController {
    constructor() {
        if (AudioController.instance) {
            return AudioController.instance;
        }

        // Load Settings
        const savedAudio = JSON.parse(localStorage.getItem('EmojiArenaAudioPrefs') || '{}');
        this.masterVolume = savedAudio.masterVolume !== undefined ? savedAudio.masterVolume : 1.0;
        this.musicVolume = savedAudio.musicVolume !== undefined ? savedAudio.musicVolume : 0.8;
        this.sfxVolume = savedAudio.sfxVolume !== undefined ? savedAudio.sfxVolume : 1.0;

        // Assets Dictionary (URLs)
        this.assets = {
            bgm: {
                bgm_menu: 'assets/audio/bgm_menu.mp3',
                bgm_battle_normal: 'assets/audio/bgm_battle_normal.mp3',
                bgm_battle_tension: 'assets/audio/bgm_battle_tension.mp3',
                bgm_victory: 'assets/audio/bgm_victory.mp3',
                bgm_defeat: 'assets/audio/bgm_defeat.mp3'
            },
            sfx: {
                ui_hover: 'assets/audio/ui_hover.wav',
                ui_click: 'assets/audio/ui_click.wav',
                ui_error: 'assets/audio/ui_error.wav',
                ui_buy: 'assets/audio/ui_buy.wav',
                ui_chest_rumble: 'assets/audio/ui_chest_rumble.wav',
                ui_chest_burst: 'assets/audio/ui_chest_burst.wav',
                ui_beep: 'assets/audio/ui_beep.wav',

                card_draw: 'assets/audio/card_draw.wav',
                card_play: 'assets/audio/card_play.wav',
                combat_hit: 'assets/audio/combat_hit.wav',
                hero_heal: 'assets/audio/hero_heal.wav',
                hero_damage: 'assets/audio/hero_damage.wav',

                sfx_tribe_animal: 'assets/audio/tribe_animal.wav',
                sfx_tribe_magic: 'assets/audio/tribe_magic.wav',
                sfx_tribe_weather: 'assets/audio/tribe_weather.wav',
                sfx_tribe_metal: 'assets/audio/tribe_metal.wav',
                sfx_tribe_food: 'assets/audio/tribe_food.wav'
            }
        };

        this.currentBGM = null;
        this.bgmAudioObj = new Audio();
        this.bgmAudioObj.loop = true;
        this.nextBgmAudioObj = new Audio();
        this.nextBgmAudioObj.loop = true;

        this.sfxPool = {};
        this.poolSize = 5;

        for (const [key, url] of Object.entries(this.assets.sfx)) {
            this.sfxPool[key] = [];
            for (let i = 0; i < this.poolSize; i++) {
                const audio = new Audio(url);
                this.sfxPool[key].push(audio);
            }
        }

        AudioController.instance = this;
    }

    saveSettings() {
        localStorage.setItem('EmojiArenaAudioPrefs', JSON.stringify({
            masterVolume: this.masterVolume,
            musicVolume: this.musicVolume,
            sfxVolume: this.sfxVolume
        }));
        this.updateBGMVolume();
    }

    updateBGMVolume(targetAudio = this.bgmAudioObj, ratio = 1.0) {
        targetAudio.volume = this.masterVolume * this.musicVolume * ratio;
    }

    playBGM(trackId, crossfadeDuration = 1000) {
        if (this.currentBGM === trackId) return;

        const url = this.assets.bgm[trackId];
        if (!url) return;

        this.currentBGM = trackId;

        if (this.bgmAudioObj.paused || !this.bgmAudioObj.src) {
            this.bgmAudioObj.src = url;
            this.updateBGMVolume();
            this.bgmAudioObj.play().catch(e => console.log('BGM Play blocked'));
            return;
        }

        this.nextBgmAudioObj.src = url;
        this.nextBgmAudioObj.volume = 0;
        this.nextBgmAudioObj.play().catch(e => console.log('BGM Play blocked'));

        const steps = 20;
        const stepTime = crossfadeDuration / steps;
        let currentStep = 0;

        const fadeInterval = setInterval(() => {
            currentStep++;
            const fadeOutRatio = 1 - (currentStep / steps);
            const fadeInRatio = currentStep / steps;

            this.updateBGMVolume(this.bgmAudioObj, fadeOutRatio);
            this.updateBGMVolume(this.nextBgmAudioObj, fadeInRatio);

            if (currentStep >= steps) {
                clearInterval(fadeInterval);
                this.bgmAudioObj.pause();

                const temp = this.bgmAudioObj;
                this.bgmAudioObj = this.nextBgmAudioObj;
                this.nextBgmAudioObj = temp;

                this.updateBGMVolume();
            }
        }, stepTime);
    }

    playSFX(sfxId) {
        const pool = this.sfxPool[sfxId];
        if (!pool) return;

        let audioToPlay = pool.find(a => a.paused || a.ended || a.currentTime === 0);

        if (!audioToPlay) {
            audioToPlay = pool.shift();
            pool.push(audioToPlay);
        }

        audioToPlay.volume = this.masterVolume * this.sfxVolume;
        audioToPlay.currentTime = 0;
        const playPromise = audioToPlay.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => { /* Silently ignore 404s and DOMExceptions */ });
        }
    }
}


const AudioManager = new AudioController();


// --- RELIC MANAGER ---

class RelicManager {
    static relics = {
        'coroa_morangos': { id: 'coroa_morangos', name: 'Coroa de Morangos', desc: 'Curar 2 HP ao jogar Comida.', icon: '🍓' },
        'bateria_viciada': { id: 'bateria_viciada', name: 'Bateria Viciada', desc: '+3 Créditos no turno 1.', icon: '🔋' },
        'luva_boxe': { id: 'luva_boxe', name: 'Luva de Boxe', desc: 'Dobra dano contra defensores.', icon: '🥊' },
        'contrato_demon': { id: 'contrato_demon', name: 'Contrato Demoníaco', desc: 'Jogue 4 cartas no turno: tome 3 dano, compre 2 cartas.', icon: '📜' },
        'escudo_vidro': { id: 'escudo_vidro', name: 'Escudo de Vidro', desc: 'Primeiro dano de cada combate é prevenido.', icon: '🛡️' }
    };

    static triggerPlayCard(card) {
        if (!playerProfile.currentRunState) return;
        const state = playerProfile.currentRunState;

        // Coroa de Morangos
        if (state.relics.includes('coroa_morangos') && card.tribes && card.tribes.includes(TRIBES.COMIDA)) {
            gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + 2);
            triggerHealAnimation('player', null, 2);
            showNotification("Relíquia: Coroa de Morangos curou 2 HP!", "success");
        }

        // Contrato Demoníaco
        if (state.relics.includes('contrato_demon') && !gameState.player.isProcessingRelic) {
            gameState.player.cardsPlayedThisTurn = (gameState.player.cardsPlayedThisTurn || 0) + 1;
            if (gameState.player.cardsPlayedThisTurn === 4) {
                gameState.player.isProcessingRelic = true;
                gameState.player.hp -= 3;
                triggerDamageAnimation('opponent', null, 'player', null, 3);
                drawCard('player', 2);
                showNotification("Relíquia: Contrato Demoníaco cobrou o preço!", "error");
                setTimeout(() => gameState.player.isProcessingRelic = false, 500);
            }
        }
    }

    static triggerStartCombat() {
        if (!playerProfile.currentRunState) return;
        const state = playerProfile.currentRunState;

        gameState.player.glassShieldActive = state.relics.includes('escudo_vidro');

        if (state.relics.includes('bateria_viciada')) {
            gameState.player.credits += 3;
            showNotification("Relíquia: Bateria Viciada deu +3 Créditos!", "info");
        }
    }

    static checkDamage(amount, targetIsHero) {
        if (!playerProfile.currentRunState || !targetIsHero) return amount;

        if (gameState.player.glassShieldActive) {
            gameState.player.glassShieldActive = false;
            showNotification("Relíquia: Escudo de Vidro quebrou!", "info");
            return 0;
        }
        return amount;
    }

    static checkAttackDamage(amount, defenderCard) {
        if (!playerProfile.currentRunState || !defenderCard) return amount;

        if (playerProfile.currentRunState.relics.includes('luva_boxe') && defenderCard.keywords && defenderCard.keywords.includes('defensor')) {
            showNotification("Relíquia: Luva de Boxe ativada!", "info");
            return amount * 2;
        }
        return amount;
    }
}


// --- ROGUELIKE MAP GENERATION ---

function startNewRoguelikeRun() {
    // Generate basic deck
    const basicDeck = ['c_01','c_01','c_02','c_02','c_04','c_05','c_05','c_09','c_10','c_16']; // 10 basic commons

    // Create state
    playerProfile.currentRunState = {
        hp: 50,
        maxHp: 50,
        gold: 0,
        deck: basicDeck,
        relics: [],
        map: generateRoguelikeDAG(),
        currentNodeTier: 0,
        currentNodeIndex: 0, // Starts at 0,0
        seed: Date.now()
    };
    saveProfile();
    renderMapScreen();
    showScreen(screens.MAP);
}


function generateRoguelikeDAG() {
    const map = [];
    const tiers = 15;

    for (let t = 0; t < tiers; t++) {
        let nodesInTier = (t === 0 || t === tiers - 1) ? 1 : Math.floor(Math.random() * 2) + 3; // 1 node at start/end, 3-4 in between
        let tierNodes = [];

        for (let n = 0; n < nodesInTier; n++) {
            let type = 'combat'; // Default

            if (t === 0) type = 'combat'; // Node 1 is always combat
            else if (t === tiers - 1) type = 'boss'; // Node 15 is always boss
            else {
                // Weights: Combat(45%), Elite(15%), Campfire(15%), Shop(10%), Event(15%)
                let roll = Math.random();
                if (roll < 0.45) type = 'combat';
                else if (roll < 0.60) type = 'elite';
                else if (roll < 0.75) type = 'campfire';
                else if (roll < 0.85) type = 'shop';
                else type = 'event';
            }

            tierNodes.push({
                id: `t${t}_n${n}`,
                type: type,
                tier: t,
                index: n,
                connections: [] // Points to indexes in the NEXT tier
            });
        }
        map.push(tierNodes);
    }

    // Connect nodes DAG logic
    for (let t = 0; t < tiers - 1; t++) {
        const currentTier = map[t];
        const nextTier = map[t+1];

        // Ensure every node in current tier connects to at least one in next tier
        currentTier.forEach((node, i) => {
            // Bias towards straight lines or adjacent
            let targetIdx = Math.floor((i / currentTier.length) * nextTier.length);
            node.connections.push(targetIdx);

            // 30% chance for a branching path if there are other nodes
            if (Math.random() < 0.3 && nextTier.length > 1) {
                let extraIdx = (targetIdx + 1) % nextTier.length;
                if (!node.connections.includes(extraIdx)) node.connections.push(extraIdx);
            }
        });

        // Ensure every node in NEXT tier is reachable from at least one in CURRENT tier
        nextTier.forEach((nNode, j) => {
            let isConnected = currentTier.some(cNode => cNode.connections.includes(j));
            if (!isConnected) {
                let randomCurrent = Math.floor(Math.random() * currentTier.length);
                if (!currentTier[randomCurrent].connections.includes(j)) {
                    currentTier[randomCurrent].connections.push(j);
                }
            }
        });
    }

    return map;
}


// --- MAP RENDERING ---


function selectNode(node) {
    AudioManager.playSFX('ui_click');
    const state = playerProfile.currentRunState;

    // Move player
    state.currentNodeTier = node.tier;
    state.currentNodeIndex = node.index;
    saveProfile();

    // Resolve Node
    if (node.type === 'combat' || node.type === 'elite' || node.type === 'boss') {
        currentMatchMode = 'roguelike';
        startBattle(true, node);
    } else if (node.type === 'campfire') {
        openCampfire();
    } else if (node.type === 'shop') {
        openTowerShop();
    } else if (node.type === 'event') {
        openEvent();
    }
}


// --- ROGUELIKE MODALS & EVENTS ---



// --- SecOps: Memory Proxy Trap ---













// SecOps: Congelamento de Bancos de Dados (Anti-Memory Editing)

if (typeof CARD_TYPES !== 'undefined') Object.freeze(CARD_TYPES);

if (typeof RARITIES !== 'undefined') Object.freeze(RARITIES);

if (typeof TRIBES !== 'undefined') Object.freeze(TRIBES);

if (typeof HEROES !== 'undefined') Object.freeze(HEROES);

if (typeof CardDatabase !== 'undefined') Object.freeze(CardDatabase);

if (typeof DAILY_QUESTS !== 'undefined') Object.freeze(DAILY_QUESTS);

if (typeof ACHIEVEMENTS !== 'undefined') Object.freeze(ACHIEVEMENTS);

if (typeof ENDLESS_MUTATIONS !== 'undefined') Object.freeze(ENDLESS_MUTATIONS);


// Helper functions










function saveProfile() {
    SaveManager.encryptAndSave(playerProfile);
    updateUIProfile();
}


function loadProfile() {
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
}


// Ensure deck has exactly 40 cards, max 4 copies (2 for mythic)

function enforceDeckLimits() {
    const counts = {};
    const validDeck = [];

    playerProfile.deck.forEach(cardId => {
        const c = getCardById(cardId);
        if(!c) return;

        counts[cardId] = (counts[cardId] || 0) + 1;
        const maxLimit = (c.rarity === RARITIES.MYTHIC) ? 2 : 4;

        if(counts[cardId] <= maxLimit && playerProfile.collection[cardId] >= counts[cardId]) {
            validDeck.push(cardId);
        }
    });

    playerProfile.deck = validDeck;

    // Auto-fill to 40 if needed (with dummy or basic cards if not enough collection, but realistically fallback)
    while (playerProfile.deck.length < 40) {
        playerProfile.deck.push('c_01'); // Force fallback
    }
    // Trim if over 40
    if (playerProfile.deck.length > 40) {
        playerProfile.deck = playerProfile.deck.slice(0, 40);
    }
}


function updateUIProfile() {
    updateHUD();
    renderChestSlots();
    // Menu
    if(document.getElementById('menu-coins')) document.getElementById('menu-coins').innerText = playerProfile.coins;
    if(document.getElementById('menu-gems')) document.getElementById('menu-gems').innerText = playerProfile.gems;
    if(document.getElementById('menu-stardust')) document.getElementById('menu-stardust').innerText = playerProfile.stardust;
    if(document.getElementById('menu-tickets')) document.getElementById('menu-tickets').innerText = playerProfile.tickets;
    if(document.getElementById('menu-level')) document.getElementById('menu-level').innerText = playerProfile.level;
    if(document.getElementById('menu-rank')) document.getElementById('menu-rank').innerText = getRankString(playerProfile.elo);
    if(document.getElementById('menu-avatar')) document.getElementById('menu-avatar').innerText = playerProfile.activeAvatar;

    const xpReq = playerProfile.level * 100;
    if(document.getElementById('menu-xp-fill')) document.getElementById('menu-xp-fill').style.width = `${(playerProfile.xp / xpReq) * 100}%`;

    // Shop
    document.getElementById('shop-coins').innerText = playerProfile.coins;
    document.getElementById('shop-gems').innerText = playerProfile.gems;
    document.getElementById('shop-stardust').innerText = playerProfile.stardust;
    document.getElementById('shop-tickets').innerText = playerProfile.tickets;

    // Pity Timer display
    const pityEl = document.getElementById('pity-timer-display');
    if(pityEl) {
        pityEl.innerText = `Sorte Acumulada: ${playerProfile.pityTimer}/10 (Ao chegar em 10, próximo pacote garante Épica+)`;
    }

    // Play Modes
    document.getElementById('adventure-progress-text').innerText = `Progresso: ${playerProfile.adventureProgress}/5`;
}


function getRankString(elo) {
    if (elo < 200) return `🟤 Bronze (${elo})`;
    if (elo < 500) return `⚪ Prata (${elo})`;
    if (elo < 800) return `🟡 Ouro (${elo})`;
    if (elo < 1200) return `🔵 Platina (${elo})`;
    return `🟣 Mestre (${elo})`;
}


const addXP = withRateLimit('addXP', function(amount) {
    playerProfile.xp += amount;
    const xpReq = playerProfile.level * 100;
    if (playerProfile.xp >= xpReq) {
        playerProfile.xp -= xpReq;
        playerProfile.level++;
        playerProfile.gems += 10;
        showNotification(`Level Up! Nível ${playerProfile.level}. +10 Gemas!`, "success");
    }
});


function showScreen(screenId) {
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



function showNotification(message, type = "info") {
    const container = document.getElementById('notification-container');
    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.innerText = message;
    container.appendChild(notif);

    setTimeout(() => {
        notif.style.animation = 'slideUpFade 0.5s reverse forwards';
        setTimeout(() => notif.remove(), 500);
    }, 3000);
}


// --- INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('game-app').style.display = 'flex';
    loadProfile();

    setupBottomNav();
    initializeNewsHub();
    updateUIProfile();

    setTimeout(() => {
        showNotification("Bem-vindo ao Emoji Arena!", "success");
    }, 1000);


    // Main Menu Buttons

    const btnDraft = document.getElementById('btn-play-draft');
    if (btnDraft) {
        btnDraft.addEventListener('click', () => {
            const modal = document.getElementById('play-modes-modal');
            if (modal) modal.classList.add('hidden');
            startArenaDraft();
        });
    }

    const btnAbandonDraft = document.getElementById('btn-abandon-draft');
    if(btnAbandonDraft) {
        btnAbandonDraft.addEventListener('click', () => {
            if(confirm('Tem certeza que deseja abandonar sua corrida atual na Arena?')) {
                playerProfile.arenaState = null;
                saveProfile();
                showScreenSPA('main-menu');
            }
        });
    }

    if(document.getElementById('btn-play-modes')) document.getElementById('btn-play-modes').addEventListener('click', () => {
        document.getElementById('play-modes-modal').classList.remove('hidden');
    });

    if(document.getElementById('btn-close-play-modes')) document.getElementById('btn-close-play-modes').addEventListener('click', () => {
        document.getElementById('play-modes-modal').classList.add('hidden');
    });

    if(document.getElementById('btn-collection')) document.getElementById('btn-collection').addEventListener('click', () => showScreen(screens.COLLECTION));
    if(document.getElementById('btn-shop')) document.getElementById('btn-shop').addEventListener('click', () => showScreen(screens.SHOP));

    if(document.getElementById('btn-quests')) document.getElementById('btn-quests').addEventListener('click', () => {
        renderQuests();
        document.getElementById('quests-overlay').classList.remove('hidden');
    });
    if(document.getElementById('btn-close-quests')) document.getElementById('btn-close-quests').addEventListener('click', () => {
        document.getElementById('quests-overlay').classList.add('hidden');
    });

    if(document.getElementById('btn-achievements')) document.getElementById('btn-achievements').addEventListener('click', () => {
        renderAchievements();
        document.getElementById('achievements-overlay').classList.remove('hidden');
    });
    if(document.getElementById('btn-close-achievements')) document.getElementById('btn-close-achievements').addEventListener('click', () => {
        document.getElementById('achievements-overlay').classList.add('hidden');
    });


    if(document.getElementById('btn-roguelike')) document.getElementById('btn-roguelike').addEventListener('click', () => {
        if (!playerProfile.currentRunState) {
            startNewRoguelikeRun();
        } else {
            renderMapScreen();
            showScreen(screens.MAP);
        }
    });

    if(document.getElementById('btn-abandon-run')) document.getElementById('btn-abandon-run').addEventListener('click', () => {
        playerProfile.currentRunState = null;
        saveProfile();
        AudioManager.playBGM('bgm_menu');
        showScreen(screens.MENU);
    });

    // Audio Settings Integration
    const sliderMaster = document.getElementById('slider-master-vol');
    const sliderMusic = document.getElementById('slider-music-vol');
    const sliderSfx = document.getElementById('slider-sfx-vol');

    if (sliderMaster && sliderMusic && sliderSfx) {
        sliderMaster.value = AudioManager.masterVolume;
        sliderMusic.value = AudioManager.musicVolume;
        sliderSfx.value = AudioManager.sfxVolume;

        document.getElementById('val-master-vol').innerText = `${Math.round(AudioManager.masterVolume * 100)}%`;
        document.getElementById('val-music-vol').innerText = `${Math.round(AudioManager.musicVolume * 100)}%`;
        document.getElementById('val-sfx-vol').innerText = `${Math.round(AudioManager.sfxVolume * 100)}%`;

        sliderMaster.addEventListener('input', (e) => {
            AudioManager.masterVolume = parseFloat(e.target.value);
            document.getElementById('val-master-vol').innerText = `${Math.round(AudioManager.masterVolume * 100)}%`;
            AudioManager.saveSettings();
            AudioManager.playSFX('ui_beep');
        });

        sliderMusic.addEventListener('input', (e) => {
            AudioManager.musicVolume = parseFloat(e.target.value);
            document.getElementById('val-music-vol').innerText = `${Math.round(AudioManager.musicVolume * 100)}%`;
            AudioManager.saveSettings();
            AudioManager.playSFX('ui_beep');
        });

        sliderSfx.addEventListener('input', (e) => {
            AudioManager.sfxVolume = parseFloat(e.target.value);
            document.getElementById('val-sfx-vol').innerText = `${Math.round(AudioManager.sfxVolume * 100)}%`;
            AudioManager.saveSettings();
            AudioManager.playSFX('ui_beep');
        });
    }

    // Global UI Click and Hover Tracking
    document.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.classList.contains('card') || e.target.classList.contains('tab-btn')) {
            AudioManager.playSFX('ui_hover');
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            if(!e.target.classList.contains('buy-btn')) {
                AudioManager.playSFX('ui_click');
            }
        }
    });

    document.addEventListener('click', () => {
        if (document.getElementById('main-menu').classList.contains('active')) {
            AudioManager.playBGM('bgm_menu');
        }
    }, { once: true });


    if(document.getElementById('btn-leaderboard')) document.getElementById('btn-leaderboard').addEventListener('click', () => {
        renderLeaderboard();
        showScreen(screens.LEADERBOARD);
    });

    if(document.getElementById('btn-play-endless')) document.getElementById('btn-play-endless').addEventListener('click', () => {
        document.getElementById('play-modes-modal').classList.add('hidden');
        if (playerProfile.endlessState) {
            if (confirm("Continuar a Run salva na Onda " + playerProfile.endlessState.currentWave + "?")) {
                currentMatchMode = 'endless';
                startMatchmaking(true);
            } else {
                playerProfile.endlessState = null;
                startEndlessMode();
            }
        } else {
            startEndlessMode();
        }
    });

    if(document.getElementById('btn-settings')) document.getElementById('btn-settings').addEventListener('click', () => {
        document.getElementById('settings-overlay').classList.remove('hidden');
    });
    if(document.getElementById('btn-close-settings')) document.getElementById('btn-close-settings').addEventListener('click', () => {
        document.getElementById('settings-overlay').classList.add('hidden');
    });
    if(document.getElementById('btn-reset-data')) document.getElementById('btn-reset-data').addEventListener('click', resetSaveData);

    // Back Buttons
    document.querySelectorAll('.btn-back').forEach(btn => {
        btn.addEventListener('click', () => showScreen(screens.MENU));
    });

    // Shop Logic
    document.querySelectorAll('.shop-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.shop-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.shop-content').forEach(c => c.classList.remove('active'));
            e.target.classList.add('active');
            document.getElementById(e.target.dataset.target).classList.add('active');
        });
    });

    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = e.target.dataset.type;
            const cost = parseInt(e.target.dataset.cost);
            const currency = e.target.dataset.currency;

            if (type && cost && currency) {
                if (playerProfile[currency] >= cost) {
                    playerProfile[currency] -= cost;
                    saveProfile();
                    if (type === 'tickets') {
                        playerProfile.tickets += 3;
                        showNotification("Comprou 3 Fichas de Arena!", "success");
                    } else {
                        openPack(type);
                    }
                } else {
                    showNotification(`Sem ${currency} suficiente!`, "error");
                }
            }
        });
    });

    if(document.getElementById('btn-close-pack')) document.getElementById('btn-close-pack').addEventListener('click', () => {
        document.getElementById('pack-opening-overlay').classList.add('hidden');
        saveProfile();
    });

    // Collection Logic
    if(document.getElementById('btn-toggle-forge')) document.getElementById('btn-toggle-forge').addEventListener('click', () => {
        isForgeMode = !isForgeMode;
        document.getElementById('btn-toggle-forge').innerText = isForgeMode ? "Exit Forge Mode" : "Enter Forge Mode";
        document.getElementById('collection-instructions').innerText = isForgeMode ?
            "Clique em uma carta não possuída para forjar com Pó Estelar, ou numa possuída para desencantar." :
            "Clique numa carta para adicionar/remover do deck.";
        renderCollection();
    });

    // Forge Buttons
    if(document.getElementById('btn-cancel-forge')) document.getElementById('btn-cancel-forge').addEventListener('click', () => {
        document.getElementById('forge-modal').classList.add('hidden');
    });

    // Play Modes Actions
    if(document.getElementById('btn-play-adventure')) document.getElementById('btn-play-adventure').addEventListener('click', () => {
        currentMatchMode = 'adventure';
        startBattle(true);
    });

    if(document.getElementById('btn-play-ranked')) document.getElementById('btn-play-ranked').addEventListener('click', () => {
        if (playerProfile.tickets > 0) {
            playerProfile.tickets--;
            saveProfile();
            currentMatchMode = 'ranked';
            startBattle(true);
        } else {
            showNotification("Sem Fichas de Arena! Compre na Loja.", "error");
        }
    });

    if(document.getElementById('btn-play-casual')) document.getElementById('btn-play-casual').addEventListener('click', () => {
        currentMatchMode = 'casual';
        startBattle(true);
    });

    // Battle actions
    if(document.getElementById('btn-end-turn')) document.getElementById('btn-end-turn').addEventListener('click', endTurn);

    if(document.getElementById('btn-hero-power')) document.getElementById('btn-hero-power').addEventListener('click', useHeroPower);

    // Tooltip logic
    document.addEventListener('mousemove', (e) => {
        const tooltip = document.getElementById('global-tooltip');
        if (tooltip) {
            tooltip.style.left = e.pageX + 15 + 'px';
            tooltip.style.top = e.pageY + 15 + 'px';
        }
    });
});


function resetSaveData() {
    if (confirm("TEM CERTEZA? Todo o seu progresso será perdido!")) {
        localStorage.removeItem('Emoji_Arena_SaveData_v1');
        location.reload();
    }
}


// --- HTML GENERATORS ---


// --- PACK OPENING LOGIC ---


function createParticles(element, color) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.background = color;
        particle.style.borderRadius = '50%';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';

        const angle = Math.random() * Math.PI * 2;
        const speed = 5 + Math.random() * 10;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        document.body.appendChild(particle);

        let op = 1;
        const anim = setInterval(() => {
            const currentLeft = parseFloat(particle.style.left);
            const currentTop = parseFloat(particle.style.top);
            particle.style.left = currentLeft + vx + 'px';
            particle.style.top = currentTop + vy + 'px';
            op -= 0.05;
            particle.style.opacity = op;

            if (op <= 0) {
                clearInterval(anim);
                particle.remove();
            }
        }, 30);
    }
}


// --- SHOP: DAILY DEALS & AVATARS ---


// --- COLLECTION & FORGE ---

let isForgeMode = false;

let selectedCardForForge = null;


function addCardToDeck(cardId) {
    const c = getCardById(cardId);
    if(!c) return;

    const maxLimit = (c.rarity === RARITIES.MYTHIC) ? 2 : 4;
    const currentCount = playerProfile.deck.filter(id => id === cardId).length;

    if (playerProfile.deck.length >= 40) {
        showNotification("O deck já possui 40 cartas!", "error");
        return;
    }

    if (currentCount >= maxLimit) {
        showNotification(`Limite alcançado (${maxLimit}x)!`, "error");
        return;
    }

    if (currentCount >= playerProfile.collection[cardId]) {
        showNotification("Você não tem mais cópias dessa carta na coleção!", "error");
        return;
    }

    playerProfile.deck.push(cardId);
    saveProfile();
    renderDeck();
}


function removeCardFromDeck(index) {
    playerProfile.deck.splice(index, 1);
    saveProfile();
    renderDeck();
}


// --- PROGRESSION UI ---


function updateQuests(type, amount = 1) {
    playerProfile.quests.forEach(q => {
        if (q.completed) return;

        if (type === 'win' && q.id === 'q2') q.progress += amount;
        if (type === 'play' && q.id === 'q1') q.progress += amount;
        if (type === 'damage' && q.id === 'q3') q.progress += amount;
        if (type === 'card' && q.id === 'q4') q.progress += amount;
        if (type === 'spell' && q.id === 'q5') q.progress += amount;

        if (q.progress >= q.target) {
            q.progress = q.target;
            q.completed = true;
            playerProfile[q.reward.type] += q.reward.amount;
            showNotification(`Missão Concluída: ${q.desc}! +${q.reward.amount} ${q.reward.type}`, "success");
        }
    });
    saveProfile();
}


function checkAchievements() {
    playerProfile.achievements.forEach(a => {
        if (a.completed) return;

        if (a.id === 'a1' && playerProfile.stats.wins >= 1) a.progress = 1;
        if (a.id === 'a2') a.progress = playerProfile.stats.wins;

        let uniqueCards = 0;
        for (let key in playerProfile.collection) {
            if (playerProfile.collection[key] > 0) uniqueCards++;
        }
        if (a.id === 'a3') a.progress = uniqueCards;

        if (a.id === 'a4' && playerProfile.coins >= 5000) a.progress = 5000;

        // a5 is updated dynamically in draft win

        if (a.progress >= a.target) {
            a.progress = a.target;
            a.completed = true;
            if (a.reward.type === 'avatar') {
                playerProfile.unlockedAvatars.push(a.reward.value);
            } else {
                playerProfile[a.reward.type] += a.reward.amount;
            }
            showNotification(`Troféu Conquistado: ${a.desc}!`, "success");
        }
    });
    saveProfile();
}


// --- BATTLE ACTIONS & HERO POWERS ---


function endTurn() {
    if (!gameState.isPlayerTurn) return;
    gameState.isPlayerTurn = false;
    updateBattleUI();
    startTurn('opponent');
}


function selectCardInHand(index) {
    if (!gameState.isPlayerTurn) return;

    const card = gameState.player.hand[index];
    if (gameState.player.credits + gameState.player.battery < card.cost) {
        showNotification("Energia insuficiente!", "error");
        return;
    }

    if (gameState.selectedCardIndex === index) {
        gameState.selectedCardIndex = null;
    } else {
        gameState.selectedCardIndex = index;
    }

    // Spells or Secrets might not need a lane target
    if (gameState.selectedCardIndex !== null && (card.type === CARD_TYPES.SPELL || card.type === CARD_TYPES.SECRET)) {
        if (card.target === 'none' || card.type === CARD_TYPES.SECRET) {
            playCard(null); // Instacast
        } else {
            // Need targetting logic... For simplicity, if it's a spell, we'll click the target directly.
            showNotification(`Selecione o alvo para ${card.name}`, "info");
            enableSpellTargeting(card);
        }
    }

    updateBattleUI();
}


function resolveSpell(side, card, targetIndex) {
    if (currentMatchMode === 'roguelike' && side === 'player' && playerProfile.currentRunState && playerProfile.currentRunState.currentNodeTier === 29) {
        showNotification("ANOMALIA: O Mestre do Clima ataca!", "error");
        triggerDamageAnimation('opponent', null, 'player', null, 2);
        gameState.player.hp -= 2;
    }
    // Check for Counter-Spell Secret
    const oppSide = side === 'player' ? 'opponent' : 'player';
    const counterIdx = gameState[oppSide].secrets.findIndex(s => s.effect.cancelSpell);
    if (counterIdx > -1) {
        gameState[oppSide].secrets.splice(counterIdx, 1);
        showNotification(`SEGREDO REVELADO: Contra-Feitiço cancelou ${card.name}!`, "error");
        return;
    }

    if (card.effect.draw) {
        drawCard(side, card.effect.draw);
    }
    if (card.effect.heal) {
        gameState[side].hp = Math.min(gameState[side].maxHp, gameState[side].hp + card.effect.heal);
    }
    if (card.effect.addBattery) {
        gameState[side].battery += card.effect.addBattery;
    }
    if (card.effect.damage) {
        if (currentMatchMode === 'endless' && side === 'opponent' && playerProfile.endlessState.activeMutation && playerProfile.endlessState.activeMutation.id === 'vampirism') {
            gameState.opponent.hp += card.effect.damage;
            AudioManager.playSFX('hero_heal');
        }
        // Simple random target for now if not specified
        const oppBoard = gameState[side === 'player' ? 'opponent' : 'player'].board;
        let validTargets = [];
        oppBoard.forEach((c, i) => { if (c) validTargets.push(i); });

        if (card.target === 'all_troops') {
            gameState.player.board.forEach(c => { if(c) c.hp -= card.effect.damage; });
            gameState.opponent.board.forEach(c => { if(c) c.hp -= card.effect.damage; });
        } else if (validTargets.length > 0) {
            const tIdx = validTargets[Math.floor(Math.random() * validTargets.length)];
            triggerDamageAnimation(side, null, oppSide, tIdx, card.effect.damage);
            oppBoard[tIdx].hp -= card.effect.damage;
        } else {
            triggerDamageAnimation(side, null, oppSide, null, card.effect.damage);
            gameState[oppSide].hp -= card.effect.damage;
        }
    }
    if (card.effect.kill) {
        if (targetIndex !== null && gameState[oppSide].board[targetIndex]) {
            gameState[oppSide].board[targetIndex].hp = 0;
        }
    }

    checkDeadCards();
}


function triggerBattlecry(side, laneIndex, battlecry) {
    if (battlecry.effect.addBattery) {
        gameState[side].battery += battlecry.effect.addBattery;
    }
    if (battlecry.effect.draw) {
        drawCard(side, battlecry.effect.draw);
    }
    // Simplification for other battlecries (random targets)
}


function triggerHealAnimation(side, index, amount) {
    if (amount <= 0) return;
    const gameContainer = document.getElementById('battle-screen');


    AudioManager.playSFX('hero_heal');
    const healEl = document.createElement('div');
    healEl.className = 'heal-number';
    healEl.innerText = `+${amount}`;

    const dirX = (Math.random() - 0.5) * 50;
    healEl.style.setProperty('--dir-x', `${dirX}px`);

    let targetEl = index !== null ?
        document.getElementById(`${side === 'opponent' ? 'opp' : 'player'}-slot-${index}`) :
        document.querySelector(side === 'opponent' ? '.bot-avatar' : '#battle-player-avatar');

    if (targetEl) {
        targetEl.appendChild(healEl);
        setTimeout(() => healEl.remove(), 1000);
    }
}



function checkDeadCards() {
    ["player", "opponent"].forEach(side => {
        gameState[side].board.forEach((card, i) => {
            if (card && card.hp <= 0) {
                // Necromancy check
                if (card.keywords && card.keywords.includes('necromancia_infinita')) {
                    card.hp = card.baseHp; // Respawn
                    showNotification(`${card.name} renasceu das cinzas!`, "info");
                } else if (card.keywords && card.keywords.includes('necromancia')) {
                    card.keywords = card.keywords.filter(k => k !== 'necromancia'); // remove keyword
                    card.hp = card.baseHp; // Respawn once
                    showNotification(`${card.name} usou necromancia!`, "info");
                } else {
                    // M6: Graveyard push
                    gameState[side].graveyard.push(card.id);
                    // Deathrattle check
                    if (card.deathrattle) {
                        if (card.deathrattle.effect.draw) drawCard(side, card.deathrattle.effect.draw);
                    }
                    gameState[side].board[i] = null;
                }
            }
        });
    });
}




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



function triggerEndlessMutationEvent(event, target) {
    if (currentMatchMode !== 'endless' || !playerProfile.endlessState || !playerProfile.endlessState.activeMutation) return;
    const mut = playerProfile.endlessState.activeMutation;

    if (event === 'turn' && mut.effect === 'toxic_gas') {
        // Example logic: damage all troops slightly each turn
        const side = gameState.isPlayerTurn ? 'player' : 'opponent';
        gameState[side].board.forEach((card, idx) => {
            if(card) {
                card.hp -= 1;
                triggerDamageAnimation(side === 'player'?'opponent':'player', null, side, idx, 1);
            }
        });
    }
}


// --- MATCHMAKING & VS SCREEN ---


const LOADING_TIPS = [

    'Dica: No Emoji Arena, gerenciar seus Créditos é a chave para a vitória.',

    'Dica: Combine tribos iguais para criar sinergias devastadoras!',

    'Dica: Fique de olho na Energia da Bateria. Ela não reseta entre turnos.',

    'Dica: Cartas Lendárias e Míticas são raras, mas não imortais.',

    'Dica: O Modo Fenda da Eternidade oferece recompensas que escalam infinitamente.'

];


// --- HEURISTIC AI & BOT EMOTES ---


function evaluateLethal() {
    let potentialDamage = 0;
    gameState.opponent.board.forEach(card => {
        if (card && !card.exhausted && card.atk > 0) potentialDamage += card.atk;
    });
    // Check hand for spells that deal direct damage
    gameState.opponent.hand.forEach(card => {
        if (card.type === CARD_TYPES.SPELL && card.effect.damage && (card.target === 'any' || card.target === 'enemy_hero')) {
            if (gameState.opponent.credits + gameState.opponent.battery >= card.cost) {
                potentialDamage += card.effect.damage;
            }
        }
    });
    return potentialDamage >= gameState.player.hp;
}



// --- ENDLESS MODALS & LEADERBOARD ---




// --- ENDLESS MODE INITIALIZATION ---

function startEndlessMode() {
    if (playerProfile.deck.length < 40) {
        showNotification("Seu deck precisa de 40 cartas para jogar o Modo Infinito!", "error");
        return;
    }

    playerProfile.endlessState = {
        currentWave: 1,
        loot: 0,
        playerHp: 30, // Start with 30 HP
        maxPlayerHp: 30,
        dominantTribe: 'Neutro', // Can be updated during run
        activeMutation: { name: "Nenhuma", effect: "Padrão" }
    };

    saveProfile();
    currentMatchMode = 'endless';
    startMatchmaking(true);
}




// --- BOTTOM NAV BAR LOGIC (SPA) ---


document.addEventListener('DOMContentLoaded', () => {
    const el_btn_play_mega = document.getElementById('btn-play-mega');
    if (el_btn_play_mega) {
        el_btn_play_mega.addEventListener('click', () => {
            if (typeof initiateMatchmaking === 'function') {
                initiateMatchmaking('casual');
            }
        });
    }
});

function initiateMatchmaking(mode) {
    currentMatchMode = mode;
    const modals = document.querySelectorAll('.modal, .overlay');
    modals.forEach(m => m.classList.add('hidden'));

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'matchmaking-overlay';
    overlay.style.zIndex = '2000';
    overlay.innerHTML = `<div style="background: rgba(26, 11, 46, 0.95); padding: 40px; border-radius: 20px; border: 4px solid #ffcc00; text-align: center; color: white;"><h2 style="font-family: 'Lilita One', sans-serif; font-size: 2.5rem; margin-bottom: 20px;">Buscando Oponente...</h2><div class="spinner" style="font-size: 4rem; animation: spin 2s linear infinite;">⏳</div></div>`;
    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.remove();
        showScreenSPA('battle-screen');
        setTimeout(() => { startBattle(); }, 100);
    }, 2500);
}

if (!document.getElementById('matchmaking-styles')) {
    const style = document.createElement('style');
    style.id = 'matchmaking-styles';
    style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
}
