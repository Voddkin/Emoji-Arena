const fs = require('fs');
let uiCode = fs.readFileSync('ui.js', 'utf8');

// remove old executeAttack from ui.js
let startIdx = uiCode.indexOf('function executeAttack(attackerIdx, defenderIdx) {');
if (startIdx !== -1) {
    let braceLevel = 0;
    let endIdx = -1;
    for (let i = startIdx; i < uiCode.length; i++) {
        if (uiCode[i] === '{') braceLevel++;
        if (uiCode[i] === '}') braceLevel--;
        if (braceLevel === 0 && uiCode[i] === '}') {
            endIdx = i + 1;
            break;
        }
    }
    if (endIdx !== -1) {
        uiCode = uiCode.substring(0, startIdx) + uiCode.substring(endIdx);
        fs.writeFileSync('ui.js', uiCode);
        console.log("Removed executeAttack from ui.js");
    }
}
