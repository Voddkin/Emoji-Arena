import re

with open("index.html", "r") as f:
    html = f.read()

html = re.sub(r'<div class="player-stats">.*?</div>\n        </div>\n\n        <!-- Shop Screen -->', '</div>\n\n        <!-- Shop Screen -->', html, flags=re.DOTALL)

with open("index.html", "w") as f:
    f.write(html)
