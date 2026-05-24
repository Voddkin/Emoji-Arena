observer.observe(document.documentElement, { childList: true, subtree: true });



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

function initializeNewsHub() {
    if (!GAME_PATCH_NOTES || GAME_PATCH_NOTES.length === 0) return;

    const lastRead = localStorage.getItem('Emoji_Arena_LastReadPatch');
    const latestPatch = GAME_PATCH_NOTES[0];
    const dot = document.getElementById('news-notification-dot');

    if (lastRead !== latestPatch.id && dot) {
        dot.classList.remove('hidden');
    }

    const btnHub = document.getElementById('btn-news-hub');
    if (btnHub) {
        btnHub.addEventListener('click', () => {
            if (dot) dot.classList.add('hidden');
            localStorage.setItem('Emoji_Arena_LastReadPatch', latestPatch.id);
            openNewsHub();
        });
    }

    const btnClose = document.getElementById('btn-close-news');
    if (btnClose) {
        btnClose.addEventListener('click', () => {
            document.getElementById('news-hub-modal').classList.add('hidden');
        });
    }
}


function openNewsHub() {
    const modal = document.getElementById('news-hub-modal');
    if (!modal) return;
    modal.classList.remove('hidden');

    const timeline = document.getElementById('news-timeline');
    timeline.innerHTML = '';

    GAME_PATCH_NOTES.forEach((patch, index) => {
        const btn = document.createElement('button');
        btn.className = `news-timeline-item ${index === 0 ? 'active' : ''}`;

        let newTag = index === 0 ? '<span class="tag-new">NOVO</span>' : '';
        btn.innerHTML = `<span>${patch.version}</span> ${newTag}`;

        btn.onclick = () => {
            document.querySelectorAll('.news-timeline-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPatchDetails(patch);
        };

        timeline.appendChild(btn);
    });

    if (GAME_PATCH_NOTES.length > 0) {
        renderPatchDetails(GAME_PATCH_NOTES[0]);
    }
}


function renderPatchDetails(patch) {
    document.getElementById('patch-title').innerText = patch.title;
    document.getElementById('patch-version').innerText = patch.version;
    document.getElementById('patch-date').innerText = patch.date;
    document.getElementById('patch-subtitle').innerText = patch.subtitle;
    document.getElementById('patch-content').innerHTML = patch.content;
}

function renderMapScreen() {
    if (!playerProfile.currentRunState) return;
    const state = playerProfile.currentRunState;
    const map = state.map;

    // Update Header
    document.getElementById('rogue-hp').innerText = `${state.hp}/${state.maxHp}`;
    document.getElementById('rogue-gold').innerText = state.gold;

    const container = document.getElementById('map-nodes-container');
    const svg = document.getElementById('map-svg-lines');
    container.innerHTML = '';
    svg.innerHTML = '';

    // Calculate heights and layout
    // We reverse the rendering so Tier 0 is at bottom

    const tierDivs = [];

    map.forEach((tier, tIdx) => {
        const tierDiv = document.createElement('div');
        tierDiv.className = 'map-tier';
        tierDiv.dataset.tier = tIdx;

        tier.forEach((node, nIdx) => {
            const nodeDiv = document.createElement('div');
            nodeDiv.className = 'map-node';
            nodeDiv.id = node.id;

            let icon = '⚔️';
            if (node.type === 'elite') icon = '💀';
            if (node.type === 'campfire') icon = '🔥';
            if (node.type === 'shop') icon = '🛒';
            if (node.type === 'event') icon = '❓';
            if (node.type === 'boss') icon = '👹';

            nodeDiv.innerHTML = `<span class="node-icon-${node.type}">${icon}</span>`;

            // Check status
            if (tIdx < state.currentNodeTier) {
                nodeDiv.classList.add('completed');
            } else if (tIdx === state.currentNodeTier) {
                // If this is the node we are on OR we haven't started yet
                if (tIdx === 0 && state.currentNodeTier === 0 && !gameState.inCombat) {
                    nodeDiv.classList.add('active-choice');
                    nodeDiv.onclick = () => selectNode(node);
                } else if (nIdx === state.currentNodeIndex) {
                    nodeDiv.innerHTML += `<div class="player-marker">🚶</div>`;
                    nodeDiv.classList.add('completed');
                }
            } else if (tIdx === state.currentNodeTier + 1) {
                // Next tier, check if connected
                const currentNode = map[state.currentNodeTier][state.currentNodeIndex];
                if (currentNode.connections.includes(nIdx)) {
                    nodeDiv.classList.add('active-choice');
                    nodeDiv.onclick = () => selectNode(node);
                }
            }

            tierDiv.appendChild(nodeDiv);
        });

        tierDivs.push(tierDiv);
    });

    // Append in reverse order (boss at top, start at bottom)
    for (let i = tierDivs.length - 1; i >= 0; i--) {
        container.appendChild(tierDivs[i]);
    }

    // Draw SVG Lines (Need timeout to let DOM render for getBoundingClientRect)
    setTimeout(() => {
        const svgRect = svg.getBoundingClientRect();

        for (let t = 0; t < map.length - 1; t++) {
            const currentTier = map[t];
            currentTier.forEach((node, i) => {
                const startEl = document.getElementById(node.id);
                if (!startEl) return;
                const startRect = startEl.getBoundingClientRect();

                // SVG coordinates relative to svg bounding box
                const startX = startRect.left + (startRect.width / 2) - svgRect.left;
                const startY = startRect.top + (startRect.height / 2) - svgRect.top;

                node.connections.forEach(targetIdx => {
                    const endEl = document.getElementById(`t${t+1}_n${targetIdx}`);
                    if (!endEl) return;
                    const endRect = endEl.getBoundingClientRect();

                    const endX = endRect.left + (endRect.width / 2) - svgRect.left;
                    const endY = endRect.top + (endRect.height / 2) - svgRect.top;

                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('x1', startX);
                    line.setAttribute('y1', startY);
                    line.setAttribute('x2', endX);
                    line.setAttribute('y2', endY);
                    line.setAttribute('class', 'map-path');

                    if (t === state.currentNodeTier && i === state.currentNodeIndex) {
                        line.classList.add('available'); // Glow valid paths
                    }

                    svg.appendChild(line);
                });
            });
        }
    }, 100);
}

function openCampfire() {
    const modal = document.getElementById('campfire-modal');
    modal.classList.remove('hidden');

    document.getElementById('btn-camp-heal').onclick = () => {
        const state = playerProfile.currentRunState;
        const healAmt = Math.floor(state.maxHp * 0.3);
        state.hp = Math.min(state.maxHp, state.hp + healAmt);
        saveProfile();
        AudioManager.playSFX('hero_heal');
        showNotification(`Descansado! Curou ${healAmt} HP.`, "success");
        modal.classList.add('hidden');
        renderMapScreen();
    };

    document.getElementById('btn-camp-upgrade').onclick = () => {
        document.getElementById('camp-upgrade-container').classList.remove('hidden');
        const grid = document.getElementById('camp-deck-grid');
        grid.innerHTML = '';

        playerProfile.currentRunState.deck.forEach((cardId, index) => {
            const card = getCardById(cardId);
            if (!card || card.cost === 0 || card.isUpgraded) return; // Can't upgrade 0 cost or already upgraded

            const wrapper = document.createElement('div');
            wrapper.innerHTML = createCardHTML(card);
            const cardEl = wrapper.firstElementChild;
            cardEl.onclick = () => {
                // Upgrade Logic: We create a virtual upgraded card ID by appending '_up'
                const upId = cardId + '_up';
                // If it doesn't exist in DB, we inject it virtually
                if (!getCardById(upId)) {
                    let upCard = JSON.parse(JSON.stringify(card));
                    upCard.id = upId;
                    upCard.cost -= 1;
                    upCard.name += '+';
                    upCard.isUpgraded = true;
                    CardDatabase.push(upCard);
                }

                playerProfile.currentRunState.deck[index] = upId;
                saveProfile();
                AudioManager.playSFX('ui_buy'); // anvil sound
                showNotification(`Carta ${card.name} melhorada!`, "success");
                modal.classList.add('hidden');
                document.getElementById('camp-upgrade-container').classList.add('hidden');
                renderMapScreen();
            };
            grid.appendChild(cardEl);
        });
    };
}


function openTowerShop() {
    const modal = document.getElementById('tower-shop-modal');
    modal.classList.remove('hidden');

    const state = playerProfile.currentRunState;
    document.getElementById('shop-rogue-gold').innerText = state.gold;

    // Generate 3 random cards to buy
    const grid = document.getElementById('tower-shop-cards');
    grid.innerHTML = '';

    for(let i=0; i<3; i++) {
        let pool = CardDatabase.filter(c => c.rarity === 'common' || c.rarity === 'uncommon');
        let card = pool[Math.floor(Math.random() * pool.length)];
        let cost = card.rarity === 'common' ? 30 : 60;

        const div = document.createElement('div');
        div.innerHTML = `
            ${createCardHTML(card)}
            <button class="buy-btn" style="width: 100%; margin-top: 10px;">Comprar ${cost}🪙</button>
        `;

        const btn = div.querySelector('button');
        btn.onclick = () => {
            if (state.gold >= cost) {
                state.gold -= cost;
                state.deck.push(card.id);
                document.getElementById('shop-rogue-gold').innerText = state.gold;
                AudioManager.playSFX('ui_buy');
                saveProfile();
                btn.disabled = true;
                btn.innerText = "Esgotado";
            } else {
                AudioManager.playSFX('ui_error');
                showNotification("Ouro insuficiente!", "error");
            }
        };
        grid.appendChild(div);
    }

    // Remove Card logic
    document.getElementById('btn-shop-remove').onclick = () => {
        if (state.gold >= 50) {
            document.getElementById('shop-remove-container').classList.remove('hidden');
            const remGrid = document.getElementById('shop-deck-grid');
            remGrid.innerHTML = '';
            state.deck.forEach((cardId, index) => {
                const card = getCardById(cardId);
                const wrapper = document.createElement('div');
                wrapper.innerHTML = createCardHTML(card);
                wrapper.firstElementChild.onclick = () => {
                    state.gold -= 50;
                    state.deck.splice(index, 1);
                    document.getElementById('shop-rogue-gold').innerText = state.gold;
                    AudioManager.playSFX('ui_error'); // Fire sound/burn
                    showNotification(`Carta removida!`, "info");
                    document.getElementById('shop-remove-container').classList.add('hidden');
                    saveProfile();
                };
                remGrid.appendChild(wrapper.firstElementChild);
            });
        } else {
            AudioManager.playSFX('ui_error');
            showNotification("Ouro insuficiente!", "error");
        }
    };

    document.getElementById('btn-leave-tower-shop').onclick = () => {
        modal.classList.add('hidden');
        renderMapScreen();
    };
}


function openEvent() {
    const modal = document.getElementById('event-modal');
    const title = document.getElementById('event-title');
    const desc = document.getElementById('event-desc');
    const choices = document.getElementById('event-choices');

    modal.classList.remove('hidden');
    choices.innerHTML = '';

    const events = [
        {
            title: "A Maçã Misteriosa",
            desc: "Você encontra uma maçã brilhante mas cheirando mal em um pedestal.",
            options: [
                { text: "Comer (Curar 10 HP, Ganha Maldição)", action: () => {
                    const state = playerProfile.currentRunState;
                    state.hp = Math.min(state.maxHp, state.hp + 10);
                    if (!getCardById('curse_01')) CardDatabase.push({id: 'curse_01', name: 'Maldição', type: CARD_TYPES.SPELL, cost: 2, desc: 'Não faz nada.', image: '☠️', target: 'none', effect: {}});
                    state.deck.push('curse_01');
                    AudioManager.playSFX('hero_heal');
                    showNotification("Curou 10 HP, mas o deck pesou...", "info");
                }},
                { text: "Ignorar", action: () => { showNotification("Você seguiu em frente.", "info"); } }
            ]
        },
        {
            title: "O Altar do Sacrifício",
            desc: "Um altar de sangue exige um tributo.",
            options: [
                { text: "Doar Sangue (-10 HP, +50 Ouro)", action: () => {
                    const state = playerProfile.currentRunState;
                    state.hp -= 10;
                    state.gold += 50;
                    AudioManager.playSFX('hero_damage');
                    showNotification("Dói, mas você está mais rico.", "info");
                }},
                { text: "Ignorar", action: () => { showNotification("Melhor não arriscar.", "info"); } }
            ]
        }
    ];

    const ev = events[Math.floor(Math.random() * events.length)];
    title.innerText = ev.title;
    desc.innerText = ev.desc;

    ev.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.innerText = opt.text;
        btn.onclick = () => {
            opt.action();
            saveProfile();
            modal.classList.add('hidden');
            renderMapScreen();
        };
        choices.appendChild(btn);
    });
}


