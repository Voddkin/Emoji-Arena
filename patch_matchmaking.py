import re

with open("script.js", "r") as f:
    js = f.read()

# Replace startMatchmaking to show an overlay with Tips
matchmaking_logic = """
const LOADING_TIPS = [
    'Dica: No Emoji Arena, gerenciar seus Créditos é a chave para a vitória.',
    'Dica: Combine tribos iguais para criar sinergias devastadoras!',
    'Dica: Fique de olho na Energia da Bateria. Ela não reseta entre turnos.',
    'Dica: Cartas Lendárias e Míticas são raras, mas não imortais.',
    'Dica: O Modo Fenda da Eternidade oferece recompensas que escalam infinitamente.'
];

function startMatchmaking(isBot = true) {
    if (playerProfile.deck.length < 40 && currentMatchMode !== 'draft' && currentMatchMode !== 'roguelike') {
        showNotification("Seu deck precisa de 40 cartas!", "error");
        return;
    }

    // Simulate Loading Screen Immersion
    const tipEl = document.getElementById('matchmaking-tip');
    if(tipEl) {
        tipEl.innerText = LOADING_TIPS[Math.floor(Math.random() * LOADING_TIPS.length)];
    }

    // Configura bot ou oponente fake
    gameState.opponent.isBot = isBot;
    gameState.opponent.botLevel = 'medium';

    const overlay = document.getElementById('matchmaking-overlay');
    if (overlay) overlay.classList.remove('hidden');

    setTimeout(() => {
        if(overlay) overlay.classList.add('hidden');
        showScreenSPA('battle-screen'); // Ensure it uses SPA logic
        startBattle();
    }, 2500); // 2.5s of artificial AAA tension loading
}
"""

js = re.sub(r'function startMatchmaking\(isBot = true\) \{[\s\S]*?\n\}', matchmaking_logic, js)

with open("script.js", "w") as f:
    f.write(js)
