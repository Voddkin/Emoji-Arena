from playwright.sync_api import sync_playwright

def test_draft():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(record_video_dir="/home/jules/verification/videos")
        page = context.new_page()
        page.goto("http://localhost:8000")

        # Test basic UI loading
        page.wait_for_timeout(1000)

        # Open Play Modes
        page.click("#btn-play-modes")
        page.wait_for_timeout(500)

        # Click Draft Button
        page.click("#btn-play-draft")
        page.wait_for_timeout(500)

        # Ensure we reached the draft screen
        page.screenshot(path="/home/jules/verification/screenshots/ui_draft_init.png")

        # Click the first card available
        # The cards are inside #draft-choices. We just click the first one if available.
        # But wait, we rate limited clicks. So we click once, wait 400ms, click again.
        for _ in range(5):
            page.locator("#draft-choices > div").first.click()
            page.wait_for_timeout(400)

        page.screenshot(path="/home/jules/verification/screenshots/ui_draft_progress.png")

        context.close()
        browser.close()

if __name__ == "__main__":
    test_draft()
    print("Draft test passed.")
