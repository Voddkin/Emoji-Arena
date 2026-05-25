const fs = require('fs');

let engineCode = fs.readFileSync('engine.js', 'utf8');

if (!engineCode.includes('// --- Mecânica de Envenenado ---')) {
    const poisonLogic = `
    // --- Mecânica de Envenenado ---
    ['player', 'opponent'].forEach(s => {
        gameState[s].board.forEach((card, i) => {
            if (card && hasKeyword(card, 'envenenado')) {
                card.hp -= 1;
                let slotPrefix = s === 'player' ? 'player' : 'opp';
                let el = document.querySelector(\`#\${slotPrefix}-slot-\${i} .card\`);
                if (el) {
                    el.style.boxShadow = '0 0 15px #2ecc71';
                    setTimeout(() => el.style.boxShadow = '', 800);
                }
                if (typeof AudioManager !== 'undefined') AudioManager.playSFX('ui_error');
            }
        });
    });
    checkDeadCards();
`;
    // Find where startTurn ends its initial block and inject it
    engineCode = engineCode.replace('gameState[side].heroUsed = false;', 'gameState[side].heroUsed = false;\n' + poisonLogic);
    fs.writeFileSync('engine.js', engineCode);
    console.log("Poison logic added to startTurn");
} else {
    console.log("Poison logic already exists");
}
