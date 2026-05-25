const fs = require('fs');

let orig = fs.readFileSync('script_original.js', 'utf8');
orig = orig.replace(/^\(\(\) => \{\n'use strict';\n*/, '');
orig = orig.replace(/\n\}\)\(\);\s*$/, '');

let files = { 'data.js': [], 'state.js': [], 'ui.js': [], 'engine.js': [], 'main.js': [] };

function extractBlock(startRegex) {
    let startIdx = orig.search(startRegex);
    if (startIdx === -1) return null;

    let braceLevel = 0;
    let bracketLevel = 0;
    let inBlock = false;
    let endIdx = -1;

    let lines = orig.substring(startIdx).split('\n');
    let extractedLines = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        extractedLines.push(line);

        let openBrace = (line.match(/\{/g) || []).length;
        let closeBrace = (line.match(/\}/g) || []).length;
        let openBracket = (line.match(/\[/g) || []).length;
        let closeBracket = (line.match(/\]/g) || []).length;

        braceLevel += openBrace - closeBrace;
        bracketLevel += openBracket - closeBracket;

        if (openBrace > 0 || openBracket > 0) inBlock = true;

        if (inBlock && braceLevel === 0 && bracketLevel === 0) {
            let strToSearch = extractedLines.join('\n');
            endIdx = startIdx + strToSearch.length;
            break;
        }
    }

    if (endIdx !== -1) {
        let block = orig.substring(startIdx, endIdx);
        orig = orig.substring(0, startIdx) + "\n/* EXTRACTED */\n" + orig.substring(endIdx);
        return block;
    }

    let semicolonIdx = orig.indexOf(';', startIdx);
    if (semicolonIdx !== -1 && semicolonIdx - startIdx < 200) {
        let block = orig.substring(startIdx, semicolonIdx + 1);
        orig = orig.substring(0, startIdx) + "\n/* EXTRACTED */\n" + orig.substring(semicolonIdx + 1);
        return block;
    }

    return null;
}