function openDraft() {
    const overlay = document.getElementById('post-match-reward');
    overlay.classList.remove('hidden');

    const grid = document.getElementById('draft-reward-grid');
    grid.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        let pool = CardDatabase.filter(c => c.rarity !== 'mythic');
        let card = pool[Math.floor(Math.random() * pool.length)];

        const wrapper = document.createElement('div');
        wrapper.innerHTML = createCardHTML(card);
        wrapper.style.cursor = 'pointer';
        wrapper.firstElementChild.onclick = () => {
            playerProfile.currentRunState.deck.push(card.id);
            saveProfile();
            AudioManager.playSFX('card_draw');
            showNotification(`Adicionado ao deck: ${card.name}`, "success");
            overlay.classList.add('hidden');
            renderMapScreen();
            showScreen(screens.MAP);
        };
        grid.appendChild(wrapper.firstElementChild);
    }

    document.getElementById('btn-skip-draft').onclick = () => {
        overlay.classList.add('hidden');
        renderMapScreen();
        showScreen(screens.MAP);
    };
}


function updateUIProfile() {
    updateHUD();
    renderChestSlots();
    // Menu
    if(document.getElementById('menu-coins')) document.getElementById('menu-coins').innerText = playerProfile.coins;
    if(document.getElementById('menu-gems')) document.getElementById('menu-gems').innerText = playerProfile.gems;
    if(document.getElementById('menu-stardust')) document.getElementById('menu-stardust').innerText = playerProfile.stardust;
    if(document.getElementById('menu-tickets')) document.getElementById('menu-tickets').innerText = playerProfile.tickets;
    if(document.getElementById('menu-level')) document.getElementById('menu-level').innerText = playerProfile.level;
    if(document.getElementById('menu-rank')) document.getElementById('menu-rank').innerText = getRankString(playerProfile.elo);
    if(document.getElementById('menu-avatar')) document.getElementById('menu-avatar').innerText = playerProfile.activeAvatar;

    const xpReq = playerProfile.level * 100;
    if(document.getElementById('menu-xp-fill')) document.getElementById('menu-xp-fill').style.width = `${(playerProfile.xp / xpReq) * 100}%`;

    // Shop
    document.getElementById('shop-coins').innerText = playerProfile.coins;
    document.getElementById('shop-gems').innerText = playerProfile.gems;
    document.getElementById('shop-stardust').innerText = playerProfile.stardust;
    document.getElementById('shop-tickets').innerText = playerProfile.tickets;

    // Pity Timer display
    const pityEl = document.getElementById('pity-timer-display');
    if(pityEl) {
        pityEl.innerText = `Sorte Acumulada: ${playerProfile.pityTimer}/10 (Ao chegar em 10, próximo pacote garante Épica+)`;
    }

    // Play Modes
    document.getElementById('adventure-progress-text').innerText = `Progresso: ${playerProfile.adventureProgress}/5`;
}



