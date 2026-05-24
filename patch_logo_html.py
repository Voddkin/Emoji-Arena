import re

with open("index.html", "r") as f:
    html = f.read()

# Add the CSS Logo right above the Hero Display
logo_html = """
            <!-- Game Logo (CSS Rebranding) -->
            <div id="game-logo" data-text="Emoji Arena">Emoji Arena</div>
"""

html = html.replace("<!-- Hero Display (Center Stage) -->", logo_html + "\n            <!-- Hero Display (Center Stage) -->")

with open("index.html", "w") as f:
    f.write(html)