// 1. data.js
files['data.js'].push(extractBlock(/^const GAME_PATCH_NOTES = \[/m));
files['data.js'].push(extractBlock(/^const CARD_TYPES = \{/m));
files['data.js'].push(extractBlock(/^const RARITIES = \{/m));
files['data.js'].push(extractBlock(/^const TRIBES = \{/m));
files['data.js'].push(extractBlock(/^const HEROES = \{/m));
files['data.js'].push(extractBlock(/^const CardDatabase = \[/m));
files['data.js'].push(extractBlock(/^const DAILY_QUESTS = \[/m));
files['data.js'].push(extractBlock(/^const ACHIEVEMENTS = \[/m));
files['data.js'].push(`if (typeof CARD_TYPES !== 'undefined') Object.freeze(CARD_TYPES);
if (typeof RARITIES !== 'undefined') Object.freeze(RARITIES);
if (typeof TRIBES !== 'undefined') Object.freeze(TRIBES);
if (typeof HEROES !== 'undefined') Object.freeze(HEROES);
if (typeof CardDatabase !== 'undefined') Object.freeze(CardDatabase);
if (typeof DAILY_QUESTS !== 'undefined') Object.freeze(DAILY_QUESTS);
if (typeof ACHIEVEMENTS !== 'undefined') Object.freeze(ACHIEVEMENTS);
if (typeof ENDLESS_MUTATIONS !== 'undefined') Object.freeze(ENDLESS_MUTATIONS);`);
files['data.js'].push(extractBlock(/^function getCardById\(/m));

// 2. state.js
files['state.js'].push(extractBlock(/^class SaveManager \{/m));
files['state.js'].push(extractBlock(/^let rawPlayerProfile = \{/m));
files['state.js'].push(extractBlock(/^const profileHandler = \{/m));
files['state.js'].push(extractBlock(/^let playerProfile = /m));
files['state.js'].push(extractBlock(/^let currentMatchMode = /m));
files['state.js'].push(extractBlock(/^let gameState = \{/m));
files['state.js'].push(extractBlock(/^const observer = new MutationObserver/m));
files['state.js'].push(extractBlock(/^const originalSetTimeout = /m));
files['state.js'].push(extractBlock(/^window.setTimeout = /m));
files['state.js'].push(extractBlock(/^const originalSetInterval = /m));
files['state.js'].push(extractBlock(/^window.setInterval = /m));
files['state.js'].push(extractBlock(/^let lastActionTime = 0;/m));
files['state.js'].push(extractBlock(/^let suspiciousClicks = 0;/m));
files['state.js'].push(extractBlock(/^function withRateLimit\(/m));
files['state.js'].push(extractBlock(/^function verifyIntegrity\(/m));

// For the rest, split by lines and count braces manually to extract every top-level declaration safely.

let lines = orig.split('\n');
let braceLevel = 0;
let currentBlock = [];

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    if (line.includes('/* EXTRACTED */')) continue;

    currentBlock.push(line);

    let openBraces = (line.match(/\{/g) || []).length;
    let closeBraces = (line.match(/\}/g) || []).length;
    braceLevel += openBraces - closeBraces;

    if (braceLevel === 0 && line.trim() !== '') {
        let blockText = currentBlock.join('\n');
        currentBlock = [];

        if (blockText.trim() === '' || (blockText.trim().startsWith('//') && !blockText.includes('\n'))) continue;

        let target = 'main.js';
        if (blockText.includes('function showScreenSPA') || blockText.includes('function updateHUD') || blockText.includes('function createCardHTML') || blockText.includes('function renderPatchDetails') || blockText.includes('function renderDraftChoices') || blockText.includes('function initializeNewsHub') || blockText.includes('function renderCollection') || blockText.includes('function renderShop') || blockText.includes('function renderMap') || blockText.includes('.innerHTML') || blockText.includes('.classList.add')) {
            target = 'ui.js';
        }
        if (blockText.includes('function startBattle') || blockText.includes('function startTurn') || blockText.includes('function playCard') || blockText.includes('function resolveAttack') || blockText.includes('function checkWinCondition') || blockText.includes('function botTurn') || blockText.includes('function executeTurnLogic') || blockText.includes('function applyDamage') || blockText.includes('function healPlayer') || blockText.includes('class BotAI') || blockText.includes('function claimArenaVault')) {
            target = 'engine.js';
        }
        if (blockText.includes('document.addEventListener(') || blockText.includes('initiateMatchmaking') || blockText.includes('window.addEventListener(')) {
            target = 'main.js';
        }
        if (blockText.trim() === '})();') continue;

        files[target].push(blockText);
    }
}

// Add the matchmaking loop implementation
files['main.js'].push(`
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
    overlay.innerHTML = \`<div style="background: rgba(26, 11, 46, 0.95); padding: 40px; border-radius: 20px; border: 4px solid #ffcc00; text-align: center; color: white;"><h2 style="font-family: 'Lilita One', sans-serif; font-size: 2.5rem; margin-bottom: 20px;">Buscando Oponente...</h2><div class="spinner" style="font-size: 4rem; animation: spin 2s linear infinite;">⏳</div></div>\`;
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
    style.innerHTML = \`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }\`;
    document.head.appendChild(style);
}
`);

// Add Keyword Helpers to engine.js
files['engine.js'].push(`
// --- KEYWORD HELPERS ---
function hasKeyword(card, keywordId) {
    if (!card || !card.keywords || !Array.isArray(card.keywords)) return false;
    return card.keywords.some(k => {
        if (typeof k === 'string') return k === keywordId;
        if (typeof k === 'object' && k !== null) return k.id === keywordId;
        return false;
    });
}

function getKeywordValue(card, keywordId) {
    if (!card || !card.keywords || !Array.isArray(card.keywords)) return 0;
    for (let k of card.keywords) {
        if (typeof k === 'object' && k !== null && k.id === keywordId) {
            return k.val || 0;
        }
    }
    return 0;
}
`);

// Clean startBattle logic
for (let i = 0; i < files['engine.js'].length; i++) {
    if (files['engine.js'][i].includes('function startBattle() {')) {
        files['engine.js'][i] = files['engine.js'][i].replace('function startBattle() {', `function startBattle() {
    const pHand = document.getElementById('player-hand');
    const eHand = document.getElementById('enemy-hand');
    if(pHand) pHand.innerHTML = '';
    if(eHand) eHand.innerHTML = '';
    const slots = document.querySelectorAll('.board-slot');
    slots.forEach(slot => { slot.innerHTML = ''; slot.className = 'board-slot empty'; });
`);
    }
}

// Universal Damage Funnel & Engine Expansion 2 Logic
// The user asked to re-implement applyDamageToTarget, executeAttack, checkDeadCards, and startTurn
// I will just append the completed Expansion 2 code at the end of engine.js!

files['engine.js'].push(`
// --- EXPANSION MODULE 2: COMBAT MATH ---

function applyDamageToTarget(attacker, defender, rawDamage, isSplash = false) {
    let result = { actualDamageDealt: 0, isDead: false, overflow: 0 };
    if (!defender) return result;

    if (getKeywordValue(defender, 'escudo') > 0 || (defender.keywords && defender.keywords.includes('escudo'))) {
        let removed = false;
        if (Array.isArray(defender.keywords)) {
            for (let i = 0; i < defender.keywords.length; i++) {
                if (typeof defender.keywords[i] === 'object' && defender.keywords[i].id === 'escudo') {
                    defender.keywords[i].val = 0;
                    removed = true;
                } else if (defender.keywords[i] === 'escudo') {
                    defender.keywords.splice(i, 1);
                    removed = true;
                    i--;
                }
            }
        }
        if (removed) return result;
    }

    let armor = getKeywordValue(defender, 'armadura');
    let danoFinal = rawDamage - armor;
    if (danoFinal < 0) danoFinal = 0;

    defender.hp -= danoFinal;
    result.actualDamageDealt = danoFinal;

    if (defender.hp < 0) result.overflow = Math.abs(defender.hp);
    if (defender.hp <= 0) result.isDead = true;

    if (!isSplash && result.actualDamageDealt > 0 && attacker) {
        if (hasKeyword(attacker, 'toxico')) {
            if (!defender.keywords) defender.keywords = [];
            if (!hasKeyword(defender, 'envenenado')) defender.keywords.push('envenenado');
        }
        if (hasKeyword(attacker, 'mortal')) {
            if (defender.type !== (typeof CARD_TYPES !== 'undefined' ? CARD_TYPES.HERO : 'hero') && defender.type !== (typeof CARD_TYPES !== 'undefined' ? CARD_TYPES.ENVIRONMENT : 'environment')) {
                defender.hp = 0;
                result.isDead = true;
            }
        }
    }

    return result;
}

function executeAttack(attackerIdx, defenderIdx, isPlayer = true) {
    let attackerSide = isPlayer ? gameState.player : gameState.opponent;
    let defenderSide = isPlayer ? gameState.opponent : gameState.player;

    let attackerCard = attackerSide.board[attackerIdx];
    if (!attackerCard) return;

    attackerCard.exhausted = true;

    let prefixA = isPlayer ? 'player' : 'opp';
    const attackerEl = document.querySelector(\`#\${prefixA}-slot-\${attackerIdx} .card\`);
    if (attackerEl) attackerEl.classList.add('attack-animation');

    const secretIdx = defenderSide.secrets.findIndex(s => s.trigger === 'on_attacked');
    if (secretIdx > -1 && isPlayer) {
        const secret = defenderSide.secrets[secretIdx];
        if (secret.effect.killAttacker) {
            attackerCard.hp = 0;
            showNotification(\`SEGREDO: Armadilha destruiu seu \${attackerCard.name}!\`, "error");
            defenderSide.secrets.splice(secretIdx, 1);
            checkDeadCards();
            updateBattleUI();
            return;
        }
    }

    setTimeout(() => {
        let baseAtk = attackerCard.atk;

        if (defenderIdx === null) {
            baseAtk += getKeywordValue(attackerCard, 'cacador');
        }

        if (defenderIdx !== null) {
            let defenderCard = defenderSide.board[defenderIdx];
            if (!defenderCard) {
                checkDeadCards();
                updateBattleUI();
                return;
            }

            if (typeof AudioManager !== 'undefined') AudioManager.playSFX('combat_hit');
            if (isPlayer && document.querySelector(\`#opp-slot-\${defenderIdx} .card\`)) {
                document.querySelector(\`#opp-slot-\${defenderIdx} .card\`).classList.add('collision-flash');
            }

            let defAtk = defenderCard.atk;

            let attackResult = applyDamageToTarget(attackerCard, defenderCard, baseAtk, false);
            let defenseResult = applyDamageToTarget(defenderCard, attackerCard, defAtk, false);

            if (typeof triggerDamageAnimation === 'function') {
                triggerDamageAnimation(isPlayer ? 'player' : 'opponent', attackerIdx, isPlayer ? 'opponent' : 'player', defenderIdx, attackResult.actualDamageDealt);
                if (defenseResult.actualDamageDealt > 0) {
                    triggerDamageAnimation(isPlayer ? 'opponent' : 'player', defenderIdx, isPlayer ? 'player' : 'opponent', attackerIdx, defenseResult.actualDamageDealt);
                }
            }

            if (hasKeyword(attackerCard, 'perfuracao') && attackResult.overflow > 0) {
                defenderSide.hp -= attackResult.overflow;
                if (typeof triggerDamageAnimation === 'function') {
                    triggerDamageAnimation(isPlayer ? 'player' : 'opponent', attackerIdx, isPlayer ? 'opponent' : 'player', null, attackResult.overflow);
                }
            }

            let splashVal = getKeywordValue(attackerCard, 'dano_area');
            if (splashVal > 0) {
                let adjIndices = [defenderIdx - 1, defenderIdx + 1];
                adjIndices.forEach(adjIdx => {
                    if (adjIdx >= 0 && adjIdx < 5 && defenderSide.board[adjIdx]) {
                        let adjDefender = defenderSide.board[adjIdx];
                        let splashResult = applyDamageToTarget(attackerCard, adjDefender, splashVal, true);
                        if (splashResult.actualDamageDealt > 0 && typeof triggerDamageAnimation === 'function') {
                            triggerDamageAnimation(isPlayer ? 'player' : 'opponent', attackerIdx, isPlayer ? 'opponent' : 'player', adjIdx, splashResult.actualDamageDealt);
                        }
                    }
                });
            }

            if (hasKeyword(defenderCard, 'karma') && attackResult.actualDamageDealt > 0 && !attackResult.isDead) {
                let karmaDmg = attackResult.actualDamageDealt;
                let karmaResult = applyDamageToTarget(defenderCard, attackerCard, karmaDmg, true);
                if (karmaResult.actualDamageDealt > 0 && typeof triggerDamageAnimation === 'function') {
                    triggerDamageAnimation(isPlayer ? 'opponent' : 'player', defenderIdx, isPlayer ? 'player' : 'opponent', attackerIdx, karmaResult.actualDamageDealt);
                }
            }

        } else {
            const heroSecretIdx = defenderSide.secrets.findIndex(s => s.trigger === 'on_hero_attacked');
            if (heroSecretIdx > -1 && isPlayer) {
                const sct = defenderSide.secrets[heroSecretIdx];
                defenderSide.secrets.splice(heroSecretIdx, 1);
                showNotification(\`SEGREDO REVELADO: \${sct.name}!\`, "error");

                if (sct.effect.preventDamage) {
                    if (sct.effect.summon) {
                        defenderSide.board[attackerIdx] = JSON.parse(JSON.stringify(getCardById(sct.effect.summon)));
                    }
                    updateBattleUI();
                    return;
                }
            }

            defenderSide.hp -= baseAtk;
            if (typeof triggerDamageAnimation === 'function') {
                triggerDamageAnimation(isPlayer ? 'player' : 'opponent', attackerIdx, isPlayer ? 'opponent' : 'player', null, baseAtk);
            }

            let avatarSelector = isPlayer ? '.bot-avatar' : '.player-avatar';
            if(document.querySelector(avatarSelector)) {
                document.querySelector(avatarSelector).classList.add('screen-shake');
                setTimeout(() => {
                    let el = document.querySelector(avatarSelector);
                    if (el) el.classList.remove('screen-shake');
                }, 400);
            }

            if (isPlayer && typeof matchStats !== 'undefined') {
                matchStats.damageDealt += baseAtk;
                if (typeof updateQuests === 'function') updateQuests('damage', baseAtk);
            }
        }

        if (attackerEl) attackerEl.classList.remove('attack-animation');
        document.querySelectorAll('.targetable').forEach(el => {
            el.classList.remove('targetable');
            el.onclick = null;
        });

        checkDeadCards();
        checkWinCondition();
        updateBattleUI();

    }, 200);
}

function checkDeadCards() {
    ["player", "opponent"].forEach(side => {
        let oppSide = side === "player" ? "opponent" : "player";

        gameState[side].board.forEach((card, i) => {
            if (card && card.hp <= 0) {
                if (hasKeyword(card, 'necromancia_infinita')) {
                    card.hp = card.baseHp;
                    showNotification(\`\${card.name} renasceu das cinzas!\`, "info");
                    return;
                } else if (hasKeyword(card, 'necromancia')) {
                    if (Array.isArray(card.keywords)) {
                        card.keywords = card.keywords.filter(k => k !== 'necromancia' && (typeof k === 'object' ? k.id !== 'necromancia' : true));
                    }
                    card.hp = card.baseHp;
                    showNotification(\`\${card.name} usou necromancia!\`, "info");
                    return;
                }

                if (hasKeyword(card, 'vinganca') && card.hp < 0) {
                    let overkillDmg = Math.abs(card.hp);
                    let killer = gameState[oppSide].board[i];
                    if (killer) {
                        applyDamageToTarget(card, killer, overkillDmg, true);
                        if (typeof triggerDamageAnimation === 'function') triggerDamageAnimation(side, i, oppSide, i, overkillDmg);
                    } else {
                        gameState[oppSide].hp -= overkillDmg;
                        if (typeof triggerDamageAnimation === 'function') triggerDamageAnimation(side, i, oppSide, null, overkillDmg);
                    }
                }

                if (!gameState[side].graveyard) gameState[side].graveyard = [];
                gameState[side].graveyard.push(card.id);

                if (card.deathrattle) {
                    if (card.deathrattle.damageOpponent) {
                        gameState[oppSide].hp -= card.deathrattle.damageOpponent;
                        if (typeof triggerDamageAnimation === 'function') triggerDamageAnimation(side, i, oppSide, null, card.deathrattle.damageOpponent);
                    }
                    if (card.deathrattle.drawCard && typeof drawCard === 'function') {
                        drawCard(card.deathrattle.drawCard, side);
                    }
                }

                let killer = gameState[oppSide].board[i];
                if (killer && hasKeyword(killer, 'impeto') && killer.hp > 0 && !killer.hasUsedImpeto) {
                    killer.exhausted = false;
                    killer.hasUsedImpeto = true;
                    showNotification(\`\${killer.name} usou Ímpeto para atacar novamente!\`, "info");
                }

                gameState[side].board[i] = null;
            }
        });
    });
}
`);

// Remove old executeAttack and checkDeadCards from ui.js / engine.js
for (let i = 0; i < files['ui.js'].length; i++) {
    if (files['ui.js'][i].includes('function executeAttack')) {
        files['ui.js'][i] = ''; // remove old
    }
}
for (let i = 0; i < files['engine.js'].length; i++) {
    if (files['engine.js'][i].includes('function checkDeadCards() {') && !files['engine.js'][i].includes('EXPANSION MODULE 2')) {
        files['engine.js'][i] = ''; // remove old
    }
    // Also add poison to startTurn
    if (files['engine.js'][i].includes('function startTurn(side) {')) {
        files['engine.js'][i] = files['engine.js'][i].replace('gameState[side].heroUsed = false;',
`gameState[side].heroUsed = false;
    ['player', 'opponent'].forEach(s => {
        gameState[s].board.forEach((card, idx) => {
            if (card && hasKeyword(card, 'envenenado')) {
                card.hp -= 1;
                let slotPrefix = s === 'player' ? 'player' : 'opp';
                let el = document.querySelector(\`#\${slotPrefix}-slot-\${idx} .card\`);
                if (el) {
                    el.style.boxShadow = '0 0 15px #2ecc71';
                    setTimeout(() => el.style.boxShadow = '', 800);
                }
                if (typeof AudioManager !== 'undefined') AudioManager.playSFX('ui_error');
            }
        });
    });
    checkDeadCards();
`);
    }
}
for (let i = 0; i < files['main.js'].length; i++) {
    if (files['main.js'][i].includes('function checkDeadCards() {')) {
        files['main.js'][i] = ''; // remove old
    }
    // Clean event listeners in main.js
    files['main.js'][i] = files['main.js'][i].replace(/document\.getElementById\('([^']+)'\)\.addEventListener/g, "if(document.getElementById('$1')) document.getElementById('$1').addEventListener");
}


for (let f in files) {
    fs.writeFileSync(f, files[f].filter(Boolean).join('\n\n'));
}

// Ensure state.js observer doesn't crash on load
let stateJs = fs.readFileSync('state.js', 'utf8');
stateJs = stateJs.replace('const observer = new MutationObserver((mutations) => {', `
let observer;
window.addEventListener('load', () => {
    observer = new MutationObserver((mutations) => {
`);
stateJs = stateJs.replace('    });\n});\n\nconst originalSetTimeout', '    });\n    observer.observe(document.documentElement, { childList: true, subtree: true });\n});\n\nconst originalSetTimeout');
fs.writeFileSync('state.js', stateJs);

// CSS Modifications
let stylesCss = fs.readFileSync('styles.css', 'utf8');
if (!stylesCss.includes('MÓDULO DE EXPANSÃO 1: STAT ICONS')) {
    stylesCss += `\n
/* =========================================
   MÓDULO DE EXPANSÃO 1: STAT ICONS
   ========================================= */

.stat-icon {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 1rem;
    font-weight: bold;
}

/* Pseudo-elementos de injeção visual */
.stat-icon::before {
    display: inline-block;
}

.stat-hp[data-trait="normal"]::before { content: '❤️'; }
.stat-hp[data-trait="normal"] span { color: #e74c3c; text-shadow: 1px 1px 0 #000; }

.stat-hp[data-trait="armor"]::before { content: '🛡️'; }
.stat-hp[data-trait="armor"] span { color: #bdc3c7; text-shadow: 0 0 5px #7f8c8d, 1px 1px 2px #000; }

.stat-atk[data-trait="normal"]::before { content: '⚔️'; }
.stat-atk[data-trait="normal"] span { color: #f1c40f; text-shadow: 1px 1px 0 #000; }

.stat-atk[data-trait="pierce"]::before { content: '🏹'; }
.stat-atk[data-trait="pierce"] span { color: #00ffff; text-shadow: 0 0 8px #00ffff, 0 0 15px #0088ff, 1px 1px 2px #000; }
`;
    fs.writeFileSync('styles.css', stylesCss);
}

// Fix index.html
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('<script src="script.js"></script>', `<script src="data.js"></script>
    <script src="state.js"></script>
    <script src="engine.js"></script>
    <script src="ui.js"></script>
    <script src="main.js"></script>`);
html = html.replace('onclick="initiateMatchmaking(\\\'casual\\\')"', '');
html = html.replace('onclick="initiateMatchmaking(\'casual\')"', '');
fs.writeFileSync('index.html', html);

// UI.js createCardHTML modifications
let uiJs = fs.readFileSync('ui.js', 'utf8');
const replacement = `
        let atkTrait = typeof hasKeyword === 'function' ? (hasKeyword(card, 'perfuracao') ? 'pierce' : 'normal') : 'normal';
        let hpTrait = typeof hasKeyword === 'function' ? (hasKeyword(card, 'armadura') ? 'armor' : 'normal') : 'normal';

        statsHTML = \`
            <div class="card-stats">
                <div class="stat-icon stat-atk" data-trait="\${atkTrait}" style="\${atkStyle}"><span>\${displayAtk}</span></div>
                <div class="stat-icon stat-hp" data-trait="\${hpTrait}" style="\${hpStyle}"><span>\${displayHp}</span></div>
            </div>
        \`;
`;
if (!uiJs.includes("data-trait=\"\\${atkTrait}\"")) {
    uiJs = uiJs.replace(
        /statsHTML = `[\s\S]*?<div class="card-stats">[\s\S]*?<span class="card-atk"[\s\S]*?<\/div>[\s\S]*?`;/,
        replacement.trim()
    );
    fs.writeFileSync('ui.js', uiJs);
}

console.log("Rebuilt successfully.");
