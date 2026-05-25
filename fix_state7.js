const fs = require('fs');
let code = fs.readFileSync('main.js', 'utf8');

// The line `observer.observe(document.documentElement, { childList: true, subtree: true });` is at main.js:31.
// That is the rogue call that crashes it!
// Because we moved the observer into state.js and wrapped it in `window.onload`, main.js tries to call it before it exists.
code = code.replace(/observer\.observe\(document\.documentElement, \{ childList: true, subtree: true \}\);\n/g, '');
fs.writeFileSync('main.js', code);

console.log("Removed rogue observer call from main.js");
