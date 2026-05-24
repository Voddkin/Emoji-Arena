with open("verify_ui.py", "r") as f:
    code = f.read()

# We need to click "nav-home" back to reach the BATTLE button because clicking the shop hides the menu screen.
code = code.replace('page.click("#btn-play-modes")', 'page.click("#nav-home")\n        page.wait_for_timeout(500)\n        page.click("#btn-play-modes")')

with open("verify_ui.py", "w") as f:
    f.write(code)
