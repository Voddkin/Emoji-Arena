with open("script.js", "r") as f:
    js = f.read()

js = js.replace("""const screens = {
    MENU: 'main-menu',
    SHOP: 'shop-screen',
    COLLECTION: 'collection-screen',
    BATTLE: 'battle-screen',
    DRAFT: 'draft-screen'
};""", """const screens = {
    MENU: 'main-menu',
    SHOP: 'shop-screen',
    COLLECTION: 'collection-screen',
    BATTLE: 'battle-screen',
    DRAFT: 'draft-screen',
    MAP: 'map-screen',
    LEADERBOARD: 'leaderboard-screen'
};""")

with open("script.js", "w") as f:
    f.write(js)
