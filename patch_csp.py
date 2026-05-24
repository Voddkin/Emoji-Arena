with open("index.html", "r") as f:
    html = f.read()

csp_meta = """    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline';">"""
# Wait, the prompt specifically said: `script-src 'self'`.
# If I use 'unsafe-inline' playwright might pass, but prompt says "script-src 'self'".
# Let's strictly follow the prompt.

csp_meta = """    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self';">"""

html = html.replace('<meta charset="UTF-8">', '<meta charset="UTF-8">\n' + csp_meta)

with open("index.html", "w") as f:
    f.write(html)
