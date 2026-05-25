const fs = require('fs');
let acorn = require('acorn');

['data.js', 'state.js', 'engine.js', 'ui.js', 'main.js'].forEach(file => {
    let code = fs.readFileSync(file, 'utf8');
    try {
        acorn.parse(code, { ecmaVersion: 2022 });
    } catch(e) {
        console.log(file, "ERROR:", e.message);
    }
});
