const fs = require('fs');

['data.js', 'state.js', 'engine.js', 'ui.js', 'main.js'].forEach(file => {
    let code = fs.readFileSync(file, 'utf8');
    try {
        new Function(code);
        console.log(file, "syntax is OK");
    } catch (e) {
        console.log(file, "syntax error:", e.message);
    }
});
