import re

with open("script.js", "r") as f:
    js = f.read()

power_fix = """
    if (p_hero.id === 'mago') {
        // Apply visual damage correctly to the bot avatar
        const botAvatar = document.querySelector('.bot-avatar');
        if (botAvatar) {
            botAvatar.classList.add('screen-shake');
            setTimeout(() => botAvatar.classList.remove('screen-shake'), 400);
        }
        triggerDamageAnimation('player', null, 'opponent', null, 2);
        showNotification("Poder do Mago: 2 de Dano ao Herói Inimigo!", "info");
        setTimeout(() => {
            gameState.opponent.hp -= 2;
            checkWinCondition();
            updateBattleUI();
        }, 500);
"""

js = js.replace("""    if (p_hero.id === 'mago') {
        // Target logic: let user pick any enemy (simplified to direct hero dmg if no target selector implemented, but let's just hit the enemy hero for flow)
        triggerDamageAnimation('player', null, 'opponent', null, 2);
        showNotification("Poder do Mago: 2 de Dano ao Herói Inimigo!", "info");
        setTimeout(() => {
            gameState.opponent.hp -= 2;
            checkWinCondition();
            updateBattleUI();
        }, 500);""", power_fix)

with open("script.js", "w") as f:
    f.write(js)