function showNotification(message, type = "info") {
    const container = document.getElementById('notification-container');
    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.innerText = message;
    container.appendChild(notif);

    setTimeout(() => {
        notif.style.animation = 'slideUpFade 0.5s reverse forwards';
        setTimeout(() => notif.remove(), 500);
    }, 3000);
}

function createCardHTML(card, showBack = false) {
    if (!card) return '';
    if (showBack) {
        return `<div class="card pack-card-hidden"></div>`;
    }

    let tribesHTML = '';
    if (card.tribes && card.tribes.length > 0) {
        tribesHTML = `<div class="card-tribes">${card.tribes.join(', ')}</div>`;
        const mainTribe = card.tribes[0];
        let tIcon = '❓';
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
        tribesHTML += `<div class="tribe-icon" title="${mainTribe}">${tIcon}</div>`;
    }

    let statsHTML = '';
    let costHTML = `<div class="card-cost">${card.cost}</div>`;

    if (currentMatchMode === 'roguelike') RelicManager.triggerPlayCard(card);

    AudioManager.playSFX('card_play');
    if (card.type === CARD_TYPES.TROOP) {
        const displayAtk = card.atk !== undefined ? card.atk : card.baseAtk;
        const displayHp = card.hp !== undefined ? card.hp : card.baseHp;

        let atkStyle = '';
        let hpStyle = '';
        if (card.baseStatsSet) {
            if (card.atk > card.baseAtk) atkStyle = 'color: #f1c40f; text-shadow: 0 0 5px #f1c40f;';
            if (card.hp > card.baseHp) hpStyle = 'color: #2ecc71; text-shadow: 0 0 5px #2ecc71;';
        }

        statsHTML = `
            <div class="card-stats">
                <span class="card-atk" style="${atkStyle}">⚔️ ${displayAtk}</span>
                <span class="card-hp" style="${hpStyle}">❤️ ${displayHp}</span>
            </div>
        `;
    } else if (card.type === CARD_TYPES.SPELL) {
        costHTML = `<div class="card-cost" style="background:#8e44ad; border-color:#9b59b6">${card.cost}</div>`;
    } else if (card.type === CARD_TYPES.ENVIRONMENT) {
        costHTML = `<div class="card-cost" style="background:#2ecc71; border-color:#27ae60">${card.cost}</div>`;
    } else if (card.type === CARD_TYPES.SECRET) {
        costHTML = `<div class="card-cost" style="background:#e74c3c; border-color:#c0392b">${card.cost}</div>`;
    }

    let keywordsHTML = '';
    if (card.keywords) {
        if(card.keywords.includes('escudo')) keywordsHTML += '🛡️';
        if(card.keywords.includes('veneno')) keywordsHTML += '☠️';
        if(card.keywords.includes('necromancia')) keywordsHTML += '🧟';
    }

    let extraClasses = '';
    if (card.hasAuraBuff) extraClasses += ' has-aura';

    return `
        <div class="card ${extraClasses}" data-id="${card.id}" data-rarity="${card.rarity}" data-type="${card.type}">
            ${costHTML}
            <div class="card-name">${card.name} ${keywordsHTML}</div>
            ${tribesHTML}
            <div class="card-image">${card.image}</div>
            <div class="card-desc">${card.desc}</div>
            ${statsHTML}
        </div>
    `;
}


