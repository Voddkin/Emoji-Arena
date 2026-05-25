const fs = require('fs');

// The reviewer mentioned "startTurn" was duplicated across ui.js and engine.js.
['ui.js', 'main.js'].forEach(file => {
    let code = fs.readFileSync(file, 'utf8');
    if (code.includes('function startTurn')) {
        console.log(file, 'has startTurn!');
        // we can just string replace the block if it's there
    }
});

let engineCode = fs.readFileSync('engine.js', 'utf8');
if (engineCode.includes('function startTurn')) {
    console.log('engine.js has startTurn!');
}
