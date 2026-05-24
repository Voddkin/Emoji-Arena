import re

with open("script.js", "r") as f:
    js = f.read()

tamper_logic = """
// --- SecOps: Anti-Tampering (Integrity Check) ---
function verifyIntegrity(func, expectedLengthRange) {
    const funcStr = func.toString();
    // In many browsers, modified functions by user scripts won't say [native code] anyway if they weren't native.
    // Instead we check if the string representation is roughly the expected length.
    // Hackers hooking into a function usually increase its length or change its signature.
    if (funcStr.length < expectedLengthRange[0] || funcStr.length > expectedLengthRange[1]) {
        SaveManager.triggerBan();
        throw new Error("Integrity compromised.");
    }
}

// We will run this periodically on critical functions
setInterval(() => {
    try {
        verifyIntegrity(addXP, [50, 400]);
        verifyIntegrity(triggerDamageAnimation, [500, 3000]);
        verifyIntegrity(openPack, [1000, 5000]);
    } catch(e) {
        // App dies here
    }
}, 5000);
"""

js = js.replace("// --- Fim SecOps ---", "// --- Fim SecOps ---\n" + tamper_logic)

with open("script.js", "w") as f:
    f.write(js)
