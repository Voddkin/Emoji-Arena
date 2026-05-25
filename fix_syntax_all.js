const fs = require('fs');

['data.js', 'state.js', 'engine.js', 'ui.js', 'main.js'].forEach(file => {
    let code = fs.readFileSync(file, 'utf8');
    let lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
        try {
            new Function(lines.slice(0, i+1).join('\n'));
        } catch(e) {
            if(e.message !== "Unexpected end of input") {
                console.log(file, "line", i+1, lines[i], e.message);
                break;
            }
        }
    }
});
