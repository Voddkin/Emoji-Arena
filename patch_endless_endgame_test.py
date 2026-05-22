import re

with open('script.js', 'r') as f:
    js = f.read()

# Make sure we actually set up Endless state so Playwright doesn't get 'undefined'.
# Let's verify startEndlessMode sets everything right
print(re.search(r'function startEndlessMode\(\) \{[\s\S]*?\}', js))