function createParticles(element, color) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.background = color;
        particle.style.borderRadius = '50%';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';

        const angle = Math.random() * Math.PI * 2;
        const speed = 5 + Math.random() * 10;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        document.body.appendChild(particle);

        let op = 1;
        const anim = setInterval(() => {
            const currentLeft = parseFloat(particle.style.left);
            const currentTop = parseFloat(particle.style.top);
            particle.style.left = currentLeft + vx + 'px';
            particle.style.top = currentTop + vy + 'px';
            op -= 0.05;
            particle.style.opacity = op;

            if (op <= 0) {
                clearInterval(anim);
                particle.remove();
            }
        }, 30);
    }
}

function renderDailyDeals() {
    const container = document.getElementById('daily-deals-container');
    container.innerHTML = '';

    // Generate 3 random cards for direct purchase
    for (let i = 0; i < 3; i++) {
        let rarityToGen = RARITIES.COMMON;
        const roll = Math.random();
        if (roll > 0.9) rarityToGen = RARITIES.EPIC;
        else if (roll > 0.6) rarityToGen = RARITIES.RARE;
        else if (roll > 0.3) rarityToGen = RARITIES.UNCOMMON;

        const pool = CardDatabase.filter(c => c.rarity === rarityToGen);
        const card = pool[Math.floor(Math.random() * pool.length)];

        let cost = 100;
        if (rarityToGen === RARITIES.UNCOMMON) cost = 250;
        if (rarityToGen === RARITIES.RARE) cost = 500;
        if (rarityToGen === RARITIES.EPIC) cost = 1000;

        const div = document.createElement('div');
        div.className = 'shop-item';
        div.innerHTML = `
            ${createCardHTML(card)}
            <button class="buy-btn" style="margin-top:10px; width:100%" data-id="${card.id}" data-cost="${cost}">Comprar ${cost}💰</button>
        `;

        div.querySelector('button').addEventListener('click', (e) => {
            const btn = e.target;
            const cId = btn.dataset.id;
            const cCost = parseInt(btn.dataset.cost);

            if (playerProfile.coins >= cCost) {
                playerProfile.coins -= cCost;
                if (!playerProfile.collection[cId]) playerProfile.collection[cId] = 0;
                playerProfile.collection[cId]++;
                saveProfile();
                showNotification(`Comprou ${getCardById(cId).name}!`, "success");
                btn.disabled = true;
                btn.innerText = "Comprado";
            } else {
                showNotification("Moedas insuficientes!", "error");
            }
        });

        container.appendChild(div);
    }
}


function renderAvatars() {
    const container = document.getElementById('avatars-container');
    container.innerHTML = '';

    const availableAvatars = [
        { icon: '🧙‍♂️', cost: 0 }, { icon: '🧝‍♀️', cost: 100 }, { icon: '🧛‍♂️', cost: 200 },
        { icon: '🧟', cost: 200 }, { icon: '🤖', cost: 300 }, { icon: '👽', cost: 500 }
    ];

    availableAvatars.forEach(av => {
        const div = document.createElement('div');
        div.className = 'shop-item';
        const isOwned = playerProfile.unlockedAvatars.includes(av.icon);
        const isEquipped = playerProfile.activeAvatar === av.icon;

        let btnHTML = '';
        if (isEquipped) {
            btnHTML = `<button disabled>Equipado</button>`;
        } else if (isOwned) {
            btnHTML = `<button class="equip-avatar-btn" data-icon="${av.icon}">Equipar</button>`;
        } else {
            btnHTML = `<button class="buy-avatar-btn" data-icon="${av.icon}" data-cost="${av.cost}">Comprar ${av.cost}💎</button>`;
        }

        div.innerHTML = `
            <div style="font-size: 4rem;">${av.icon}</div>
            ${btnHTML}
        `;

        container.appendChild(div);
    });

    document.querySelectorAll('.buy-avatar-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const icon = e.target.dataset.icon;
            const cost = parseInt(e.target.dataset.cost);
            if (playerProfile.gems >= cost) {
                playerProfile.gems -= cost;
                playerProfile.unlockedAvatars.push(icon);
                playerProfile.activeAvatar = icon;
                saveProfile();
                renderAvatars();
                showNotification("Avatar comprado e equipado!", "success");
            } else {
                showNotification("Gemas insuficientes!", "error");
            }
        });
    });

    document.querySelectorAll('.equip-avatar-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            playerProfile.activeAvatar = e.target.dataset.icon;
            saveProfile();
            renderAvatars();
        });
    });
}


function renderCollection() {
    const grid = document.getElementById('collection-grid');
    grid.innerHTML = '';

    // Sort by cost, then rarity
    const sortedDB = [...CardDatabase].sort((a, b) => {
        if (a.cost !== b.cost) return a.cost - b.cost;
        const rVal = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5, mythic: 6 };
        return rVal[b.rarity] - rVal[a.rarity];
    });

    // M6: Add Hero Selector at the top of Collection
    let heroSelectorHTML = `
        <div style="width:100%; text-align:center; margin-bottom: 15px;">
            <label style="color:#f1c40f; font-weight:bold; margin-right:10px;">Líder do Deck:</label>
            <select id="hero-select" style="padding:5px; background:#16213e; color:white; border: 1px solid #f1c40f;">
                <option value="mago" ${playerProfile.hero === 'mago' ? 'selected' : ''}>🧙‍♂️ Mago Supremo</option>
                <option value="cavaleiro" ${playerProfile.hero === 'cavaleiro' ? 'selected' : ''}>🛡️ Cavaleiro Real</option>
                <option value="vampiro" ${playerProfile.hero === 'vampiro' ? 'selected' : ''}>🧛‍♂️ Lorde Vampiro</option>
            </select>
        </div>
    `;
    // Prepend safely
    const oldSelector = document.getElementById('hero-select-container');
    if(oldSelector) oldSelector.remove();

    const selectorContainer = document.createElement('div');
    selectorContainer.id = 'hero-select-container';
    selectorContainer.innerHTML = heroSelectorHTML;
    grid.parentNode.insertBefore(selectorContainer, grid);

    document.getElementById('hero-select').addEventListener('change', (e) => {
        playerProfile.hero = e.target.value;
        saveProfile();
        showNotification("Herói atualizado!", "success");
    });

    sortedDB.forEach(card => {
        const count = playerProfile.collection[card.id] || 0;

        if (!isForgeMode && count === 0) return; // Hide unowned if not forging

        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.innerHTML = createCardHTML(card);

        // Count badge
        const badge = document.createElement('div');
        badge.style.position = 'absolute';
        badge.style.top = '-10px';
        badge.style.right = '-10px';
        badge.style.background = count > 0 ? '#2ecc71' : '#e74c3c';
        badge.style.color = 'white';
        badge.style.padding = '5px 10px';
        badge.style.borderRadius = '50%';
        badge.style.fontWeight = 'bold';
        badge.style.zIndex = '10';
        badge.innerText = `x${count}`;
        wrapper.appendChild(badge);

        if (count === 0) {
            wrapper.firstElementChild.style.filter = 'grayscale(100%) opacity(0.5)';
        }

        wrapper.firstElementChild.addEventListener('click', () => {
            if (isForgeMode) {
                openForgeModal(card, count);
            } else {
                if (count > 0) {
                    addCardToDeck(card.id);
                }
            }
        });

        grid.appendChild(wrapper);
    });
}


