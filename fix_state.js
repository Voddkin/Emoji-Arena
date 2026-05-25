const fs = require('fs');

let code = fs.readFileSync('state.js', 'utf8');

// The MutationObserver trick was:
// let observer; window.addEventListener('load', () => { observer = new MutationObserver(...) });
// Then later: }); observer.observe(...); });
// It probably mismatched braces! Let's just fix it by replacing the whole observer logic.

// Strip original observer block
code = code.replace(/const observer = new MutationObserver\(\(mutations\) => \{[\s\S]*?\}\);/m, '');
code = code.replace(/let observer;[\s\S]*?\}\);/m, '');

// Re-inject a clean one
const cleanObserver = `
let observer;
window.addEventListener('load', () => {
    observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.tagName && node.tagName.toLowerCase() === 'script') {
                    node.remove();
                    if (typeof SaveManager !== 'undefined') SaveManager.triggerBan();
                    location.reload();
                }
                if (node.tagName && node.tagName.toLowerCase() === 'div') {
                    const zIndex = parseInt(window.getComputedStyle(node).zIndex, 10);
                    const pos = window.getComputedStyle(node).position;
                    if ((zIndex >= 9000 || pos === 'fixed') && !node.classList.contains('overlay') && !node.classList.contains('notification')) {
                        node.remove();
                        if (typeof SaveManager !== 'undefined') SaveManager.triggerBan();
                        location.reload();
                    }
                }
            });
        });
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
});
`;

// Insert it after `let gameState = { ... };`
let idx = code.indexOf('let gameState');
let endIdx = code.indexOf('};', idx);
if (endIdx !== -1) {
    code = code.substring(0, endIdx + 2) + '\n\n' + cleanObserver + '\n\n' + code.substring(endIdx + 2);
}

fs.writeFileSync('state.js', code);
