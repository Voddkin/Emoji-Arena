const fs = require('fs');
let code = fs.readFileSync('state.js', 'utf8');
// The observer instantiation is inside `window.addEventListener('load', () => { observer = new MutationObserver(...)`
// But we try to call `observer.observe(document.documentElement)` which is NOT supported in headless/test environments?
// "Cannot read properties of undefined (reading 'observe')" means observer is undefined when it tries to call it.
// Why is it undefined? Oh, `new MutationObserver` might not be supported or it failed.
// Actually, `observer.observe` is INSIDE the `load` callback. So `observer` was just assigned.
// If it's undefined, it means `new MutationObserver` returned undefined or failed silently?
// In Playwright chromium, MutationObserver definitely exists.

// Let's just wrap `observer.observe(...)` in an `if (observer)` check.
code = code.replace('observer.observe(document.documentElement, { childList: true, subtree: true });', 'if (observer) observer.observe(document.documentElement, { childList: true, subtree: true });');
fs.writeFileSync('state.js', code);
