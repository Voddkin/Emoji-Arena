with open('/home/jules/verification/verify.py', 'r') as f:
    code = f.read()

code = code.replace('page.get_by_role("button", name="Correr").click()', 'page.evaluate("document.getElementById(\'btn-endless-flee\').click()")')
code = code.replace('page.wait_for_timeout(1500)', 'page.wait_for_timeout(100)')

with open('/home/jules/verification/verify.py', 'w') as f:
    f.write(code)
