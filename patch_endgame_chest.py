import re

with open("script.js", "r") as f:
    js = f.read()

chest_reward = """
        // Grant a chest if there's an empty slot
        if (!playerProfile.chests) playerProfile.chests = [null, null, null, null];
        const emptySlotIdx = playerProfile.chests.findIndex(c => c === null);
        if (emptySlotIdx !== -1) {
            playerProfile.chests[emptySlotIdx] = { id: 'basic_chest', unlockTime: Date.now() + 30000 }; // 30 sec dummy
        }
"""
js = js.replace("if(typeof addCrowns === 'function') addCrowns(10);", "if(typeof addCrowns === 'function') addCrowns(10);" + chest_reward)

with open("script.js", "w") as f:
    f.write(js)
