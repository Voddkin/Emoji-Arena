import re

with open("index.html", "r") as f:
    html = f.read()

# I noticed my previous scripts targeted strings that were already deleted when I completely wiped the old HTML to rebuild the game app. Let's fix the root variables and remaining english texts inside the NEW layout.

translations = {
    '<html lang="en">': '<html lang="pt-BR">',
    '<title>Card Wars: Ultimate Edition</title>': '<title>Emoji Arena</title>',
    '<h2>Mega Shop</h2>': '<h2>Mega Loja</h2>',
    '>Packages<': '>Pacotes<',
    '>Daily Deals<': '>Ofertas Diárias<',
    '>Cosmetics<': '>Cosméticos<',
    '<h2>Card Collection & Forge</h2>': '<h2>Coleção e Forja</h2>',
    'Enter Forge Mode': 'Entrar na Forja',
    'Click a card to add/remove from deck.': 'Clique numa carta para adicionar/remover.',
    'Active Deck': 'Deck Ativo',
    'Your Cards': 'Suas Cartas',
    '>Close<': '>Fechar<',
    '<h2>Daily Quests</h2>': '<h2>Missões Diárias</h2>',
    '<h2>Settings</h2>': '<h2>Configurações</h2>',
    'Reset Save Data</button>': 'Apagar Progresso</button>',
    '<h2>Achievements & Trophies</h2>': '<h2>Troféus e Conquistas</h2>',
    'Unlock exclusive Avatars by completing challenges!': 'Desbloqueie Avatares exclusivos completando desafios!',
    '<h2>Forge Card</h2>': '<h2>Forjar Carta</h2>',
    'Cost: ': 'Custo: ',
    'Do you want to craft this card?': 'Deseja forjar esta carta?',
    '>Craft<': '>Forjar<',
    '>Cancel<': '>Cancelar<',
    'Return to Menu</button>': 'Voltar ao Menu</button>',
    '<h2>Pack Opened!</h2>': '<h2>Pacote Aberto!</h2>',
    'Back to Menu</button>': 'Voltar ao Menu</button>',
}

for eng, pt in translations.items():
    html = html.replace(eng, pt)

with open("index.html", "w") as f:
    f.write(html)
