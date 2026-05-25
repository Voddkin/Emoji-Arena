const fs = require('fs');
let stateCode = fs.readFileSync('state.js', 'utf8');

// The MutationObserver needs to be wrapped in DOMContentLoaded or deferred so it doesn't ban the legitimate scripts loading.
stateCode = stateCode.replace('const observer = new MutationObserver((mutations) => {',
`let observer;
window.addEventListener('load', () => {
    observer = new MutationObserver((mutations) => {`);

stateCode = stateCode.replace('    });\n});\n\nconst originalSetTimeout', '    });\n    observer.observe(document.documentElement, { childList: true, subtree: true });\n});\n\nconst originalSetTimeout');

fs.writeFileSync('state.js', stateCode);
console.log("Mutation observer wrapped in window.onload");
