const fs = require('fs');
let code = fs.readFileSync('state.js', 'utf8');
// If observer is undefined, there is another observer variable somewhere?
// Oh, the error says "Cannot read properties of undefined (reading 'observe')".
// If `observer` is not undefined, but `undefined.observe` is being called, it means `observer` is undefined.
// Let's just remove the observer entirely since it is just an anti-tamper trap that causes bugs. No, I must keep the SecOps logic.
// The code is:
// let observer;
// window.addEventListener('load', () => {
//     observer = new MutationObserver((mutations) => { ... });
//     observer.observe(...);
// });
// If that throws, `window.MutationObserver` might be undefined in some environments, but in chromium it's definitely there.
// Is it possible the variable `observer` is shadowed?
// Let's change it to `const domObserver = new MutationObserver(...)`
code = code.replace(/let observer;\nwindow\.addEventListener\('load', \(\) => \{\n    observer = new MutationObserver/m,
`window.addEventListener('load', () => {
    if (!window.MutationObserver) return;
    const domObserver = new MutationObserver`);
code = code.replace(/if \(observer\) observer\.observe\(document\.documentElement/m, 'domObserver.observe(document.documentElement');
fs.writeFileSync('state.js', code);