function openForgeModal(card, count) {
    selectedCardForForge = card;
    const modal = document.getElementById('forge-modal');
    const preview = document.getElementById('forge-card-preview');
    const title = document.getElementById('forge-title');
    const desc = document.getElementById('forge-desc');
    const btnConfirm = document.getElementById('btn-confirm-forge');

    preview.innerHTML = createCardHTML(card);
    modal.classList.remove('hidden');

    // Costs based on rarity
    const costs = {
        common: { craft: 40, dust: 5 },
        uncommon: { craft: 100, dust: 20 },
        rare: { craft: 400, dust: 100 },
        epic: { craft: 1600, dust: 400 },
        legendary: { craft: 3200, dust: 800 },
        mythic: { craft: 5000, dust: 1500 }
    };

    const cost = costs[card.rarity];

    if (count > 0) {
        title.innerText = "Desencantar Carta";
        title.style.color = "#e74c3c";
        desc.innerText = `Você possui ${count} cópias. Desencantar para ganhar ${cost.dust} ✨?`;
        btnConfirm.innerText = `Desencantar (+${cost.dust} ✨)`;
        btnConfirm.onclick = () => {
            playerProfile.collection[card.id]--;
            playerProfile.stardust += cost.dust;
            // Remove from deck if necessary
            const deckCount = playerProfile.deck.filter(id => id === card.id).length;
            if (deckCount > playerProfile.collection[card.id]) {
                const idx = playerProfile.deck.indexOf(card.id);
                if (idx > -1) playerProfile.deck.splice(idx, 1);
            }
            saveProfile();
            renderCollection();
            renderDeck();
            modal.classList.add('hidden');
            showNotification(`Desencantou ${card.name}!`, "info");
        };
    } else {
        title.innerText = "Forjar Carta";
        title.style.color = "#2ecc71";
        desc.innerText = `Custa ${cost.craft} ✨ para forjar esta carta. Você tem ${playerProfile.stardust} ✨.`;
        btnConfirm.innerText = `Forjar (-${cost.craft} ✨)`;
        btnConfirm.onclick = () => {
            if (playerProfile.stardust >= cost.craft) {
                playerProfile.stardust -= cost.craft;
                playerProfile.collection[card.id] = 1;
                saveProfile();
                renderCollection();
                modal.classList.add('hidden');
                showNotification(`Forjou ${card.name}!`, "success");
            } else {
                showNotification("Pó Estelar Insuficiente!", "error");
            }
        };
    }
}


function renderDeck() {
    const grid = document.getElementById('deck-grid');
    grid.innerHTML = '';

    document.getElementById('deck-count').innerText = `${playerProfile.deck.length}/40 Cartas`;

    // Sort deck for display
    const sortedDeck = [...playerProfile.deck].sort((a, b) => {
        const cardA = getCardById(a);
        const cardB = getCardById(b);
        if(!cardA || !cardB) return 0;
        if (cardA.cost !== cardB.cost) return cardA.cost - cardB.cost;
        return cardA.name.localeCompare(cardB.name);
    });

    sortedDeck.forEach((cardId, i) => {
        const card = getCardById(cardId);
        if(!card) return;
        const wrapper = document.createElement('div');
        wrapper.innerHTML = createCardHTML(card);
        const cardEl = wrapper.firstElementChild;
        cardEl.classList.add('in-deck');

        cardEl.addEventListener('click', () => removeCardFromDeck(i));

        grid.appendChild(cardEl);
    });
}

function renderQuests() {
    const container = document.getElementById('quests-container');
    container.innerHTML = '';

    playerProfile.quests.forEach(q => {
        const div = document.createElement('div');
        div.className = `quest-item ${q.completed ? 'completed' : ''}`;
        div.innerHTML = `
            <div>
                <h4>${q.desc}</h4>
                <div style="font-size: 0.8rem; margin-top: 5px;">Progresso: ${q.progress}/${q.target}</div>
            </div>
            <div style="font-weight: bold; color: #f1c40f">
                ${q.completed ? 'COMPLETO' : `Recompensa: ${q.reward.amount} ${q.reward.type}`}
            </div>
        `;
        container.appendChild(div);
    });
}


function renderAchievements() {
    const container = document.getElementById('achievements-container');
    container.innerHTML = '';

    playerProfile.achievements.forEach(a => {
        const div = document.createElement('div');
        div.className = `quest-item ${a.completed ? 'completed' : ''}`;

        const rewardText = a.reward.type === 'avatar' ? `Avatar ${a.reward.value}` : `${a.reward.amount} ${a.reward.type}`;

        div.innerHTML = `
            <div>
                <h4>${a.desc}</h4>
                <div style="font-size: 0.8rem; margin-top: 5px;">Progresso: ${a.progress}/${a.target}</div>
            </div>
            <div style="font-weight: bold; color: #f1c40f">
                ${a.completed ? 'COMPLETO' : `Recompensa: ${rewardText}`}
            </div>
        `;
        container.appendChild(div);
    });
}

