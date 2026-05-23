import re

with open("script.js", "r") as f:
    js = f.read()

render_draft_logic = """
function renderDraftChoices() {
    const s = playerProfile.arenaState;
    if (!s) return;

    const countEl = document.getElementById('draft-count');
    const choicesContainer = document.getElementById('draft-choices');
    const deckGrid = document.getElementById('draft-deck-grid');

    if (countEl) countEl.innerText = `Cartas Selecionadas: ${s.deck.length}/40 (Vitórias: ${s.wins}/12 | Derrotas: ${s.losses}/3)`;

    // Render Deck
    if (deckGrid) {
        deckGrid.innerHTML = '';
        s.deck.forEach(cId => {
            const wrap = document.createElement('div');
            wrap.innerHTML = createCardHTML(getCardById(cId));
            deckGrid.appendChild(wrap.firstElementChild);
        });
    }

    if (s.deck.length >= 40) {
        choicesContainer.innerHTML = `
            <div style="text-align: center; width: 100%;">
                <h3 style="color: #2ecc71;">Deck Concluído!</h3>
                <p>Você está pronto para enfrentar a Arena.</p>
                <button id="btn-start-arena-battle" class="buy-btn" style="padding: 20px 40px; font-size: 1.5rem; margin-top: 20px;">BATALHAR ⚔️</button>
            </div>
        `;
        document.getElementById('btn-start-arena-battle').addEventListener('click', () => {
            startMatchmaking(true);
        });
        return;
    }

    // Pick 3 from pool if not currently choosing
    if (!s.currentChoices || s.currentChoices.length === 0) {
        s.currentChoices = s.pool.splice(0, 3);
        saveProfile();
    }

    // Render choices
    choicesContainer.innerHTML = '';
    s.currentChoices.forEach(cId => {
        const cardObj = getCardById(cId);
        const cardWrap = document.createElement('div');
        cardWrap.innerHTML = createCardHTML(cardObj);
        const cardEl = cardWrap.firstElementChild;
        cardEl.style.cursor = 'pointer';
        cardEl.style.transform = 'scale(1.2)';
        cardEl.style.margin = '20px';

        cardEl.addEventListener('click', () => {
            AudioManager.playSFX('ui_click');
            // Add selected to deck
            s.deck.push(cId);
            // Put the other 2 back into the pool
            const otherCards = s.currentChoices.filter(id => id !== cId);
            s.pool.push(...otherCards);
            // Shuffle pool again just in case
            s.pool.sort(() => 0.5 - Math.random());

            s.currentChoices = [];
            saveProfile();
            renderDraftChoices();
        });

        choicesContainer.appendChild(cardEl);
    });
}
"""

js = js.replace("function startArenaDraft() {", render_draft_logic + "\nfunction startArenaDraft() {")

with open("script.js", "w") as f:
    f.write(js)
