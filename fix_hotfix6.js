const fs = require('fs');
let code = fs.readFileSync('main.js', 'utf8');
code = code.replace(/if\(document\.getElementById\('([^']+)'\)\) document\.getElementById\('([^']+)'\)\.addEventListener/g, "const el_$1 = document.getElementById('$1');\nif (el_$1) el_$1.addEventListener");
code = code.replace(/const el_([a-zA-Z0-9\-]+) =/g, (match, p1) => { return `const el_${p1.replace(/-/g, '_')} =`; });
code = code.replace(/if \(el_([a-zA-Z0-9\-]+)\) el_([a-zA-Z0-9\-]+)\.addEventListener/g, (match, p1, p2) => { return `if (el_${p1.replace(/-/g, '_')}) el_${p2.replace(/-/g, '_')}.addEventListener`; });
fs.writeFileSync('main.js', code);
