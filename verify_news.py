from playwright.sync_api import sync_playwright

def test_news():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:8000")

        # Test basic UI loading
        page.wait_for_timeout(1000)

        # Open news hub
        page.click("#btn-news-hub")
        page.wait_for_timeout(500)
        page.screenshot(path="/home/jules/verification/screenshots/ui_news.png")

        browser.close()

if __name__ == "__main__":
    test_news()
    print("News test passed.")
