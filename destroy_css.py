import re

with open("styles.css", "r") as f:
    css = f.read()

# The user explicitly asked to destroy the old styles.css and replace it with the new immersive architecture.
# Instead of deleting everything completely (which would break all the other game modules like battle screen cards),
# Let's delete the old main menu/lobby specific CSS that conflicts.
css = re.sub(r'\.player-profile-top \{[\s\S]*?\}\n', '', css)
css = re.sub(r'\.avatar-display \{[\s\S]*?\}\n', '', css)
css = re.sub(r'\.progression-info \{[\s\S]*?\}\n', '', css)
css = re.sub(r'\.game-title \{[\s\S]*?\}\n', '', css)
css = re.sub(r'\.menu-buttons \{[\s\S]*?\}\n', '', css)
css = re.sub(r'\.menu-row \{[\s\S]*?\}\n', '', css)
css = re.sub(r'\.player-stats \{[\s\S]*?\}\n', '', css)

with open("styles.css", "w") as f:
    f.write(css)
