from playwright.sync_api import sync_playwright

def test_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:8000")

        # Test basic UI loading
        page.wait_for_timeout(1000)

        page.screenshot(path="/home/jules/verification/screenshots/ui_lobby.png")

        # Click Quests from bottom nav
        page.click("#nav-quests")
        page.wait_for_timeout(500)
        page.screenshot(path="/home/jules/verification/screenshots/ui_quests.png")

        # Click Shop
        page.click("#nav-shop")
        page.wait_for_timeout(500)
        page.screenshot(path="/home/jules/verification/screenshots/ui_shop.png")

        # Verify Giant Battle Button
        page.click("#nav-home")
        page.wait_for_timeout(500)
        page.click("#btn-play-modes")
        page.wait_for_timeout(500)
        page.screenshot(path="/home/jules/verification/screenshots/ui_play_modes.png")

        browser.close()

if __name__ == "__main__":
    test_ui()
    print("Tests passed.")
