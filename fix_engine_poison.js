const fs = require('fs');
let engineCode = fs.readFileSync('engine.js', 'utf8');

if (!engineCode.includes('// --- Mecânica de Envenenado ---')) {
    engineCode = engineCode.replace('gameState[side].heroUsed = false;',
`gameState[side].heroUsed = false;
    // --- Mecânica de Envenenado ---
    ['player', 'opponent'].forEach(s => {
        gameState[s].board.forEach((card, idx) => {
            if (card && typeof hasKeyword === 'function' && hasKeyword(card, 'envenenado')) {
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
    if (typeof checkDeadCards === 'function') checkDeadCards();
`);
    fs.writeFileSync('engine.js', engineCode);
    console.log("Added poison to engine.js");
}
