import re

with open("index.html", "r") as f:
    html = f.read()

# 1. Insert News Hub Icon with Notification Badge in the Top HUD
hub_icon_html = """
                <div class="news-hub-icon" id="btn-news-hub" title="Novidades">
                    📢
                    <div class="notification-dot hidden" id="news-notification-dot"></div>
                </div>
"""
# Insert it after the dust-pill
html = html.replace('<div class="currency-pill dust-pill">✨ <span id="hud-dust">0</span></div>', '<div class="currency-pill dust-pill">✨ <span id="hud-dust">0</span></div>\n' + hub_icon_html)

# 2. Insert the News Hub Modal
news_modal_html = """
        <!-- News Hub Modal -->
        <div id="news-hub-modal" class="overlay hidden" style="backdrop-filter: blur(10px); z-index: 2000;">
            <div class="modal-content news-modal" style="max-width: 800px; width: 90%; background: rgba(11, 5, 20, 0.95); border: 2px solid var(--secondary-color); display: flex; flex-direction: row; padding: 0; overflow: hidden;">

                <div class="news-timeline" id="news-timeline" style="width: 30%; background: rgba(0,0,0,0.5); border-right: 1px solid #333; overflow-y: auto; max-height: 70vh;">
                    <!-- Timeline buttons injected here -->
                </div>

                <div class="news-details" style="width: 70%; padding: 30px; overflow-y: auto; max-height: 70vh; position: relative;">
                    <button id="btn-close-news" style="position: absolute; top: 10px; right: 10px; background: transparent; border: none; color: #aaa; font-size: 1.5rem; cursor: pointer;">✖</button>
                    <h2 id="patch-title" style="font-size: 2.5rem; color: var(--primary-color); margin-bottom: 5px; text-shadow: 0 0 10px var(--primary-color);"></h2>
                    <div style="font-size: 0.9rem; color: #888; border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 20px;">
                        <span id="patch-date"></span> • <span id="patch-version"></span>
                    </div>
                    <h3 id="patch-subtitle" style="color: var(--secondary-color); font-style: italic; margin-bottom: 20px;"></h3>
                    <div id="patch-content" class="patch-content" style="font-size: 1.1rem; line-height: 1.6; color: #ecf0f1;">
                        <!-- Content injected here -->
                    </div>
                </div>

            </div>
        </div>
"""

# Insert before settings-overlay
html = html.replace('<!-- Settings Overlay -->', news_modal_html + '\n        <!-- Settings Overlay -->')

with open("index.html", "w") as f:
    f.write(html)