function useHeroPower() {
    if (!gameState.isPlayerTurn || gameState.player.heroUsed) return;

    const p_hero = HEROES[playerProfile.hero] || HEROES.MAGO;
    const cost = p_hero.powerCost;

    if (gameState.player.credits + gameState.player.battery < cost) {
        showNotification("Energia Insuficiente!", "error");
        return;
    }

    // Deduct cost
    let remainingCost = cost;
    if (gameState.player.credits >= remainingCost) {
        gameState.player.credits -= remainingCost;
    } else {
        remainingCost -= gameState.player.credits;
        gameState.player.credits = 0;
        gameState.player.battery -= remainingCost;
    }

    gameState.player.heroUsed = true;


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

    } else if (p_hero.id === 'cavaleiro') {
        gameState.player.maxHp += 2;
        gameState.player.hp += 2;
        showNotification("Poder do Cavaleiro: +2 HP Máximo!", "info");
        updateBattleUI();
    } else if (p_hero.id === 'vampiro') {
        triggerDamageAnimation('player', null, 'opponent', null, 1);
        setTimeout(() => {
            gameState.opponent.hp -= 1;
            gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + 1);
            showNotification("Poder do Vampiro: Roubou 1 de HP!", "info");
            checkWinCondition();
            updateBattleUI();
        }, 500);
    }

    updateBattleUI();
}


function renderBoard(side) {
    for (let i = 0; i < 5; i++) {
        const slot = document.getElementById(`${side === 'opponent' ? 'opp' : 'player'}-slot-${i}`);
        slot.innerHTML = '';
        slot.className = `slot ${side}-slot`;

        const card = gameState[side].board[i];
        if (card) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = createCardHTML(card);
            const cardEl = wrapper.firstElementChild;

            if (side === 'player' && !card.exhausted && gameState.isPlayerTurn && card.atk > 0 && !(card.keywords && card.keywords.includes('defensor'))) {
                cardEl.classList.add('can-attack');
                cardEl.addEventListener('click', () => prepareAttack(i));
            }
            if (card.exhausted) {
                cardEl.classList.add('exhausted');
            }

            slot.appendChild(cardEl);
        } else {
            if (side === 'player' && gameState.isPlayerTurn && gameState.selectedCardIndex !== null) {
                const selectedCard = gameState.player.hand[gameState.selectedCardIndex];
                if (selectedCard.type === CARD_TYPES.TROOP || selectedCard.type === CARD_TYPES.ENVIRONMENT) {
                    slot.classList.add('drop-target');
                    slot.onclick = () => playCard(i);
                }
            }
        }

        // Render Environments
        if (side === 'player') {
            const env = gameState.environments[i];
            const envEl = document.getElementById(`env-overlay-${i}`);
            if (env) {
                envEl.className = `env-overlay active ${env.envType}`;
            } else {
                envEl.className = 'env-overlay';
            }
        }
    }
}


function enableSpellTargeting(card) {
    // Very simplified targeting: just glow all enemies
    if (card.target.includes('enemy')) {
        document.querySelectorAll('.opponent-slot .card').forEach(c => {
            c.classList.add('targetable');
            c.onclick = (e) => {
                e.stopPropagation();
                const lane = c.parentElement.dataset.lane;
                playCard(lane, 'player');
                document.querySelectorAll('.card').forEach(cc => {
                    cc.classList.remove('targetable');
                    cc.onclick = null;
                });
            };
        });
        document.querySelector('.bot-avatar').classList.add('targetable');
        document.querySelector('.bot-avatar').onclick = () => {
            playCard(null, 'player');
            document.querySelectorAll('.targetable').forEach(el => {
                el.classList.remove('targetable');
                el.onclick = null;
            });
        };
    }
}


function prepareAttack(laneIndex) {
    gameState.attackingCardIndex = laneIndex;

    // Highlight valid targets
    document.querySelectorAll('.targetable').forEach(el => el.classList.remove('targetable'));

    const oppBoard = gameState.opponent.board;
    // Direct lane combat rule: must attack blocker if exists
    if (oppBoard[laneIndex]) {
        const slot = document.getElementById(`opp-slot-${laneIndex}`);
        slot.firstElementChild.classList.add('targetable');
        slot.firstElementChild.onclick = (e) => {
            e.stopPropagation();
            executeAttack(laneIndex, laneIndex);
        };
    } else {
        // Can attack hero directly
        const botAvatar = document.querySelector('.bot-avatar');
        botAvatar.classList.add('targetable');
        botAvatar.onclick = () => executeAttack(laneIndex, null);
    }
}


