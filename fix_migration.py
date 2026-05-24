with open("script.js", "r") as f:
    js = f.read()

# I noticed a bug in my previous script logic. I replaced cardWarsUltimateProfile with Emoji_Arena_SaveData_v1 for removal.
js = js.replace("localStorage.removeItem('Emoji_Arena_SaveData_v1');\n            console.log(\"Migração", "localStorage.removeItem('cardWarsUltimateProfile');\n            console.log(\"Migração")

with open("script.js", "w") as f:
    f.write(js)
