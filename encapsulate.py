import re

with open("script.js", "r") as f:
    js = f.read()

# Wrap in IIFE
if not js.startswith("(() => {"):
    js = "(() => {\n'use strict';\n\n" + js + "\n})();"

# Freeze databases
freeze_targets = ["CARD_TYPES", "RARITIES", "TRIBES", "HEROES", "CardDatabase", "DAILY_QUESTS", "ACHIEVEMENTS", "ENDLESS_MUTATIONS"]

for target in freeze_targets:
    # Inject Object.freeze after array/object declaration if not already there
    # This requires a bit of parsing. It's safer to just append Object.freeze statements at the end of the const declarations block
    pass

# We can append the freeze instructions right before the first function
freeze_block = "\n// SecOps: Congelamento de Bancos de Dados (Anti-Memory Editing)\n"
for target in freeze_targets:
    freeze_block += f"if (typeof {target} !== 'undefined') Object.freeze({target});\n"

# Inject before loadProfile or Helper functions
js = js.replace("// Helper functions", freeze_block + "\n// Helper functions")

with open("script.js", "w") as f:
    f.write(js)