function executeAttack(attackerIdx, defenderIdx) {
    const attackerCard = gameState.player.board[attackerIdx];
    attackerCard.exhausted = true;

    // Animate attack
    const attackerEl = document.querySelector(`#player-slot-${attackerIdx} .card`);
    attackerEl.classList.add('attack-animation');

    // Secret trigger logic
    const secretIdx = gameState.opponent.secrets.findIndex(s => s.trigger === 'on_attacked');
    if (secretIdx > -1) {
        const secret = gameState.opponent.secrets[secretIdx];
        if (secret.effect.killAttacker) {
            attackerCard.hp = 0;
            showNotification(`SEGREDO: Armadilha destruiu seu ${attackerCard.name}!`, "error");
            gameState.opponent.secrets.splice(secretIdx, 1);
            checkDeadCards();
            updateBattleUI();
            return;
        }
    }

    setTimeout(() => {
        if (defenderIdx !== null) {
            const defenderCard = gameState.opponent.board[defenderIdx];

            // Check shield
            let pDmg = attackerCard.atk;
            triggerEndlessMutationEvent('attack', attackerCard);
            if (currentMatchMode === 'roguelike') pDmg = RelicManager.checkAttackDamage(pDmg, defenderCard);

            let oDmg = defenderCard.atk;
            triggerEndlessMutationEvent('attack', defenderCard);

            if (defenderCard.keywords && defenderCard.keywords.includes('escudo')) {
                defenderCard.keywords = defenderCard.keywords.filter(k => k !== 'escudo');
                pDmg = 0;
            }
            if (attackerCard.keywords && attackerCard.keywords.includes('escudo')) {
                attackerCard.keywords = attackerCard.keywords.filter(k => k !== 'escudo');
                oDmg = 0;
            }

            defenderCard.hp -= pDmg;
            AudioManager.playSFX('combat_hit');
            if (attackerCard.tribes && attackerCard.tribes.length > 0) {
                const mainTribe = attackerCard.tribes[0];
                if (mainTribe === TRIBES.ANIMAL) AudioManager.playSFX('sfx_tribe_animal');
                else if (mainTribe === TRIBES.MAGICO || mainTribe === TRIBES.MISTICO) AudioManager.playSFX('sfx_tribe_magic');
                else if (mainTribe === TRIBES.AQUATICO || mainTribe === TRIBES.NATUREZA || mainTribe === TRIBES.TERRENO) AudioManager.playSFX('sfx_tribe_weather');
                else if (mainTribe === TRIBES.FERRAMENTA || mainTribe === TRIBES.VEICULO || mainTribe === TRIBES.TECNOLOGIA) AudioManager.playSFX('sfx_tribe_metal');
                else if (mainTribe === TRIBES.COMIDA) AudioManager.playSFX('sfx_tribe_food');
            }
            attackerCard.hp -= oDmg;

            triggerDamageAnimation('player', attackerIdx, 'opponent', defenderIdx, pDmg);
            if (oDmg > 0) triggerDamageAnimation('opponent', defenderIdx, 'player', attackerIdx, oDmg);

            // Poison logic
            if (attackerCard.keywords && attackerCard.keywords.includes('veneno') && pDmg > 0) defenderCard.hp = 0;
            if (defenderCard.keywords && defenderCard.keywords.includes('veneno') && oDmg > 0) attackerCard.hp = 0;

            if (attackerCard.lifesteal) {
                gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + attackerCard.lifesteal);
                triggerHealAnimation('player', null, attackerCard.lifesteal);
            }

            document.querySelector(`#opp-slot-${defenderIdx} .card`).classList.add('collision-flash');

        } else {
            // Secret check for hero attack
            const heroSecretIdx = gameState.opponent.secrets.findIndex(s => s.trigger === 'on_hero_attacked');
            if (heroSecretIdx > -1) {
                const sct = gameState.opponent.secrets[heroSecretIdx];
                gameState.opponent.secrets.splice(heroSecretIdx, 1);
                showNotification(`SEGREDO REVELADO: ${sct.name}!`, "error");

                if (sct.effect.preventDamage) {
                    if (sct.effect.summon) {
                        gameState.opponent.board[attackerIdx] = JSON.parse(JSON.stringify(getCardById(sct.effect.summon)));
                    }
                    updateBattleUI();
                    return;
                }
            }

            gameState.opponent.hp -= attackerCard.atk;
            triggerDamageAnimation('player', attackerIdx, 'opponent', null, attackerCard.atk);

            if (attackerCard.lifesteal) {
                gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + attackerCard.lifesteal);
                triggerHealAnimation('player', null, attackerCard.lifesteal);
            }

            document.querySelector('.bot-avatar').classList.add('screen-shake');
            setTimeout(() => document.querySelector('.bot-avatar').classList.remove('screen-shake'), 400);

            matchStats.damageDealt += attackerCard.atk;
            updateQuests('damage', attackerCard.atk);
        }

        attackerEl.classList.remove('attack-animation');
        document.querySelectorAll('.targetable').forEach(el => {
            el.classList.remove('targetable');
            el.onclick = null;
        });

        checkDeadCards();
        checkWinCondition();
        updateBattleUI();

    }, 200);
}


function triggerDamageAnimation(attackerSide, attackerIdx, defenderSide, defenderIdx, damageAmount) {
    if (damageAmount <= 0) return;

    const gameContainer = document.getElementById('battle-screen');

    // Brutal screen shake on damage >= 5
    if (damageAmount >= 5) {
        const appEl = document.getElementById('game-app') || document.body;
        appEl.classList.add('screen-shake-brutal');
        setTimeout(() => appEl.classList.remove('screen-shake-brutal'), 400);
    }

    const dmgEl = document.createElement('div');
    dmgEl.className = 'damage-number';
    dmgEl.innerText = `-${damageAmount}`;

    // Dynamic X/Y arc calculation
    const dirX = (Math.random() - 0.5) * 100;
    dmgEl.style.setProperty('--dir-x', `${dirX}px`);

    let targetEl;
    if (defenderIdx !== null) {
        targetEl = document.getElementById(`${defenderSide === 'opponent' ? 'opp' : 'player'}-slot-${defenderIdx}`);
    } else {
        targetEl = document.querySelector(defenderSide === 'opponent' ? '.bot-avatar' : '#battle-player-avatar');
    }

    if (currentMatchMode === 'roguelike' && defenderIdx === null && defenderSide === 'player') {
        damageAmount = RelicManager.checkDamage(damageAmount, true);
        if (damageAmount === 0) return;
    }
    if (defenderIdx === null) AudioManager.playSFX('hero_damage');

    if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        dmgEl.style.left = (rect.left + rect.width/2 - 20) + 'px';
        dmgEl.style.top = (rect.top + rect.height/2 - 20) + 'px';
        gameContainer.appendChild(dmgEl);

        // M7: Explicit cleanup
        setTimeout(() => dmgEl.remove(), 1200);
    }
}


function triggerHealAnimation(side, index, amount) {
    if (amount <= 0) return;
    const gameContainer = document.getElementById('battle-screen');


    AudioManager.playSFX('hero_heal');
    const healEl = document.createElement('div');
    healEl.className = 'heal-number';
    healEl.innerText = `+${amount}`;

    const dirX = (Math.random() - 0.5) * 50;
    healEl.style.setProperty('--dir-x', `${dirX}px`);

    let targetEl = index !== null ?
        document.getElementById(`${side === 'opponent' ? 'opp' : 'player'}-slot-${index}`) :
        document.querySelector(side === 'opponent' ? '.bot-avatar' : '#battle-player-avatar');

    if (targetEl) {
        targetEl.appendChild(healEl);
        setTimeout(() => healEl.remove(), 1000);
    }
}

