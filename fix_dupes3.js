const fs = require('fs');
let mainCode = fs.readFileSync('main.js', 'utf8');
let startIdx = mainCode.indexOf('function checkDeadCards() {');
if (startIdx !== -1) {
    let braceLevel = 0;
    let endIdx = -1;
    for (let i = startIdx; i < mainCode.length; i++) {
        if (mainCode[i] === '{') braceLevel++;
        if (mainCode[i] === '}') braceLevel--;
        if (braceLevel === 0 && mainCode[i] === '}') {
            endIdx = i + 1;
            break;
        }
    }
    if (endIdx !== -1) {
        mainCode = mainCode.substring(0, startIdx) + mainCode.substring(endIdx);
        fs.writeFileSync('main.js', mainCode);
        console.log("Removed old checkDeadCards from main.js");
    }
}
