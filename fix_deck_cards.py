import re

with open("script.js", "r") as f:
    js = f.read()

# Update renderHUD to also render peeking cards
peeking_cards_logic = """
    // Render Peeking Cards
    const peekingContainer = document.getElementById('lobby-peeking-cards');
    if (peekingContainer && playerProfile.deck && playerProfile.deck.length >= 3) {
        // Shuffle a bit or take top 3
        const deckSample = playerProfile.deck.slice(0, 3);
        peekingContainer.innerHTML = '';
        deckSample.forEach((cardId, i) => {
            const cardData = getCardById(cardId);
            const cardEl = document.createElement('div');
            cardEl.className = `peek-card card-${i+1}`;
            if (cardData) {
                // Apply a visual style matching the card
                let tIcon = '❓';
                if(cardData.tribes && cardData.tribes.length > 0) {
                    const mainTribe = cardData.tribes[0];
                    if(mainTribe === TRIBES.NATUREZA) tIcon = '🍃';
                    if(mainTribe === TRIBES.URBANO) tIcon = '🏙️';
                    if(mainTribe === TRIBES.ANIMAL) tIcon = '🐾';
                    if(mainTribe === TRIBES.AQUATICO) tIcon = '💧';
                    if(mainTribe === TRIBES.MAGICO) tIcon = '✨';
                    if(mainTribe === TRIBES.FERRAMENTA) tIcon = '🛠️';
                    if(mainTribe === TRIBES.COMIDA) tIcon = '🍔';
                    if(mainTribe === TRIBES.VEICULO) tIcon = '🚗';
                    if(mainTribe === TRIBES.PROFISSAO) tIcon = '💼';
                    if(mainTribe === TRIBES.TERRENO) tIcon = '🌍';
                    if(mainTribe === TRIBES.MISTICO) tIcon = '🔮';
                    if(mainTribe === TRIBES.TECNOLOGIA) tIcon = '⚙️';
                }
                cardEl.innerHTML = `<div style="text-align:center; font-size:1.5rem; margin-top:20px;">${tIcon}</div>`;
                cardEl.style.background = `linear-gradient(135deg, ${cardData.color || '#34495e'}, #2c3e50)`;
            }
            peekingContainer.appendChild(cardEl);
        });
    }
"""

js = js.replace("document.getElementById('lobby-avatar').innerText = playerProfile.activeAvatar || '🧙‍♂️';", "document.getElementById('lobby-avatar').innerText = playerProfile.activeAvatar || '🧙‍♂️';\n" + peeking_cards_logic)

with open("script.js", "w") as f:
    f.write(js)