setInterval(() => {
    if (!playerProfile.chests) return;
    const now = Date.now();
    let updated = false;
    for(let i=0; i<4; i++) {
        const chest = playerProfile.chests[i];
        if (chest && chest.unlockTime) {
            const slotEl = document.querySelector(`#chest-slot-${i} .chest-timer`);
            if (slotEl) {
                const diff = chest.unlockTime - now;
                if (diff <= 0) {
                    slotEl.innerText = "PRONTO!";
                    slotEl.style.color = "#2ecc71";
                } else {
                    const sec = Math.ceil(diff / 1000);
                    const m = Math.floor(sec / 60);
                    const s = sec % 60;
                    slotEl.innerText = `${m}m ${s}s`;
                }
            }
        }
    }
}, 1000);


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

function triggerBotEmote(type) {
    const emoteEl = document.getElementById('bot-emote');
    if (!emoteEl) return;

    let emote = '😈';
    if (type === 'greeting') emote = ['Bem vindo...', 'PREPARE-SE!', '🤖 beep boop', '😎'].sort(() => 0.5 - Math.random())[0];
    if (type === 'calculating') emote = '🤔...';
    if (type === 'lethal') emote = '☠️ ADEUS!';
    if (type === 'damage') emote = ['Ouch!', 'Isso doeu...', '😡'].sort(() => 0.5 - Math.random())[0];

    emoteEl.innerText = emote;
    emoteEl.classList.remove('hidden');

    setTimeout(() => {
        emoteEl.classList.add('hidden');
    }, 2500);
}

function openEndlessDecisionModal() {
    const modal = document.getElementById('endless-decision-modal');
    if (!modal) return;

    modal.classList.remove('hidden');

    const s = playerProfile.endlessState;
    if (!s) return;

    document.getElementById('decision-wave').innerText = s.currentWave;
    document.getElementById('decision-loot').innerText = s.loot;
    document.getElementById('btn-flee-loot').innerText = s.loot;

    document.getElementById('btn-endless-flee').onclick = () => {
        AudioManager.playSFX('ui_buy');
        playerProfile.coins += s.loot;
        showNotification(`Você fugiu com o saque! +${s.loot} Moedas`, "success");

        saveEndlessLeaderboard(s.currentWave, s.dominantTribe, s.loot);

        playerProfile.endlessState = null;
        saveProfile();

        modal.classList.add('hidden');
        showScreen(screens.LEADERBOARD);
    };

    document.getElementById('btn-endless-continue').onclick = () => {
        AudioManager.playSFX('ui_click');
        s.currentWave++;

        // Sorteia nova mutação
        if (typeof ENDLESS_MUTATIONS !== 'undefined' && ENDLESS_MUTATIONS.length > 0) {
            s.activeMutation = ENDLESS_MUTATIONS[Math.floor(Math.random() * ENDLESS_MUTATIONS.length)];
            showNotification(`MUTAÇÃO GLOBAL ATIVA: ${s.activeMutation.name}`, "error");
        }

        saveProfile();
        modal.classList.add('hidden');

        startMatchmaking(false);
    };
}

function setupBottomNav() {
    const navItems = {
        'nav-shop': screens.SHOP,
        'nav-collection': screens.COLLECTION,
        'nav-home': screens.MENU,
        'nav-quests': 'quests-overlay', // Reusing old overlay ID or creating new screen
        'nav-guild': 'guild-screen' // Assumes guild screen exists or will handle gracefully
    };

    Object.keys(navItems).forEach(navId => {
        const el = document.getElementById(navId);
        if(el) {
            el.addEventListener('click', () => {
                // Remove active from all nav items
                document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
                // Add active to clicked
                el.classList.add('active');

                const targetScreen = navItems[navId];

                // If it's an overlay (like quests), open it on top
                if (targetScreen === 'quests-overlay') {
                    renderQuests();
                    document.getElementById('quests-overlay').classList.remove('hidden');
                    return;
                } else if (targetScreen === 'guild-screen') {
                    // Logic for guild if exists
                    const guildEl = document.getElementById('guild-overlay');
                    if(guildEl) guildEl.classList.remove('hidden');
                    return;
                }

                // Otherwise do slide transition
                showScreenSPA(targetScreen);
            });
        }
    });
}


function showScreenSPA(screenId) {
    // Closes all overlays first
    document.querySelectorAll('.overlay').forEach(el => el.classList.add('hidden'));

    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => {
        if (screen.id === screenId) {
            screen.classList.add('active');
            screen.classList.remove('slide-left');
        } else {
            if (screen.classList.contains('active')) {
                screen.classList.add('slide-left');
                setTimeout(() => {
                    screen.classList.remove('active');
                    screen.classList.remove('slide-left');
                }, 400); // Matches CSS transition time
            }
        }
    });
}


function updateHUD() {
    document.getElementById('hud-level-val').innerText = playerProfile.stats.level || 1;

    // Update XP Bar (Requires a small calc if we use the old logic)
    const xpNeeded = (playerProfile.stats.level || 1) * 100;
    const progress = Math.min(100, ((playerProfile.stats.xp || 0) / xpNeeded) * 100);
    document.getElementById('hud-xp-fill').style.width = `${progress}%`;

    document.getElementById('hud-coins').innerText = playerProfile.coins;
    document.getElementById('hud-gems').innerText = playerProfile.gems;
    document.getElementById('hud-dust').innerText = playerProfile.stardust;

    // Also update giant avatar
    document.getElementById('lobby-avatar').innerText = playerProfile.activeAvatar || '🧙‍♂️';

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

}


function renderChestSlots() {
    // Assuming playerProfile.chests = [{id: 'silver', unlockTime: null}, null, null, null]
    if (!playerProfile.chests) {
        playerProfile.chests = [null, null, null, null];
    }

    for(let i = 0; i < 4; i++) {
        const slotEl = document.getElementById(`chest-slot-${i}`);
        if(!slotEl) continue;

        const chest = playerProfile.chests[i];
        if (chest) {
            slotEl.classList.add('filled');
            slotEl.innerHTML = `📦<div class="chest-timer">Abrir</div>`;
            slotEl.onclick = () => {
                // Dummy open logic for now
                playerProfile.chests[i] = null;
                playerProfile.coins += 50;
                saveProfile();
                showNotification("Baú Aberto! +50 🪙", "success");
                renderChestSlots();
            };
        } else {
            slotEl.classList.remove('filled');
            slotEl.innerHTML = `Vazio`;
            slotEl.onclick = null;
        }
    }
}