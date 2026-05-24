with open("script.js", "r") as f:
    js = f.read()

# Since we replaced the old main-menu top section, IDs like 'menu-coins', 'menu-gems', etc. might be gone and throw errors if accessed directly without checking.
# Let's wrap them in optional checks or remove them since updateHUD() handles it now.

replacements = [
    "document.getElementById('menu-coins')",
    "document.getElementById('menu-gems')",
    "document.getElementById('menu-stardust')",
    "document.getElementById('menu-tickets')",
    "document.getElementById('menu-level')",
    "document.getElementById('menu-rank')",
    "document.getElementById('menu-avatar')",
    "document.getElementById('menu-xp-fill')"
]

for req in replacements:
    js = js.replace(f"{req}.innerText", f"if({req}) {req}.innerText")
    js = js.replace(f"{req}.style.width", f"if({req}) {req}.style.width")

with open("script.js", "w") as f:
    f.write(js)
