import re

with open("styles.css", "r") as f:
    css = f.read()

# We need to DESTROY old CSS that conflicts.
# For example, removing .player-profile-top, .progression-info, .menu-buttons. Wait, is old HTML still there?
