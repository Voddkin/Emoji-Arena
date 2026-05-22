import re

with open("script.js", "r") as f:
    js = f.read()

translations = {
    # It appears Boss descriptions are in PT.
    # But let's check basic stuff.
    "if (mut.effect === 'all_poison') {": "if (mut.effect === 'all_poison') {",
}
