import re

with open("index.html", "r") as f:
    html = f.read()

translations = {
    '<h2>Pack Opened!</h2>': '<h2>Pacote Aberto!</h2>',
    '<button class="tab-btn active" data-target="tab-packs">Packages</button>': '<button class="tab-btn active" data-target="tab-packs">Pacotes</button>',
    '<button class="tab-btn" data-target="tab-daily">Daily Deals</button>': '<button class="tab-btn" data-target="tab-daily">Ofertas Diárias</button>',
    '<p class="instruction-text">Choose a path for your next encounter.</p>': '<p class="instruction-text">Escolha um caminho para o seu próximo encontro.</p>',
    '<h2 id="event-title" style="color: #9b59b6;">Mystery Event</h2>': '<h2 id="event-title" style="color: #9b59b6;">Evento Misterioso</h2>',
    '<h2 style="color: #f1c40f;">Combat Reward</h2>': '<h2 style="color: #f1c40f;">Recompensa de Combate</h2>',
    '<button id="btn-skip-draft" class="danger-btn" style="margin-top: 30px;">Skip Reward</button>': '<button id="btn-skip-draft" class="danger-btn" style="margin-top: 30px;">Pular Recompensa</button>',
    '<h2 style="color: #e74c3c; text-shadow: 0 0 10px #c0392b;">The Chaos Tower</h2>': '<h2 style="color: #e74c3c; text-shadow: 0 0 10px #c0392b;">A Torre do Caos</h2>',
    '<button id="btn-abandon-run" class="btn-back">Abandon Run</button>': '<button id="btn-abandon-run" class="btn-back">Abandonar Run</button>',
    '<p>Choose ONE card to add to your Tower deck:</p>': '<p>Escolha UMA carta para adicionar ao seu deck da Torre:</p>',
    '<h2 style="color: #3498db;">Tower Merchant</h2>': '<h2 style="color: #3498db;">Mercador da Torre</h2>',
    '<p>What do you have to trade, traveler?</p>': '<p>O que você tem para trocar, viajante?</p>',
    '<h3>Cards for Sale</h3>': '<h3>Cartas à Venda</h3>',
    '<h3>Services</h3>': '<h3>Serviços</h3>',
    '<button id="btn-shop-remove" class="danger-btn" style="width: 100%;">🔥 Remove Card (50 🪙)</button>': '<button id="btn-shop-remove" class="danger-btn" style="width: 100%;">🔥 Remover Carta (50 🪙)</button>',
    '<button id="btn-leave-tower-shop" class="btn-back" style="position: relative; margin-top: 30px;">Leave Shop</button>': '<button id="btn-leave-tower-shop" class="btn-back" style="position: relative; margin-top: 30px;">Sair da Loja</button>',
    '<h2 style="color: #e67e22;">Campfire</h2>': '<h2 style="color: #e67e22;">Acampamento</h2>',
    '<p>The warmth of the fire comforts your soul. Choose an action:</p>': '<p>O calor do fogo conforta sua alma. Escolha uma ação:</p>',
    '<button id="btn-camp-heal" class="buy-btn" style="width: 100%; margin-bottom: 10px;">Rest (Heal 30% HP)</button>': '<button id="btn-camp-heal" class="buy-btn" style="width: 100%; margin-bottom: 10px;">Descansar (Cura 30% HP)</button>',
    '<button id="btn-camp-upgrade" class="buy-btn" style="background: #9b59b6; width: 100%; margin-bottom: 10px;">Forge (Upgrade 1 Card)</button>': '<button id="btn-camp-upgrade" class="buy-btn" style="background: #9b59b6; width: 100%; margin-bottom: 10px;">Forjar (Melhorar 1 Carta)</button>',
    '<button id="btn-leave-camp" class="btn-back" style="width: 100%;">Leave Camp</button>': '<button id="btn-leave-camp" class="btn-back" style="width: 100%;">Sair do Acampamento</button>',
    '<h3>Choose a card to upgrade (-1 Cost):</h3>': '<h3>Escolha a carta para melhorar (-1 Custo):</h3>',
    '<p style="font-size: 0.8rem; text-align: center;">Click a card below to destroy it:</p>': '<p style="font-size: 0.8rem; text-align: center;">Clique em uma carta abaixo para destruir:</p>',
}

for eng, pt in translations.items():
    html = html.replace(eng, pt)

with open("index.html", "w") as f:
    f.write(html)
