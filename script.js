const CARD_TYPES = {
    TROOP: 'troop',
    SPELL: 'spell',
    ENVIRONMENT: 'environment',
    SECRET: 'secret'
};

const RARITIES = {
    COMMON: 'common',
    UNCOMMON: 'uncommon',
    RARE: 'rare',
    EPIC: 'epic',
    LEGENDARY: 'legendary',
    MYTHIC: 'mythic'
};

const TRIBES = {
    NATUREZA: 'Natureza',
    URBANO: 'Urbano',
    ANIMAL: 'Animal',
    AQUATICO: 'Aquático',
    MAGICO: 'Mágico',
    FERRAMENTA: 'Ferramenta',
    COMIDA: 'Comida',
    VEICULO: 'Veículo',
    PROFISSAO: 'Profissão',
    TERRENO: 'Terreno',
    MISTICO: 'Místico',
    TECNOLOGIA: 'Tecnologia'
};

const HEROES = {
    MAGO: { id: 'mago', name: 'Mago Supremo', icon: '🧙‍♂️', hp: 30, powerCost: 2, desc: 'Causa 2 de dano a qualquer alvo.' },
    CAVALEIRO: { id: 'cavaleiro', name: 'Cavaleiro Real', icon: '🛡️', hp: 35, powerCost: 2, desc: 'Ganha +2 de Armadura (HP máximo).' },
    VAMPIRO: { id: 'vampiro', name: 'Lorde Vampiro', icon: '🧛‍♂️', hp: 25, powerCost: 2, desc: 'Rouba 1 de Vida do herói inimigo.' }
};

const CardDatabase = [
    // --- COMMONS (c_01 to c_20) ---
    { id: 'c_01', name: 'Gato de Rua', type: CARD_TYPES.TROOP, rarity: RARITIES.COMMON, cost: 1, atk: 1, hp: 2, desc: 'Ágil e furtivo.', image: '🐈', tribes: [TRIBES.ANIMAL, TRIBES.URBANO] },
    { id: 'c_02', name: 'Pombo', type: CARD_TYPES.TROOP, rarity: RARITIES.COMMON, cost: 1, atk: 2, hp: 1, desc: 'Domina os céus da cidade.', image: '🕊️', tribes: [TRIBES.ANIMAL, TRIBES.URBANO] },
    { id: 'c_03', name: 'Cão Guarda', type: CARD_TYPES.TROOP, rarity: RARITIES.COMMON, cost: 2, atk: 2, hp: 3, desc: 'O melhor amigo do homem.', image: '🐕', tribes: [TRIBES.ANIMAL] },
    { id: 'c_04', name: 'Maçã Curativa', type: CARD_TYPES.SPELL, rarity: RARITIES.COMMON, cost: 1, desc: 'Cura 3 de Vida de um aliado ou Herói.', image: '🍎', target: 'any_friendly', effect: { heal: 3 }, tribes: [TRIBES.COMIDA, TRIBES.NATUREZA] },
    { id: 'c_05', name: 'Pedra', type: CARD_TYPES.SPELL, rarity: RARITIES.COMMON, cost: 0, desc: 'Causa 1 de dano a um inimigo.', image: '🪨', target: 'any_enemy', effect: { damage: 1 }, tribes: [TRIBES.TERRENO] },
    { id: 'c_06', name: 'Sapo', type: CARD_TYPES.TROOP, rarity: RARITIES.COMMON, cost: 1, atk: 1, hp: 1, desc: 'Tem Veneno.', image: '🐸', keywords: ['veneno'], tribes: [TRIBES.ANIMAL, TRIBES.AQUATICO] },
    { id: 'c_07', name: 'Rato', type: CARD_TYPES.TROOP, rarity: RARITIES.COMMON, cost: 1, atk: 1, hp: 1, desc: 'Morre rápido, mas volta.', image: '🐀', keywords: ['necromancia'], tribes: [TRIBES.ANIMAL, TRIBES.URBANO] },
    { id: 'c_08', name: 'Carro Velho', type: CARD_TYPES.TROOP, rarity: RARITIES.COMMON, cost: 2, atk: 3, hp: 1, desc: 'Rápido mas frágil.', image: '🚗', tribes: [TRIBES.VEICULO, TRIBES.URBANO] },
    { id: 'c_09', name: 'Tijolo', type: CARD_TYPES.SPELL, rarity: RARITIES.COMMON, cost: 1, desc: 'Causa 2 de dano.', image: '🧱', target: 'any_enemy', effect: { damage: 2 }, tribes: [TRIBES.FERRAMENTA] },
    { id: 'c_10', name: 'Guarda-Chuva', type: CARD_TYPES.SPELL, rarity: RARITIES.COMMON, cost: 1, desc: 'Dá Escudo a uma tropa.', image: '☂️', target: 'troop_friendly', effect: { addKeyword: 'escudo' }, tribes: [TRIBES.FERRAMENTA] },
    { id: 'c_11', name: 'Árvore Jovem', type: CARD_TYPES.TROOP, rarity: RARITIES.COMMON, cost: 2, atk: 0, hp: 5, desc: 'Forte como madeira.', image: '🌳', tribes: [TRIBES.NATUREZA, TRIBES.TERRENO] },
    { id: 'c_12', name: 'Padeiro', type: CARD_TYPES.TROOP, rarity: RARITIES.COMMON, cost: 2, atk: 1, hp: 4, desc: 'Faz pão.', image: '👨‍🍳', tribes: [TRIBES.PROFISSAO, TRIBES.COMIDA] },
    { id: 'c_13', name: 'Fogo Fátuo', type: CARD_TYPES.TROOP, rarity: RARITIES.COMMON, cost: 1, atk: 2, hp: 1, desc: 'Espírito fraco.', image: '🔥', tribes: [TRIBES.MISTICO] },
    { id: 'c_14', name: 'Gota d\'Água', type: CARD_TYPES.SPELL, rarity: RARITIES.COMMON, cost: 1, desc: 'Cura 2 e compra 1 carta.', image: '💧', target: 'any_friendly', effect: { heal: 2, draw: 1 }, tribes: [TRIBES.AQUATICO] },
    { id: 'c_15', name: 'Vento Leve', type: CARD_TYPES.SPELL, rarity: RARITIES.COMMON, cost: 1, desc: 'Empurra uma tropa inimiga para a mão.', image: '💨', target: 'troop_enemy', effect: { bounce: true }, tribes: [TRIBES.NATUREZA] },
    { id: 'c_16', name: 'Cadeira', type: CARD_TYPES.TROOP, rarity: RARITIES.COMMON, cost: 1, atk: 1, hp: 2, desc: 'Apenas uma cadeira.', image: '🪑', tribes: [TRIBES.FERRAMENTA] },
    { id: 'c_17', name: 'Cogumelo', type: CARD_TYPES.TROOP, rarity: RARITIES.COMMON, cost: 1, atk: 1, hp: 1, desc: 'Veneno.', image: '🍄', keywords: ['veneno'], tribes: [TRIBES.NATUREZA] },
    { id: 'c_18', name: 'Cobra', type: CARD_TYPES.TROOP, rarity: RARITIES.COMMON, cost: 2, atk: 2, hp: 1, desc: 'Veneno.', image: '🐍', keywords: ['veneno'], tribes: [TRIBES.ANIMAL] },
    { id: 'c_19', name: 'Policial', type: CARD_TYPES.TROOP, rarity: RARITIES.COMMON, cost: 3, atk: 3, hp: 3, desc: 'Mantém a ordem.', image: '👮', tribes: [TRIBES.PROFISSAO, TRIBES.URBANO] },
    { id: 'c_20', name: 'Pá', type: CARD_TYPES.SPELL, rarity: RARITIES.COMMON, cost: 1, desc: 'Destrói um terreno/ambiente.', image: '⛏️', target: 'lane', effect: { clearEnv: true }, tribes: [TRIBES.FERRAMENTA] },

    // --- UNCOMMONS (u_01 to u_20) ---
    { id: 'u_01', name: 'Lobo', type: CARD_TYPES.TROOP, rarity: RARITIES.UNCOMMON, cost: 3, atk: 3, hp: 4, desc: 'Feroz.', image: '🐺', tribes: [TRIBES.ANIMAL, TRIBES.NATUREZA] },
    { id: 'u_02', name: 'Raio', type: CARD_TYPES.SPELL, rarity: RARITIES.UNCOMMON, cost: 2, desc: 'Causa 4 de dano.', image: '⚡', target: 'any_enemy', effect: { damage: 4 }, tribes: [TRIBES.MISTICO] },
    { id: 'u_03', name: 'Escudo de Madeira', type: CARD_TYPES.SPELL, rarity: RARITIES.UNCOMMON, cost: 2, desc: 'Dá +0/+3 e Escudo.', image: '🛡️', target: 'troop_friendly', effect: { buffHp: 3, addKeyword: 'escudo' }, tribes: [TRIBES.FERRAMENTA] },
    { id: 'u_04', name: 'Médico', type: CARD_TYPES.TROOP, rarity: RARITIES.UNCOMMON, cost: 3, atk: 1, hp: 4, desc: 'Grito de Guerra: Cura 3.', image: '👨‍⚕️', battlecry: { target: 'any_friendly', effect: { heal: 3 } }, tribes: [TRIBES.PROFISSAO] },
    { id: 'u_05', name: 'Bola de Neve', type: CARD_TYPES.SPELL, rarity: RARITIES.UNCOMMON, cost: 2, desc: 'Congela um inimigo (não ataca no próx. turno).', image: '❄️', target: 'troop_enemy', effect: { addKeyword: 'congelado' }, tribes: [TRIBES.MISTICO] },
    { id: 'u_06', name: 'Bomba', type: CARD_TYPES.SPELL, rarity: RARITIES.UNCOMMON, cost: 3, desc: 'Causa 3 de dano a todas as tropas.', image: '💣', target: 'all_troops', effect: { damage: 3 }, tribes: [TRIBES.TECNOLOGIA] },
    { id: 'u_07', name: 'Espada de Ferro', type: CARD_TYPES.SPELL, rarity: RARITIES.UNCOMMON, cost: 2, desc: 'Dá +3/+0.', image: '⚔️', target: 'troop_friendly', effect: { buffAtk: 3 }, tribes: [TRIBES.FERRAMENTA] },
    { id: 'u_08', name: 'Urso', type: CARD_TYPES.TROOP, rarity: RARITIES.UNCOMMON, cost: 4, atk: 4, hp: 5, desc: 'Grande e assustador.', image: '🐻', tribes: [TRIBES.ANIMAL, TRIBES.NATUREZA] },
    { id: 'u_09', name: 'Ninja', type: CARD_TYPES.TROOP, rarity: RARITIES.UNCOMMON, cost: 3, atk: 4, hp: 1, desc: 'Tem Escudo.', image: '🥷', keywords: ['escudo'], tribes: [TRIBES.PROFISSAO] },
    { id: 'u_10', name: 'Fantasma', type: CARD_TYPES.TROOP, rarity: RARITIES.UNCOMMON, cost: 3, atk: 2, hp: 2, desc: 'Necromancia.', image: '👻', keywords: ['necromancia'], tribes: [TRIBES.MISTICO] },
    { id: 'u_11', name: 'Ambulância', type: CARD_TYPES.TROOP, rarity: RARITIES.UNCOMMON, cost: 4, atk: 2, hp: 6, desc: 'Cura seu herói em 2 no fim do turno.', image: '🚑', aura: { healHero: 2 }, tribes: [TRIBES.VEICULO, TRIBES.URBANO] },
    { id: 'u_12', name: 'Poção Venenosa', type: CARD_TYPES.SPELL, rarity: RARITIES.UNCOMMON, cost: 2, desc: 'Destrói qualquer tropa com custo 3 ou menos.', image: '🧪', target: 'troop_enemy_cost_le_3', effect: { kill: true }, tribes: [TRIBES.MISTICO] },
    { id: 'u_13', name: 'Guerreiro', type: CARD_TYPES.TROOP, rarity: RARITIES.UNCOMMON, cost: 3, atk: 3, hp: 3, desc: 'Grito de Guerra: Ganha Escudo.', image: '🪖', battlecry: { target: 'self', effect: { addKeyword: 'escudo' } }, tribes: [TRIBES.PROFISSAO] },
    { id: 'u_14', name: 'Trator', type: CARD_TYPES.TROOP, rarity: RARITIES.UNCOMMON, cost: 5, atk: 5, hp: 5, desc: 'Forte.', image: '🚜', tribes: [TRIBES.VEICULO, TRIBES.TECNOLOGIA] },
    { id: 'u_15', name: 'Drone', type: CARD_TYPES.TROOP, rarity: RARITIES.UNCOMMON, cost: 2, atk: 2, hp: 1, desc: 'Compra 1 carta ao morrer.', image: '🛸', deathrattle: { effect: { draw: 1 } }, tribes: [TRIBES.TECNOLOGIA] },
    { id: 'u_16', name: 'Bateria', type: CARD_TYPES.SPELL, rarity: RARITIES.UNCOMMON, cost: 1, desc: 'Restaura 3 de Energia da Bateria.', image: '🔋', target: 'none', effect: { addBattery: 3 }, tribes: [TRIBES.TECNOLOGIA] },
    { id: 'u_17', name: 'Armadilha', type: CARD_TYPES.SECRET, rarity: RARITIES.UNCOMMON, cost: 2, desc: 'SEGREDO: Se um inimigo atacar, destrua-o.', image: '🪤', trigger: 'on_attacked', effect: { killAttacker: true }, tribes: [TRIBES.FERRAMENTA] },
    { id: 'u_18', name: 'Ilusão', type: CARD_TYPES.SECRET, rarity: RARITIES.UNCOMMON, cost: 2, desc: 'SEGREDO: Se seu herói for atacado, previne o dano e cria um Fantasma (2/2).', image: '✨', trigger: 'on_hero_attacked', effect: { preventDamage: true, summon: 'u_10' }, tribes: [TRIBES.MISTICO] },
    { id: 'u_19', name: 'Muralha', type: CARD_TYPES.TROOP, rarity: RARITIES.UNCOMMON, cost: 4, atk: 0, hp: 8, desc: 'Não pode atacar.', image: '🧱', keywords: ['defensor'], tribes: [TRIBES.TERRENO] },
    { id: 'u_20', name: 'Cientista', type: CARD_TYPES.TROOP, rarity: RARITIES.UNCOMMON, cost: 3, atk: 2, hp: 2, desc: 'Grito de Guerra: +1 de Energia (Bateria).', image: '👩‍🔬', battlecry: { target: 'none', effect: { addBattery: 1 } }, tribes: [TRIBES.PROFISSAO, TRIBES.TECNOLOGIA] },

    // --- RARES (r_01 to r_15) ---
    { id: 'r_01', name: 'Tigre Branco', type: CARD_TYPES.TROOP, rarity: RARITIES.RARE, cost: 5, atk: 5, hp: 4, desc: 'Ágil e letal. Tem Escudo.', image: '🐅', keywords: ['escudo'], tribes: [TRIBES.ANIMAL, TRIBES.NATUREZA] },
    { id: 'r_02', name: 'Bola de Fogo', type: CARD_TYPES.SPELL, rarity: RARITIES.RARE, cost: 4, desc: 'Causa 6 de dano a qualquer alvo.', image: '☄️', target: 'any', effect: { damage: 6 }, tribes: [TRIBES.MISTICO] },
    { id: 'r_03', name: 'General', type: CARD_TYPES.TROOP, rarity: RARITIES.RARE, cost: 5, atk: 3, hp: 4, desc: 'Outras tropas aliadas ganham +1/+1.', image: '🎖️', aura: { target: 'friendly_troops', effect: { buffAtk: 1, buffHp: 1 } }, tribes: [TRIBES.PROFISSAO] },
    { id: 'r_04', name: 'Floresta Viva', type: CARD_TYPES.ENVIRONMENT, rarity: RARITIES.RARE, cost: 3, envType: 'heal-env', desc: 'Ambiente: Tropas nesta lane curam 2 por turno.', image: '🌲', tribes: [TRIBES.NATUREZA, TRIBES.TERRENO] },
    { id: 'r_05', name: 'Vulcão', type: CARD_TYPES.ENVIRONMENT, rarity: RARITIES.RARE, cost: 4, envType: 'fire-env', desc: 'Ambiente: Causa 1 de dano a todas as tropas aqui por turno.', image: '🌋', tribes: [TRIBES.TERRENO, TRIBES.MISTICO] },
    { id: 'r_06', name: 'Assassino', type: CARD_TYPES.TROOP, rarity: RARITIES.RARE, cost: 4, atk: 4, hp: 2, desc: 'Tem Veneno e Escudo.', image: '🗡️', keywords: ['veneno', 'escudo'], tribes: [TRIBES.PROFISSAO] },
    { id: 'r_07', name: 'Robô de Combate', type: CARD_TYPES.TROOP, rarity: RARITIES.RARE, cost: 6, atk: 6, hp: 6, desc: 'Apenas uma máquina forte.', image: '🤖', tribes: [TRIBES.TECNOLOGIA] },
    { id: 'r_08', name: 'Meteoro', type: CARD_TYPES.SPELL, rarity: RARITIES.RARE, cost: 6, desc: 'Causa 5 de dano a todas as tropas.', image: '☄️', target: 'all_troops', effect: { damage: 5 }, tribes: [TRIBES.MISTICO] },
    { id: 'r_09', name: 'Ressurreição', type: CARD_TYPES.SPELL, rarity: RARITIES.RARE, cost: 4, desc: 'Revive sua última tropa morta nesta lane.', image: '✝️', target: 'empty_lane_friendly', effect: { reviveLast: true }, tribes: [TRIBES.MISTICO] },
    { id: 'r_10', name: 'Vampiro Menor', type: CARD_TYPES.TROOP, rarity: RARITIES.RARE, cost: 4, atk: 3, hp: 3, desc: 'Ao atacar, cura seu herói em 3.', image: '🧛', lifesteal: 3, tribes: [TRIBES.MISTICO] },
    { id: 'r_11', name: 'Banqueiro', type: CARD_TYPES.TROOP, rarity: RARITIES.RARE, cost: 3, atk: 1, hp: 3, desc: 'No fim do turno, ganha 1 de Energia na Bateria.', image: '💼', aura: { addBattery: 1 }, tribes: [TRIBES.PROFISSAO, TRIBES.URBANO] },
    { id: 'r_12', name: 'Contra-Feitiço', type: CARD_TYPES.SECRET, rarity: RARITIES.RARE, cost: 3, desc: 'SEGREDO: Cancela o próximo feitiço do inimigo.', image: '🛑', trigger: 'on_spell_cast', effect: { cancelSpell: true }, tribes: [TRIBES.MISTICO] },
    { id: 'r_13', name: 'Gigante de Pedra', type: CARD_TYPES.TROOP, rarity: RARITIES.RARE, cost: 7, atk: 6, hp: 8, desc: 'Lento, mas devastador.', image: '🗿', tribes: [TRIBES.TERRENO, TRIBES.MISTICO] },
    { id: 'r_14', name: 'Tsunami', type: CARD_TYPES.SPELL, rarity: RARITIES.RARE, cost: 5, desc: 'Devolve todas as tropas inimigas para a mão.', image: '🌊', target: 'all_enemy_troops', effect: { bounce: true }, tribes: [TRIBES.AQUATICO, TRIBES.NATUREZA] },
    { id: 'r_15', name: 'Mutante', type: CARD_TYPES.TROOP, rarity: RARITIES.RARE, cost: 5, atk: 4, hp: 4, desc: 'Necromancia e Veneno.', image: '🧟', keywords: ['necromancia', 'veneno'], tribes: [TRIBES.MISTICO, TRIBES.TECNOLOGIA] },

    // --- EPICS (e_01 to e_10) ---
    { id: 'e_01', name: 'Dragão Vermelho', type: CARD_TYPES.TROOP, rarity: RARITIES.EPIC, cost: 7, atk: 7, hp: 7, desc: 'Grito de Guerra: Causa 3 de dano a todos os inimigos.', image: '🐉', battlecry: { target: 'all_enemies', effect: { damage: 3 } }, tribes: [TRIBES.MISTICO, TRIBES.ANIMAL] },
    { id: 'e_02', name: 'Apocalipse', type: CARD_TYPES.SPELL, rarity: RARITIES.EPIC, cost: 8, desc: 'Destrói todas as tropas do campo.', image: '🌪️', target: 'all_troops', effect: { kill: true }, tribes: [TRIBES.MISTICO] },
    { id: 'e_03', name: 'Rei Arthur', type: CARD_TYPES.TROOP, rarity: RARITIES.EPIC, cost: 6, atk: 5, hp: 5, desc: 'Ganha +1/+1 por cada carta na sua mão.', image: '🤴', dynamicStat: 'hand_size', tribes: [TRIBES.PROFISSAO] },
    { id: 'e_04', name: 'Buraco Negro', type: CARD_TYPES.ENVIRONMENT, rarity: RARITIES.EPIC, cost: 5, envType: 'dark-env', desc: 'Ambiente: Tropas nesta lane morrem após 1 turno.', image: '🕳️', tribes: [TRIBES.MISTICO, TRIBES.TERRENO] },
    { id: 'e_05', name: 'Ciborgue Supremo', type: CARD_TYPES.TROOP, rarity: RARITIES.EPIC, cost: 8, atk: 8, hp: 8, desc: 'Tem Escudo e Veneno.', image: '🦾', keywords: ['escudo', 'veneno'], tribes: [TRIBES.TECNOLOGIA] },
    { id: 'e_06', name: 'Fênix', type: CARD_TYPES.TROOP, rarity: RARITIES.EPIC, cost: 6, atk: 4, hp: 4, desc: 'Necromancia Infinita (Volta sempre).', image: '🦅', keywords: ['necromancia_infinita'], tribes: [TRIBES.MISTICO, TRIBES.ANIMAL] },
    { id: 'e_07', name: 'Roubo de Mentes', type: CARD_TYPES.SPELL, rarity: RARITIES.EPIC, cost: 4, desc: 'Copia 2 cartas da mão do oponente.', image: '🧠', target: 'none', effect: { copyOpponentHand: 2 }, tribes: [TRIBES.MISTICO] },
    { id: 'e_08', name: 'Portal Mágico', type: CARD_TYPES.SPELL, rarity: RARITIES.EPIC, cost: 5, desc: 'Invoca uma tropa aleatória do seu deck de graça.', image: '🌀', target: 'empty_lane_friendly', effect: { summonFromDeck: true }, tribes: [TRIBES.MISTICO] },
    { id: 'e_09', name: 'Kraken', type: CARD_TYPES.TROOP, rarity: RARITIES.EPIC, cost: 9, atk: 8, hp: 10, desc: 'Grito de Guerra: Congela todo o campo inimigo.', image: '🦑', battlecry: { target: 'all_enemy_troops', effect: { addKeyword: 'congelado' } }, tribes: [TRIBES.AQUATICO, TRIBES.ANIMAL] },
    { id: 'e_10', name: 'Espelho Quebrado', type: CARD_TYPES.SECRET, rarity: RARITIES.EPIC, cost: 4, desc: 'SEGREDO: Se seu herói for receber dano letal, previne o dano e cura 10.', image: '🪞', trigger: 'on_lethal_damage', effect: { preventDamage: true, healHero: 10 }, tribes: [TRIBES.MISTICO] },

    // --- LEGENDARIES (l_01 to l_08) ---
    { id: 'l_01', name: 'Deus do Trovão', type: CARD_TYPES.TROOP, rarity: RARITIES.LEGENDARY, cost: 9, atk: 8, hp: 8, desc: 'No fim do turno, causa 5 de dano a um inimigo aleatório.', image: '⚡', aura: { randomDamage: 5 }, tribes: [TRIBES.MISTICO] },
    { id: 'l_02', name: 'Exodia, o Proibido', type: CARD_TYPES.SPELL, rarity: RARITIES.LEGENDARY, cost: 10, desc: 'Causa 20 de dano ao Herói inimigo.', image: '👁️', target: 'enemy_hero', effect: { damage: 20 }, tribes: [TRIBES.MISTICO] },
    { id: 'l_03', name: 'Mãe Natureza', type: CARD_TYPES.TROOP, rarity: RARITIES.LEGENDARY, cost: 8, atk: 5, hp: 10, desc: 'Todas as suas tropas do tipo Animal recebem +2/+2.', image: '🌍', aura: { target: 'friendly_animals', effect: { buffAtk: 2, buffHp: 2 } }, tribes: [TRIBES.NATUREZA] },
    { id: 'l_04', name: 'Dragão Ancião', type: CARD_TYPES.TROOP, rarity: RARITIES.LEGENDARY, cost: 10, atk: 12, hp: 12, desc: 'Custa 1 a menos por cada carta jogada nesta partida.', image: '🐲', dynamicCost: 'cards_played', tribes: [TRIBES.MISTICO, TRIBES.ANIMAL] },
    { id: 'l_05', name: 'Máquina do Tempo', type: CARD_TYPES.ENVIRONMENT, rarity: RARITIES.LEGENDARY, cost: 7, envType: 'time-env', desc: 'Ambiente: No início do turno, você ganha 1 turno extra (máx 1 vez).', image: '⏳', tribes: [TRIBES.TECNOLOGIA] },
    { id: 'l_06', name: 'Rei Lich', type: CARD_TYPES.TROOP, rarity: RARITIES.LEGENDARY, cost: 8, atk: 7, hp: 7, desc: 'Grito de Guerra: Revive as últimas 3 tropas mortas do seu lado.', image: '👑', battlecry: { target: 'board', effect: { reviveLastN: 3 } }, tribes: [TRIBES.MISTICO] },
    { id: 'l_07', name: 'Mega Bomba Nuclear', type: CARD_TYPES.SPELL, rarity: RARITIES.LEGENDARY, cost: 9, desc: 'Destrói TODOS os cards na mesa (incluindo ambientes) e causa 5 no herói.', image: '☢️', target: 'all', effect: { nuke: true }, tribes: [TRIBES.TECNOLOGIA] },
    { id: 'l_08', name: 'Árvore da Vida', type: CARD_TYPES.SPELL, rarity: RARITIES.LEGENDARY, cost: 9, desc: 'Cura completamente seu Herói e todas as suas tropas.', image: '🌳', target: 'all_friendly', effect: { fullHeal: true }, tribes: [TRIBES.NATUREZA] },

    // --- MYTHICS (m_01 to m_02) ---
    { id: 'm_01', name: 'O Criador', type: CARD_TYPES.TROOP, rarity: RARITIES.MYTHIC, cost: 10, atk: 10, hp: 10, desc: 'Grito de Guerra: Destrói o Herói inimigo se ele tiver 15 ou menos de Vida.', image: '🌌', battlecry: { target: 'enemy_hero', effect: { executeAt: 15 } }, tribes: [TRIBES.MISTICO] },
    { id: 'm_02', name: 'O Fim', type: CARD_TYPES.SPELL, rarity: RARITIES.MYTHIC, cost: 10, desc: 'Se você tiver 5 ou menos de Vida, VOCÊ VENCE O JOGO.', image: '👁️‍🗨️', target: 'none', effect: { winGameIfLowHp: true }, tribes: [TRIBES.MISTICO] }
];

const screens = {
    MENU: 'main-menu',
    SHOP: 'shop-screen',
    COLLECTION: 'collection-screen',
    BATTLE: 'battle-screen',
    DRAFT: 'draft-screen'
};

const DAILY_QUESTS = [
    { id: 'q1', desc: 'Jogue 5 Partidas', target: 5, progress: 0, reward: { type: 'coins', amount: 100 }, completed: false },
    { id: 'q2', desc: 'Vença 3 Partidas', target: 3, progress: 0, reward: { type: 'gems', amount: 20 }, completed: false },
    { id: 'q3', desc: 'Cause 100 de Dano', target: 100, progress: 0, reward: { type: 'stardust', amount: 50 }, completed: false },
    { id: 'q4', desc: 'Jogue 20 Cartas', target: 20, progress: 0, reward: { type: 'coins', amount: 150 }, completed: false },
    { id: 'q5', desc: 'Jogue 10 Feitiços', target: 10, progress: 0, reward: { type: 'gems', amount: 10 }, completed: false }
];

const ACHIEVEMENTS = [
    { id: 'a1', desc: 'Primeiro Sangue (Vença 1 partida)', target: 1, progress: 0, reward: { type: 'gems', amount: 50 }, completed: false },
    { id: 'a2', desc: 'Gladiador (Vença 100 partidas)', target: 100, progress: 0, reward: { type: 'avatar', value: '🥷' }, completed: false },
    { id: 'a3', desc: 'Colecionador (Tenha 50 cartas na coleção)', target: 50, progress: 0, reward: { type: 'stardust', amount: 300 }, completed: false },
    { id: 'a4', desc: 'Rico (Acumule 5000 Moedas)', target: 5000, progress: 0, reward: { type: 'gems', amount: 100 }, completed: false },
    { id: 'a5', desc: 'Mestre do Draft (12 Vitórias na Arena)', target: 1, progress: 0, reward: { type: 'avatar', value: '👑' }, completed: false }
];

const ADVENTURE_BOSSES = [
    { name: 'O Fazendeiro Louco', hp: 40, avatar: '👨‍🌾', desc: 'Usa apenas cartas de Natureza e Animais.', deckFilter: c => c.tribes && (c.tribes.includes(TRIBES.NATUREZA) || c.tribes.includes(TRIBES.ANIMAL)), botLevel: 'easy' },
    { name: 'Máquina de Guerra', hp: 50, avatar: '🤖', desc: 'Deck focado em Tecnologia e Veículos.', deckFilter: c => c.tribes && (c.tribes.includes(TRIBES.TECNOLOGIA) || c.tribes.includes(TRIBES.VEICULO)), botLevel: 'normal' },
    { name: 'Lorde das Sombras', hp: 60, avatar: '🧛‍♂️', desc: 'Necromancia e feitiços Místicos.', deckFilter: c => c.tribes && c.tribes.includes(TRIBES.MISTICO), botLevel: 'hard' },
    { name: 'Mestre da Cidade', hp: 70, avatar: '🏙️', desc: 'Usa Profissões e Urbano. Muita cura e controle.', deckFilter: c => c.tribes && (c.tribes.includes(TRIBES.URBANO) || c.tribes.includes(TRIBES.PROFISSAO)), botLevel: 'expert' },
    { name: 'O Criador', hp: 100, avatar: '🌌', desc: 'Deck com LENDÁRIAS e MÍTICAS. Boa sorte.', deckFilter: c => c.rarity === RARITIES.LEGENDARY || c.rarity === RARITIES.MYTHIC, botLevel: 'expert' }
];


// --- AUDIO CONTROLLER (SINGLETON) ---
class AudioController {
    constructor() {
        if (AudioController.instance) {
            return AudioController.instance;
        }

        // Load Settings
        const savedAudio = JSON.parse(localStorage.getItem('EmojiArenaAudioPrefs') || '{}');
        this.masterVolume = savedAudio.masterVolume !== undefined ? savedAudio.masterVolume : 1.0;
        this.musicVolume = savedAudio.musicVolume !== undefined ? savedAudio.musicVolume : 0.8;
        this.sfxVolume = savedAudio.sfxVolume !== undefined ? savedAudio.sfxVolume : 1.0;

        // Assets Dictionary (URLs)
        this.assets = {
            bgm: {
                bgm_menu: 'assets/audio/bgm_menu.mp3',
                bgm_battle_normal: 'assets/audio/bgm_battle_normal.mp3',
                bgm_battle_tension: 'assets/audio/bgm_battle_tension.mp3',
                bgm_victory: 'assets/audio/bgm_victory.mp3',
                bgm_defeat: 'assets/audio/bgm_defeat.mp3'
            },
            sfx: {
                ui_hover: 'assets/audio/ui_hover.wav',
                ui_click: 'assets/audio/ui_click.wav',
                ui_error: 'assets/audio/ui_error.wav',
                ui_buy: 'assets/audio/ui_buy.wav',
                ui_chest_rumble: 'assets/audio/ui_chest_rumble.wav',
                ui_chest_burst: 'assets/audio/ui_chest_burst.wav',
                ui_beep: 'assets/audio/ui_beep.wav',

                card_draw: 'assets/audio/card_draw.wav',
                card_play: 'assets/audio/card_play.wav',
                combat_hit: 'assets/audio/combat_hit.wav',
                hero_heal: 'assets/audio/hero_heal.wav',
                hero_damage: 'assets/audio/hero_damage.wav',

                sfx_tribe_animal: 'assets/audio/tribe_animal.wav',
                sfx_tribe_magic: 'assets/audio/tribe_magic.wav',
                sfx_tribe_weather: 'assets/audio/tribe_weather.wav',
                sfx_tribe_metal: 'assets/audio/tribe_metal.wav',
                sfx_tribe_food: 'assets/audio/tribe_food.wav'
            }
        };

        this.currentBGM = null;
        this.bgmAudioObj = new Audio();
        this.bgmAudioObj.loop = true;
        this.nextBgmAudioObj = new Audio();
        this.nextBgmAudioObj.loop = true;

        this.sfxPool = {};
        this.poolSize = 5;

        for (const [key, url] of Object.entries(this.assets.sfx)) {
            this.sfxPool[key] = [];
            for (let i = 0; i < this.poolSize; i++) {
                const audio = new Audio(url);
                this.sfxPool[key].push(audio);
            }
        }

        AudioController.instance = this;
    }

    saveSettings() {
        localStorage.setItem('EmojiArenaAudioPrefs', JSON.stringify({
            masterVolume: this.masterVolume,
            musicVolume: this.musicVolume,
            sfxVolume: this.sfxVolume
        }));
        this.updateBGMVolume();
    }

    updateBGMVolume(targetAudio = this.bgmAudioObj, ratio = 1.0) {
        targetAudio.volume = this.masterVolume * this.musicVolume * ratio;
    }

    playBGM(trackId, crossfadeDuration = 1000) {
        if (this.currentBGM === trackId) return;

        const url = this.assets.bgm[trackId];
        if (!url) return;

        this.currentBGM = trackId;

        if (this.bgmAudioObj.paused || !this.bgmAudioObj.src) {
            this.bgmAudioObj.src = url;
            this.updateBGMVolume();
            this.bgmAudioObj.play().catch(e => console.log('BGM Play blocked'));
            return;
        }

        this.nextBgmAudioObj.src = url;
        this.nextBgmAudioObj.volume = 0;
        this.nextBgmAudioObj.play().catch(e => console.log('BGM Play blocked'));

        const steps = 20;
        const stepTime = crossfadeDuration / steps;
        let currentStep = 0;

        const fadeInterval = setInterval(() => {
            currentStep++;
            const fadeOutRatio = 1 - (currentStep / steps);
            const fadeInRatio = currentStep / steps;

            this.updateBGMVolume(this.bgmAudioObj, fadeOutRatio);
            this.updateBGMVolume(this.nextBgmAudioObj, fadeInRatio);

            if (currentStep >= steps) {
                clearInterval(fadeInterval);
                this.bgmAudioObj.pause();

                const temp = this.bgmAudioObj;
                this.bgmAudioObj = this.nextBgmAudioObj;
                this.nextBgmAudioObj = temp;

                this.updateBGMVolume();
            }
        }, stepTime);
    }

    playSFX(sfxId) {
        const pool = this.sfxPool[sfxId];
        if (!pool) return;

        let audioToPlay = pool.find(a => a.paused || a.ended || a.currentTime === 0);

        if (!audioToPlay) {
            audioToPlay = pool.shift();
            pool.push(audioToPlay);
        }

        audioToPlay.volume = this.masterVolume * this.sfxVolume;
        audioToPlay.currentTime = 0;
        audioToPlay.play().catch(e => console.log('SFX Play blocked'));
    }
}

const AudioManager = new AudioController();

// --- RELIC MANAGER ---
class RelicManager {
    static relics = {
        'coroa_morangos': { id: 'coroa_morangos', name: 'Coroa de Morangos', desc: 'Curar 2 HP ao jogar Comida.', icon: '🍓' },
        'bateria_viciada': { id: 'bateria_viciada', name: 'Bateria Viciada', desc: '+3 Créditos no turno 1.', icon: '🔋' },
        'luva_boxe': { id: 'luva_boxe', name: 'Luva de Boxe', desc: 'Dobra dano contra defensores.', icon: '🥊' },
        'contrato_demon': { id: 'contrato_demon', name: 'Contrato Demoníaco', desc: 'Jogue 4 cartas no turno: tome 3 dano, compre 2 cartas.', icon: '📜' },
        'escudo_vidro': { id: 'escudo_vidro', name: 'Escudo de Vidro', desc: 'Primeiro dano de cada combate é prevenido.', icon: '🛡️' }
    };

    static triggerPlayCard(card) {
        if (!playerProfile.currentRunState) return;
        const state = playerProfile.currentRunState;

        // Coroa de Morangos
        if (state.relics.includes('coroa_morangos') && card.tribes && card.tribes.includes(TRIBES.COMIDA)) {
            gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + 2);
            triggerHealAnimation('player', null, 2);
            showNotification("Relíquia: Coroa de Morangos curou 2 HP!", "success");
        }

        // Contrato Demoníaco
        if (state.relics.includes('contrato_demon') && !gameState.player.isProcessingRelic) {
            gameState.player.cardsPlayedThisTurn = (gameState.player.cardsPlayedThisTurn || 0) + 1;
            if (gameState.player.cardsPlayedThisTurn === 4) {
                gameState.player.isProcessingRelic = true;
                gameState.player.hp -= 3;
                triggerDamageAnimation('opponent', null, 'player', null, 3);
                drawCard('player', 2);
                showNotification("Relíquia: Contrato Demoníaco cobrou o preço!", "error");
                setTimeout(() => gameState.player.isProcessingRelic = false, 500);
            }
        }
    }

    static triggerStartCombat() {
        if (!playerProfile.currentRunState) return;
        const state = playerProfile.currentRunState;

        gameState.player.glassShieldActive = state.relics.includes('escudo_vidro');

        if (state.relics.includes('bateria_viciada')) {
            gameState.player.credits += 3;
            showNotification("Relíquia: Bateria Viciada deu +3 Créditos!", "info");
        }
    }

    static checkDamage(amount, targetIsHero) {
        if (!playerProfile.currentRunState || !targetIsHero) return amount;

        if (gameState.player.glassShieldActive) {
            gameState.player.glassShieldActive = false;
            showNotification("Relíquia: Escudo de Vidro quebrou!", "info");
            return 0;
        }
        return amount;
    }

    static checkAttackDamage(amount, defenderCard) {
        if (!playerProfile.currentRunState || !defenderCard) return amount;

        if (playerProfile.currentRunState.relics.includes('luva_boxe') && defenderCard.keywords && defenderCard.keywords.includes('defensor')) {
            showNotification("Relíquia: Luva de Boxe ativada!", "info");
            return amount * 2;
        }
        return amount;
    }
}

// --- ROGUELIKE MAP GENERATION ---
function startNewRoguelikeRun() {
    // Generate basic deck
    const basicDeck = ['c_01','c_01','c_02','c_02','c_04','c_05','c_05','c_09','c_10','c_16']; // 10 basic commons

    // Create state
    playerProfile.currentRunState = {
        hp: 50,
        maxHp: 50,
        gold: 0,
        deck: basicDeck,
        relics: [],
        map: generateRoguelikeDAG(),
        currentNodeTier: 0,
        currentNodeIndex: 0, // Starts at 0,0
        seed: Date.now()
    };
    saveProfile();
    renderMapScreen();
    showScreen(screens.MAP);
}

function generateRoguelikeDAG() {
    const map = [];
    const tiers = 15;

    for (let t = 0; t < tiers; t++) {
        let nodesInTier = (t === 0 || t === tiers - 1) ? 1 : Math.floor(Math.random() * 2) + 3; // 1 node at start/end, 3-4 in between
        let tierNodes = [];

        for (let n = 0; n < nodesInTier; n++) {
            let type = 'combat'; // Default

            if (t === 0) type = 'combat'; // Node 1 is always combat
            else if (t === tiers - 1) type = 'boss'; // Node 15 is always boss
            else {
                // Weights: Combat(45%), Elite(15%), Campfire(15%), Shop(10%), Event(15%)
                let roll = Math.random();
                if (roll < 0.45) type = 'combat';
                else if (roll < 0.60) type = 'elite';
                else if (roll < 0.75) type = 'campfire';
                else if (roll < 0.85) type = 'shop';
                else type = 'event';
            }

            tierNodes.push({
                id: `t${t}_n${n}`,
                type: type,
                tier: t,
                index: n,
                connections: [] // Points to indexes in the NEXT tier
            });
        }
        map.push(tierNodes);
    }

    // Connect nodes DAG logic
    for (let t = 0; t < tiers - 1; t++) {
        const currentTier = map[t];
        const nextTier = map[t+1];

        // Ensure every node in current tier connects to at least one in next tier
        currentTier.forEach((node, i) => {
            // Bias towards straight lines or adjacent
            let targetIdx = Math.floor((i / currentTier.length) * nextTier.length);
            node.connections.push(targetIdx);

            // 30% chance for a branching path if there are other nodes
            if (Math.random() < 0.3 && nextTier.length > 1) {
                let extraIdx = (targetIdx + 1) % nextTier.length;
                if (!node.connections.includes(extraIdx)) node.connections.push(extraIdx);
            }
        });

        // Ensure every node in NEXT tier is reachable from at least one in CURRENT tier
        nextTier.forEach((nNode, j) => {
            let isConnected = currentTier.some(cNode => cNode.connections.includes(j));
            if (!isConnected) {
                let randomCurrent = Math.floor(Math.random() * currentTier.length);
                if (!currentTier[randomCurrent].connections.includes(j)) {
                    currentTier[randomCurrent].connections.push(j);
                }
            }
        });
    }

    return map;
}

// --- MAP RENDERING ---
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

function selectNode(node) {
    AudioManager.playSFX('ui_click');
    const state = playerProfile.currentRunState;

    // Move player
    state.currentNodeTier = node.tier;
    state.currentNodeIndex = node.index;
    saveProfile();

    // Resolve Node
    if (node.type === 'combat' || node.type === 'elite' || node.type === 'boss') {
        currentMatchMode = 'roguelike';
        startBattle(true, node);
    } else if (node.type === 'campfire') {
        openCampfire();
    } else if (node.type === 'shop') {
        openTowerShop();
    } else if (node.type === 'event') {
        openEvent();
    }
}

// --- ROGUELIKE MODALS & EVENTS ---
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

let playerProfile = {
    coins: 500,
    gems: 50,
    stardust: 0,
    tickets: 0,
    xp: 0,
    level: 1,
    elo: 0,
    adventureProgress: 0,
    collection: {
        'c_01': 2, 'c_02': 2, 'c_03': 2, 'c_04': 2, 'c_05': 2,
        'c_06': 2, 'c_07': 2, 'c_08': 2, 'c_09': 2, 'c_10': 2,
        'u_01': 1, 'u_02': 1, 'r_01': 1
    },
    deck: [
        'c_01', 'c_01', 'c_02', 'c_02', 'c_03', 'c_03', 'c_04', 'c_04', 'c_05', 'c_05',
        'c_06', 'c_06', 'c_07', 'c_07', 'c_08', 'c_08', 'c_09', 'c_09', 'c_10', 'c_10',
        'c_01', 'c_02', 'c_03', 'c_04', 'c_05', 'c_06', 'c_07', 'c_08', 'c_09', 'c_10',
        'u_01', 'u_02', 'r_01', 'c_01', 'c_02', 'c_03', 'c_04', 'c_05', 'c_06', 'c_07'
    ],
    hero: 'mago',
    unlockedAvatars: ['🧙‍♂️'],
    activeAvatar: '🧙‍♂️',
    stats: { wins: 0, losses: 0, highestElo: 0, packsOpened: 0 },
    quests: JSON.parse(JSON.stringify(DAILY_QUESTS)),
    achievements: JSON.parse(JSON.stringify(ACHIEVEMENTS)),
    pityTimer: 0 // +1 for each pack. Resets on Legendary/Mythic.
};


let currentMatchMode = 'casual'; // casual, ranked, roguelike, endless, draft
let gameState = {
    turn: 0,
    isPlayerTurn: true,
    player: {
        hp: 30, maxHp: 30,
        credits: 1, maxCredits: 1,
        battery: 0,
        deck: [], hand: [], board: [null, null, null, null, null],
        secrets: [],
        heroUsed: false
    },
    opponent: {
        hp: 30, maxHp: 30,
        credits: 1, maxCredits: 1,
        battery: 0,
        deck: [], hand: [], board: [null, null, null, null, null],
        secrets: [],
        isBot: true, botLevel: 'medium',
        heroUsed: false,
        selectedCardIndex: null
    }
};


// Helper functions
function getCardById(id) {
    return CardDatabase.find(c => c.id === id);
}


function saveProfile() {
    localStorage.setItem('Emoji_Arena_SaveData_v1', JSON.stringify(playerProfile));
    updateUIProfile();
}

function loadProfile() {
    // Migration logic
    let saved = localStorage.getItem('Emoji_Arena_SaveData_v1');
    if (!saved) {
        const oldSaved = localStorage.getItem('cardWarsUltimateProfile');
        if (oldSaved) {
            saved = oldSaved;
            localStorage.setItem('Emoji_Arena_SaveData_v1', oldSaved);
            localStorage.removeItem('cardWarsUltimateProfile');
            console.log("Migração de save antigo concluída com sucesso!");
        }
    }

    if (saved) {
        const parsed = JSON.parse(saved);
        playerProfile = { ...playerProfile, ...parsed };

        if(!playerProfile.unlockedAvatars) playerProfile.unlockedAvatars = ['🧙‍♂️'];
        if(!playerProfile.activeAvatar) playerProfile.activeAvatar = '🧙‍♂️';
        if(!playerProfile.hero) playerProfile.hero = 'mago';
        if(!playerProfile.quests) playerProfile.quests = JSON.parse(JSON.stringify(DAILY_QUESTS));
        if(!playerProfile.achievements) playerProfile.achievements = JSON.parse(JSON.stringify(ACHIEVEMENTS));
        if(playerProfile.pityTimer === undefined) playerProfile.pityTimer = 0;

        enforceDeckLimits();
    }
    updateUIProfile();
}

// Ensure deck has exactly 40 cards, max 4 copies (2 for mythic)
function enforceDeckLimits() {
    const counts = {};
    const validDeck = [];

    playerProfile.deck.forEach(cardId => {
        const c = getCardById(cardId);
        if(!c) return;

        counts[cardId] = (counts[cardId] || 0) + 1;
        const maxLimit = (c.rarity === RARITIES.MYTHIC) ? 2 : 4;

        if(counts[cardId] <= maxLimit && playerProfile.collection[cardId] >= counts[cardId]) {
            validDeck.push(cardId);
        }
    });

    playerProfile.deck = validDeck;

    // Auto-fill to 40 if needed (with dummy or basic cards if not enough collection, but realistically fallback)
    while (playerProfile.deck.length < 40) {
        playerProfile.deck.push('c_01'); // Force fallback
    }
    // Trim if over 40
    if (playerProfile.deck.length > 40) {
        playerProfile.deck = playerProfile.deck.slice(0, 40);
    }
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

function getRankString(elo) {
    if (elo < 200) return `🟤 Bronze (${elo})`;
    if (elo < 500) return `⚪ Prata (${elo})`;
    if (elo < 800) return `🟡 Ouro (${elo})`;
    if (elo < 1200) return `🔵 Platina (${elo})`;
    return `🟣 Mestre (${elo})`;
}

function addXP(amount) {
    playerProfile.xp += amount;
    const xpReq = playerProfile.level * 100;
    if (playerProfile.xp >= xpReq) {
        playerProfile.xp -= xpReq;
        playerProfile.level++;
        playerProfile.gems += 10;
        showNotification(`Level Up! Nível ${playerProfile.level}. +10 Gemas!`, "success");
    }
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');

    AudioManager.playBGM('bgm_menu');
    if (screenId === screens.COLLECTION) {
        renderCollection();
        renderDeck();
    } else if (screenId === screens.SHOP) {
        renderDailyDeals();
        renderAvatars();
    }
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

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
    setupBottomNav();
    updateUIProfile();
    setTimeout(() => {
        showNotification("Bem-vindo ao Emoji Arena!", "success");
    }, 1000);


    // Main Menu Buttons
    document.getElementById('btn-play-modes').addEventListener('click', () => {
        document.getElementById('play-modes-modal').classList.remove('hidden');
    });

    document.getElementById('btn-close-play-modes').addEventListener('click', () => {
        document.getElementById('play-modes-modal').classList.add('hidden');
    });

    document.getElementById('btn-collection').addEventListener('click', () => showScreen(screens.COLLECTION));
    document.getElementById('btn-shop').addEventListener('click', () => showScreen(screens.SHOP));

    document.getElementById('btn-quests').addEventListener('click', () => {
        renderQuests();
        document.getElementById('quests-overlay').classList.remove('hidden');
    });
    document.getElementById('btn-close-quests').addEventListener('click', () => {
        document.getElementById('quests-overlay').classList.add('hidden');
    });

    document.getElementById('btn-achievements').addEventListener('click', () => {
        renderAchievements();
        document.getElementById('achievements-overlay').classList.remove('hidden');
    });
    document.getElementById('btn-close-achievements').addEventListener('click', () => {
        document.getElementById('achievements-overlay').classList.add('hidden');
    });


    document.getElementById('btn-roguelike').addEventListener('click', () => {
        if (!playerProfile.currentRunState) {
            startNewRoguelikeRun();
        } else {
            renderMapScreen();
            showScreen(screens.MAP);
        }
    });

    document.getElementById('btn-abandon-run').addEventListener('click', () => {
        playerProfile.currentRunState = null;
        saveProfile();
        AudioManager.playBGM('bgm_menu');
        showScreen(screens.MENU);
    });

    // Audio Settings Integration
    const sliderMaster = document.getElementById('slider-master-vol');
    const sliderMusic = document.getElementById('slider-music-vol');
    const sliderSfx = document.getElementById('slider-sfx-vol');

    if (sliderMaster && sliderMusic && sliderSfx) {
        sliderMaster.value = AudioManager.masterVolume;
        sliderMusic.value = AudioManager.musicVolume;
        sliderSfx.value = AudioManager.sfxVolume;

        document.getElementById('val-master-vol').innerText = `${Math.round(AudioManager.masterVolume * 100)}%`;
        document.getElementById('val-music-vol').innerText = `${Math.round(AudioManager.musicVolume * 100)}%`;
        document.getElementById('val-sfx-vol').innerText = `${Math.round(AudioManager.sfxVolume * 100)}%`;

        sliderMaster.addEventListener('input', (e) => {
            AudioManager.masterVolume = parseFloat(e.target.value);
            document.getElementById('val-master-vol').innerText = `${Math.round(AudioManager.masterVolume * 100)}%`;
            AudioManager.saveSettings();
            AudioManager.playSFX('ui_beep');
        });

        sliderMusic.addEventListener('input', (e) => {
            AudioManager.musicVolume = parseFloat(e.target.value);
            document.getElementById('val-music-vol').innerText = `${Math.round(AudioManager.musicVolume * 100)}%`;
            AudioManager.saveSettings();
            AudioManager.playSFX('ui_beep');
        });

        sliderSfx.addEventListener('input', (e) => {
            AudioManager.sfxVolume = parseFloat(e.target.value);
            document.getElementById('val-sfx-vol').innerText = `${Math.round(AudioManager.sfxVolume * 100)}%`;
            AudioManager.saveSettings();
            AudioManager.playSFX('ui_beep');
        });
    }

    // Global UI Click and Hover Tracking
    document.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.classList.contains('card') || e.target.classList.contains('tab-btn')) {
            AudioManager.playSFX('ui_hover');
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            if(!e.target.classList.contains('buy-btn')) {
                AudioManager.playSFX('ui_click');
            }
        }
    });

    document.addEventListener('click', () => {
        if (document.getElementById('main-menu').classList.contains('active')) {
            AudioManager.playBGM('bgm_menu');
        }
    }, { once: true });


    document.getElementById('btn-leaderboard').addEventListener('click', () => {
        renderLeaderboard();
        showScreen(screens.LEADERBOARD);
    });

    document.getElementById('btn-play-endless').addEventListener('click', () => {
        document.getElementById('play-modes-modal').classList.add('hidden');
        if (playerProfile.endlessState) {
            if (confirm("Continuar a Run salva na Onda " + playerProfile.endlessState.currentWave + "?")) {
                currentMatchMode = 'endless';
                startMatchmaking(true);
            } else {
                playerProfile.endlessState = null;
                startEndlessMode();
            }
        } else {
            startEndlessMode();
        }
    });

    document.getElementById('btn-settings').addEventListener('click', () => {
        document.getElementById('settings-overlay').classList.remove('hidden');
    });
    document.getElementById('btn-close-settings').addEventListener('click', () => {
        document.getElementById('settings-overlay').classList.add('hidden');
    });
    document.getElementById('btn-reset-data').addEventListener('click', resetSaveData);

    // Back Buttons
    document.querySelectorAll('.btn-back').forEach(btn => {
        btn.addEventListener('click', () => showScreen(screens.MENU));
    });

    // Shop Logic
    document.querySelectorAll('.shop-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.shop-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.shop-content').forEach(c => c.classList.remove('active'));
            e.target.classList.add('active');
            document.getElementById(e.target.dataset.target).classList.add('active');
        });
    });

    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = e.target.dataset.type;
            const cost = parseInt(e.target.dataset.cost);
            const currency = e.target.dataset.currency;

            if (type && cost && currency) {
                if (playerProfile[currency] >= cost) {
                    playerProfile[currency] -= cost;
                    saveProfile();
                    if (type === 'tickets') {
                        playerProfile.tickets += 3;
                        showNotification("Comprou 3 Fichas de Arena!", "success");
                    } else {
                        openPack(type);
                    }
                } else {
                    showNotification(`Sem ${currency} suficiente!`, "error");
                }
            }
        });
    });

    document.getElementById('btn-close-pack').addEventListener('click', () => {
        document.getElementById('pack-opening-overlay').classList.add('hidden');
        saveProfile();
    });

    // Collection Logic
    document.getElementById('btn-toggle-forge').addEventListener('click', () => {
        isForgeMode = !isForgeMode;
        document.getElementById('btn-toggle-forge').innerText = isForgeMode ? "Exit Forge Mode" : "Enter Forge Mode";
        document.getElementById('collection-instructions').innerText = isForgeMode ?
            "Clique em uma carta não possuída para forjar com Pó Estelar, ou numa possuída para desencantar." :
            "Clique numa carta para adicionar/remover do deck.";
        renderCollection();
    });

    // Forge Buttons
    document.getElementById('btn-cancel-forge').addEventListener('click', () => {
        document.getElementById('forge-modal').classList.add('hidden');
    });

    // Play Modes Actions
    document.getElementById('btn-play-adventure').addEventListener('click', () => {
        currentMatchMode = 'adventure';
        startBattle(true);
    });

    document.getElementById('btn-play-ranked').addEventListener('click', () => {
        if (playerProfile.tickets > 0) {
            playerProfile.tickets--;
            saveProfile();
            currentMatchMode = 'ranked';
            startBattle(true);
        } else {
            showNotification("Sem Fichas de Arena! Compre na Loja.", "error");
        }
    });

    document.getElementById('btn-play-casual').addEventListener('click', () => {
        currentMatchMode = 'casual';
        startBattle(true);
    });

    // Battle actions
    document.getElementById('btn-end-turn').addEventListener('click', endTurn);

    document.getElementById('btn-hero-power').addEventListener('click', useHeroPower);

    // Tooltip logic
    document.addEventListener('mousemove', (e) => {
        const tooltip = document.getElementById('global-tooltip');
        if (tooltip) {
            tooltip.style.left = e.pageX + 15 + 'px';
            tooltip.style.top = e.pageY + 15 + 'px';
        }
    });
});

function resetSaveData() {
    if (confirm("TEM CERTEZA? Todo o seu progresso será perdido!")) {
        localStorage.removeItem('Emoji_Arena_SaveData_v1');
        location.reload();
    }
}

// --- HTML GENERATORS ---
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

// --- PACK OPENING LOGIC ---
function openPack(type) {
    playerProfile.stats.packsOpened++;
    playerProfile.pityTimer++;

    const container = document.getElementById('opened-cards');
    container.innerHTML = '';
    document.getElementById('pack-opening-overlay').classList.remove('hidden');

    let cardsToDraw = 5;
    let guaranteedRarity = null;
    let poolFilter = null;

    if (type === 'epic') guaranteedRarity = RARITIES.EPIC;
    if (type === 'legendary') { guaranteedRarity = RARITIES.LEGENDARY; cardsToDraw = 1; }
    if (type === 'mythic') { guaranteedRarity = RARITIES.MYTHIC; cardsToDraw = 1; }
    if (type === 'flora') poolFilter = c => c.tribes && (c.tribes.includes(TRIBES.NATUREZA) || c.tribes.includes(TRIBES.COMIDA));
    if (type === 'city') poolFilter = c => c.tribes && (c.tribes.includes(TRIBES.URBANO) || c.tribes.includes(TRIBES.PROFISSAO) || c.tribes.includes(TRIBES.VEICULO));
    if (type === 'elemental') poolFilter = c => c.type === CARD_TYPES.ENVIRONMENT || (c.tribes && (c.tribes.includes(TRIBES.TERRENO) || c.tribes.includes(TRIBES.AQUATICO)));

    // Apply Pity Timer
    if (playerProfile.pityTimer >= 10 && cardsToDraw > 1) {
        guaranteedRarity = RARITIES.EPIC; // At least Epic
    }

    for (let i = 0; i < cardsToDraw; i++) {
        let pool = CardDatabase;
        if (poolFilter) pool = pool.filter(poolFilter);
        if (pool.length === 0) pool = CardDatabase; // fallback

        let rarityRoll = Math.random();
        let targetRarity = RARITIES.COMMON;

        if (i === 0 && guaranteedRarity) {
            targetRarity = guaranteedRarity;
        } else {
            if (rarityRoll > 0.98) targetRarity = RARITIES.MYTHIC;
            else if (rarityRoll > 0.93) targetRarity = RARITIES.LEGENDARY;
            else if (rarityRoll > 0.80) targetRarity = RARITIES.EPIC;
            else if (rarityRoll > 0.60) targetRarity = RARITIES.RARE;
            else if (rarityRoll > 0.30) targetRarity = RARITIES.UNCOMMON;
        }

        // Reset pity timer if we natural rolled a big one
        if (targetRarity === RARITIES.LEGENDARY || targetRarity === RARITIES.MYTHIC) {
            playerProfile.pityTimer = 0;
        }

        let rarityPool = pool.filter(c => c.rarity === targetRarity);
        if (rarityPool.length === 0) rarityPool = CardDatabase.filter(c => c.rarity === targetRarity); // global fallback
        if (rarityPool.length === 0) rarityPool = CardDatabase; // absolute fallback

        const pulledCard = rarityPool[Math.floor(Math.random() * rarityPool.length)];

        // Add to collection
        if (!playerProfile.collection[pulledCard.id]) {
            playerProfile.collection[pulledCard.id] = 0;
        }
        playerProfile.collection[pulledCard.id]++;
        AudioManager.playSFX('card_draw');

        // Render hidden card
        const wrapper = document.createElement('div');
        wrapper.innerHTML = createCardHTML(pulledCard, true);
        const cardEl = wrapper.firstElementChild;

        // Add reveal interaction
        cardEl.addEventListener('click', function() {
            if (this.classList.contains('pack-card-hidden')) {
                this.className = `card card-reveal-anim`;
                this.setAttribute('data-rarity', pulledCard.rarity);
                this.innerHTML = createCardHTML(pulledCard, false).match(/<div class="card[^>]*>([\s\S]*?)<\/div>/)[1];

                // Add particles based on rarity
                if (pulledCard.rarity === RARITIES.LEGENDARY || pulledCard.rarity === RARITIES.MYTHIC) {
                    createParticles(this, pulledCard.rarity === RARITIES.MYTHIC ? '#e74c3c' : '#f1c40f');
                    document.getElementById('game-container').classList.add('screen-shake');
                    setTimeout(() => document.getElementById('game-container').classList.remove('screen-shake'), 400);
                }
            }
        });

        container.appendChild(cardEl);
    }
    updateUIProfile();
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

// --- SHOP: DAILY DEALS & AVATARS ---
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

// --- COLLECTION & FORGE ---
let isForgeMode = false;
let selectedCardForForge = null;

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

function addCardToDeck(cardId) {
    const c = getCardById(cardId);
    if(!c) return;

    const maxLimit = (c.rarity === RARITIES.MYTHIC) ? 2 : 4;
    const currentCount = playerProfile.deck.filter(id => id === cardId).length;

    if (playerProfile.deck.length >= 40) {
        showNotification("O deck já possui 40 cartas!", "error");
        return;
    }

    if (currentCount >= maxLimit) {
        showNotification(`Limite alcançado (${maxLimit}x)!`, "error");
        return;
    }

    if (currentCount >= playerProfile.collection[cardId]) {
        showNotification("Você não tem mais cópias dessa carta na coleção!", "error");
        return;
    }

    playerProfile.deck.push(cardId);
    saveProfile();
    renderDeck();
}

function removeCardFromDeck(index) {
    playerProfile.deck.splice(index, 1);
    saveProfile();
    renderDeck();
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

// --- PROGRESSION UI ---
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

function updateQuests(type, amount = 1) {
    playerProfile.quests.forEach(q => {
        if (q.completed) return;

        if (type === 'win' && q.id === 'q2') q.progress += amount;
        if (type === 'play' && q.id === 'q1') q.progress += amount;
        if (type === 'damage' && q.id === 'q3') q.progress += amount;
        if (type === 'card' && q.id === 'q4') q.progress += amount;
        if (type === 'spell' && q.id === 'q5') q.progress += amount;

        if (q.progress >= q.target) {
            q.progress = q.target;
            q.completed = true;
            playerProfile[q.reward.type] += q.reward.amount;
            showNotification(`Missão Concluída: ${q.desc}! +${q.reward.amount} ${q.reward.type}`, "success");
        }
    });
    saveProfile();
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

function checkAchievements() {
    playerProfile.achievements.forEach(a => {
        if (a.completed) return;

        if (a.id === 'a1' && playerProfile.stats.wins >= 1) a.progress = 1;
        if (a.id === 'a2') a.progress = playerProfile.stats.wins;

        let uniqueCards = 0;
        for (let key in playerProfile.collection) {
            if (playerProfile.collection[key] > 0) uniqueCards++;
        }
        if (a.id === 'a3') a.progress = uniqueCards;

        if (a.id === 'a4' && playerProfile.coins >= 5000) a.progress = 5000;

        // a5 is updated dynamically in draft win

        if (a.progress >= a.target) {
            a.progress = a.target;
            a.completed = true;
            if (a.reward.type === 'avatar') {
                playerProfile.unlockedAvatars.push(a.reward.value);
            } else {
                playerProfile[a.reward.type] += a.reward.amount;
            }
            showNotification(`Troféu Conquistado: ${a.desc}!`, "success");
        }
    });
    saveProfile();
}

// --- BATTLE ACTIONS & HERO POWERS ---
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
        // Target logic: let user pick any enemy (simplified to direct hero dmg if no target selector implemented, but let's just hit the enemy hero for flow)
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

function startTurn(side) {
    gameState.turn++;

    // M6 Battery logic: Normal credits reset and increment. Remaining credits DO NOT carry over.
    // Battery only fills from specific card effects.
    const maxCred = Math.min(10, Math.ceil(gameState.turn / 2));
    gameState[side].maxCredits = maxCred;
    gameState[side].credits = maxCred;
    if (currentMatchMode === 'roguelike' && gameState.turn === 1 && side === 'player') RelicManager.triggerStartCombat();
    gameState[side].heroUsed = false;

        // Mutations Turn Hook
    if (currentMatchMode === 'endless' && side === 'player') {
        triggerEndlessMutationEvent('turn');
        if (playerProfile.endlessState.activeMutation && playerProfile.endlessState.activeMutation.id === 'toxic_spores') {
            gameState.player.board.forEach(c => { if(c) c.hp -= 1; });
            gameState.opponent.board.forEach(c => { if(c) c.hp -= 1; });
            showNotification("Esporos Tóxicos causaram 1 de dano global!", "error");
        }
    }
    drawCard(side, 1);

    // Reset attack state and trigger start-of-turn auras/environments
    gameState[side].board.forEach((card, index) => {
        if (card) {
            // Remove frozen status
            if (card.keywords && card.keywords.includes('congelado')) {
                card.keywords = card.keywords.filter(k => k !== 'congelado');
                card.exhausted = true; // Still can't attack this turn
            } else {
                card.exhausted = false;
            }

            // Env effects
            const env = gameState.environments[index];
            if (env) {
                if (env.envType === 'fire-env') {
                    card.hp -= 1;
                    triggerDamageAnimation(null, null, side, index, 1);
                } else if (env.envType === 'heal-env') {
                    card.hp += 2;
                } else if (env.envType === 'dark-env') {
                    if (!card.darkEnvTimer) card.darkEnvTimer = 1;
                    else {
                        card.hp = 0; // Dies
                    }
                }
            }

            // Aura effects
            if (card.aura) {
                if (card.aura.randomDamage) {
                    const targets = [];
                    const oppSide = side === 'player' ? 'opponent' : 'player';
                    gameState[oppSide].board.forEach((c, i) => { if(c) targets.push(i); });
                    if (targets.length > 0) {
                        const targetIdx = targets[Math.floor(Math.random() * targets.length)];
                        triggerDamageAnimation(side, index, oppSide, targetIdx, card.aura.randomDamage);
                        gameState[oppSide].board[targetIdx].hp -= card.aura.randomDamage;
                    } else {
                        triggerDamageAnimation(side, index, oppSide, null, card.aura.randomDamage);
                        gameState[oppSide].hp -= card.aura.randomDamage;
                    }
                }
                if (card.aura.healHero) {
                    gameState[side].hp = Math.min(gameState[side].maxHp, gameState[side].hp + card.aura.healHero);
                }
                if (card.aura.addBattery) {
                    gameState[side].battery += card.aura.addBattery;
                }
            }
        }
    });

    checkDeadCards();
    updateBattleUI();

    if (side === 'opponent') {
        setTimeout(botTurn, 1000);
    }
}

function endTurn() {
    if (!gameState.isPlayerTurn) return;
    gameState.isPlayerTurn = false;
    updateBattleUI();
    startTurn('opponent');
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

function selectCardInHand(index) {
    if (!gameState.isPlayerTurn) return;

    const card = gameState.player.hand[index];
    if (gameState.player.credits + gameState.player.battery < card.cost) {
        showNotification("Energia insuficiente!", "error");
        return;
    }

    if (gameState.selectedCardIndex === index) {
        gameState.selectedCardIndex = null;
    } else {
        gameState.selectedCardIndex = index;
    }

    // Spells or Secrets might not need a lane target
    if (gameState.selectedCardIndex !== null && (card.type === CARD_TYPES.SPELL || card.type === CARD_TYPES.SECRET)) {
        if (card.target === 'none' || card.type === CARD_TYPES.SECRET) {
            playCard(null); // Instacast
        } else {
            // Need targetting logic... For simplicity, if it's a spell, we'll click the target directly.
            showNotification(`Selecione o alvo para ${card.name}`, "info");
            enableSpellTargeting(card);
        }
    }

    updateBattleUI();
}

function playCard(laneIndex, side = 'player') {
    if (gameState.selectedCardIndex === null && side === 'player') return;

    const handIndex = side === 'player' ? gameState.selectedCardIndex : gameState.opponent.selectedCardIndex;
    const card = gameState[side].hand[handIndex];

    // Pay cost using Credits first, then Battery
    let remainingCost = card.cost;
    if (gameState[side].credits >= remainingCost) {
        gameState[side].credits -= remainingCost;
    } else {
        remainingCost -= gameState[side].credits;
        gameState[side].credits = 0;
        gameState[side].battery -= remainingCost;
    }

    if (side === 'player') {
        matchStats.creditsSpent += card.cost;
        if (card.tribes && card.tribes.length > 0) {
            matchStats.tribesPlayed[card.tribes[0]] = (matchStats.tribesPlayed[card.tribes[0]] || 0) + 1;
        }
    }

    gameState[side].hand.splice(handIndex, 1);

    if (currentMatchMode === 'roguelike') RelicManager.triggerPlayCard(card);

    AudioManager.playSFX('card_play');
    if (card.type === CARD_TYPES.TROOP) {
        if (side === 'player') matchStats.troopsPlayed++;
        card.exhausted = true; // Summoning sickness
        gameState[side].board[laneIndex] = card;

        // M6: Trigger Battlecry
        if (card.battlecry) triggerBattlecry(side, laneIndex, card.battlecry);

    } else if (card.type === CARD_TYPES.ENVIRONMENT) {
        if (side === 'player') matchStats.envPlayed++;
        gameState.environments[laneIndex] = card;

    } else if (card.type === CARD_TYPES.SECRET) {
        gameState[side].secrets.push(card);
        showNotification(`${side === 'player' ? 'Você' : 'Oponente'} jogou um Segredo!`, "info");

    } else if (card.type === CARD_TYPES.SPELL) {
        if (side === 'player') matchStats.spellsPlayed++;
        resolveSpell(side, card, laneIndex); // Pass laneIndex as target for simplicity
    }

    if (side === 'player') {
        gameState.selectedCardIndex = null;
        updateQuests('card');
        if (card.type === CARD_TYPES.SPELL) updateQuests('spell');
    }

    updateBattleUI();
}

function resolveSpell(side, card, targetIndex) {
    if (currentMatchMode === 'roguelike' && side === 'player' && playerProfile.currentRunState && playerProfile.currentRunState.currentNodeTier === 29) {
        showNotification("ANOMALIA: O Mestre do Clima ataca!", "error");
        triggerDamageAnimation('opponent', null, 'player', null, 2);
        gameState.player.hp -= 2;
    }
    // Check for Counter-Spell Secret
    const oppSide = side === 'player' ? 'opponent' : 'player';
    const counterIdx = gameState[oppSide].secrets.findIndex(s => s.effect.cancelSpell);
    if (counterIdx > -1) {
        gameState[oppSide].secrets.splice(counterIdx, 1);
        showNotification(`SEGREDO REVELADO: Contra-Feitiço cancelou ${card.name}!`, "error");
        return;
    }

    if (card.effect.draw) {
        drawCard(side, card.effect.draw);
    }
    if (card.effect.heal) {
        gameState[side].hp = Math.min(gameState[side].maxHp, gameState[side].hp + card.effect.heal);
    }
    if (card.effect.addBattery) {
        gameState[side].battery += card.effect.addBattery;
    }
    if (card.effect.damage) {
        if (currentMatchMode === 'endless' && side === 'opponent' && playerProfile.endlessState.activeMutation && playerProfile.endlessState.activeMutation.id === 'vampirism') {
            gameState.opponent.hp += card.effect.damage;
            AudioManager.playSFX('hero_heal');
        }
        // Simple random target for now if not specified
        const oppBoard = gameState[side === 'player' ? 'opponent' : 'player'].board;
        let validTargets = [];
        oppBoard.forEach((c, i) => { if (c) validTargets.push(i); });

        if (card.target === 'all_troops') {
            gameState.player.board.forEach(c => { if(c) c.hp -= card.effect.damage; });
            gameState.opponent.board.forEach(c => { if(c) c.hp -= card.effect.damage; });
        } else if (validTargets.length > 0) {
            const tIdx = validTargets[Math.floor(Math.random() * validTargets.length)];
            triggerDamageAnimation(side, null, oppSide, tIdx, card.effect.damage);
            oppBoard[tIdx].hp -= card.effect.damage;
        } else {
            triggerDamageAnimation(side, null, oppSide, null, card.effect.damage);
            gameState[oppSide].hp -= card.effect.damage;
        }
    }
    if (card.effect.kill) {
        if (targetIndex !== null && gameState[oppSide].board[targetIndex]) {
            gameState[oppSide].board[targetIndex].hp = 0;
        }
    }

    checkDeadCards();
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

function triggerBattlecry(side, laneIndex, battlecry) {
    if (battlecry.effect.addBattery) {
        gameState[side].battery += battlecry.effect.addBattery;
    }
    if (battlecry.effect.draw) {
        drawCard(side, battlecry.effect.draw);
    }
    // Simplification for other battlecries (random targets)
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

    if (currentMatchMode === 'roguelike' && defenderIdx === null && defenderSide === 'player') {
        damageAmount = RelicManager.checkDamage(damageAmount, true);
        if (damageAmount === 0) return;
    }
    if (defenderIdx === null) AudioManager.playSFX('hero_damage');

    if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        healEl.style.left = (rect.left + rect.width/2 - 20) + 'px';
        healEl.style.top = (rect.top + rect.height/2 - 20) + 'px';
        gameContainer.appendChild(healEl);
        setTimeout(() => healEl.remove(), 1200);
    }
}

function checkDeadCards() {
    ["player", "opponent"].forEach(side => {
        gameState[side].board.forEach((card, i) => {
            if (card && card.hp <= 0) {
                // Necromancy check
                if (card.keywords && card.keywords.includes('necromancia_infinita')) {
                    card.hp = card.baseHp; // Respawn
                    showNotification(`${card.name} renasceu das cinzas!`, "info");
                } else if (card.keywords && card.keywords.includes('necromancia')) {
                    card.keywords = card.keywords.filter(k => k !== 'necromancia'); // remove keyword
                    card.hp = card.baseHp; // Respawn once
                    showNotification(`${card.name} usou necromancia!`, "info");
                } else {
                    // M6: Graveyard push
                    gameState[side].graveyard.push(card.id);
                    // Deathrattle check
                    if (card.deathrattle) {
                        if (card.deathrattle.effect.draw) drawCard(side, card.deathrattle.effect.draw);
                    }
                    gameState[side].board[i] = null;
                }
            }
        });
    });
}




function endGame(isWin) {
    AudioManager.playBGM(isWin ? 'bgm_victory' : 'bgm_defeat');

    // Clear the board visual state
    const battleScreen = document.getElementById('battle-screen');
    if (battleScreen) battleScreen.classList.add('hidden');

    const resultsScreen = document.getElementById('game-over-overlay');
    if (resultsScreen) {
        resultsScreen.classList.remove('hidden');
    }

    const title = document.getElementById('game-over-title');
    const rewards = document.getElementById('game-over-rewards');
    const btnReturnMenu = document.getElementById('btn-return-menu');

    if (isWin) {
        if(title) { title.innerText = "VITÓRIA!"; title.style.color = "#FFD700"; }
        if(rewards) rewards.innerText = "+25 XP | +10 Moedas";

        addXP(25);
        playerProfile.coins += 10;

        // Battle Pass integration (Módulo 8.1)
        if(typeof addCrowns === 'function') addCrowns(10);
        // Grant a chest if there's an empty slot
        if (!playerProfile.chests) playerProfile.chests = [null, null, null, null];
        const emptySlotIdx = playerProfile.chests.findIndex(c => c === null);
        if (emptySlotIdx !== -1) {
            playerProfile.chests[emptySlotIdx] = { id: 'basic_chest', unlockTime: Date.now() + 30000 }; // 30 sec dummy
        }


        if (currentMatchMode === 'ranked') {
            playerProfile.elo += 25;
            playerProfile.rankedWins++;
        }

    } else {
        if(title) { title.innerText = "DERROTA"; title.style.color = "#FF4444"; }
        if(rewards) rewards.innerText = "+5 XP | +2 Moedas";

        addXP(5);
        playerProfile.coins += 2;

        // Battle Pass integration (Módulo 8.1)
        if(typeof addCrowns === 'function') addCrowns(2);

        if (currentMatchMode === 'ranked') {
            playerProfile.elo = Math.max(0, playerProfile.elo - 15);
            playerProfile.rankedLosses++;
        }
    }

    // Endless Mode End Game Logic (Módulo 9.1)
    if (currentMatchMode === 'endless') {
        if (isWin) {
            const s = playerProfile.endlessState;
            if(!s) return;

            // Recompensa Exponencial
            let lootEarned = Math.floor(20 * Math.pow(1.15, s.currentWave));
            s.loot += lootEarned;

            // Heal 20% max HP
            let healAmt = Math.floor(s.maxPlayerHp * 0.20);
            s.playerHp = Math.min(s.maxPlayerHp, gameState.player.hp + healAmt);

            if(rewards) rewards.innerText = `Onda ${s.currentWave} Concluída! (+${lootEarned} 💰 na sacola)`;

            saveProfile();

            if (btnReturnMenu) {
                btnReturnMenu.innerText = "Continuar";
                btnReturnMenu.onclick = () => {
                    if(resultsScreen) resultsScreen.classList.add('hidden');
                    if (s.currentWave % 5 === 0) {
                        // Trigger Risk / Reward Modal
                        openEndlessDecisionModal();
                    } else {
                        s.currentWave++;
                        saveProfile();
                        startMatchmaking(false); // Next wave
                    }
                };
            }
            return; // Skip standard return to menu

        } else {
            // Defeat in endless
            const s = playerProfile.endlessState;
            if(!s) return;
            const keptLoot = Math.floor(s.loot * 0.3); // Perde 70%
            playerProfile.coins += keptLoot;

            showNotification(`Fim da Linha! Você sobreviveu até a Onda ${s.currentWave}. Você salvou ${keptLoot} Moedas.`, "error");

            saveEndlessLeaderboard(s.currentWave, s.dominantTribe, keptLoot);

            playerProfile.endlessState = null;
            saveProfile();

            if (btnReturnMenu) {
                btnReturnMenu.innerText = "Voltar";
                btnReturnMenu.onclick = () => {
                    if(resultsScreen) resultsScreen.classList.add('hidden');
                    showScreen(screens.LEADERBOARD);
                };
            }
            return; // Skip standard return to menu
        }
    }

    // Roguelike End Game Logic (Módulo 9)
    if (currentMatchMode === 'roguelike') {
        if (isWin) {
            playerProfile.roguelikeState.currentNode.completed = true;
            playerProfile.roguelikeState.coins += 15;
            playerProfile.roguelikeState.playerHp = gameState.player.hp;
            saveProfile();
            if(rewards) rewards.innerText += " | +15 Ouro (Run)";
        } else {
            playerProfile.roguelikeState = null;
            saveProfile();
        }
    }

    saveProfile();
    updateUIProfile();

    // Default return to menu behavior
    if (btnReturnMenu) {
        btnReturnMenu.innerText = "Voltar ao Menu";
        btnReturnMenu.onclick = () => {
            if(resultsScreen) resultsScreen.classList.add('hidden');
            if (currentMatchMode === 'roguelike' && isWin) {
                renderMapScreen();
            } else if (currentMatchMode === 'roguelike' && !isWin) {
                showScreen(screens.MENU);
            } else {
                showScreen(screens.MENU);
            }
            AudioManager.playBGM('bgm_menu');
        };
    }
}

function checkWinCondition() {
    const pRatio = gameState.player.hp / gameState.player.maxHp;
    const oRatio = gameState.opponent.hp / gameState.opponent.maxHp;
    if (pRatio <= 0.3 || oRatio <= 0.3) {
        AudioManager.playBGM('bgm_battle_tension');
    }
    if (gameState.player.hp <= 0 && gameState.opponent.hp <= 0) {
        endGame(false); // Tie goes to opponent for simplicity
    } else if (gameState.opponent.hp <= 0) {
        endGame(true);
    } else if (gameState.player.hp <= 0) {
        endGame(false);
    }
}



// Chest Time Updater
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


function triggerEndlessMutationEvent(event, target) {
    if (currentMatchMode !== 'endless' || !playerProfile.endlessState || !playerProfile.endlessState.activeMutation) return;
    const mut = playerProfile.endlessState.activeMutation;

    if (event === 'turn' && mut.effect === 'toxic_gas') {
        // Example logic: damage all troops slightly each turn
        const side = gameState.isPlayerTurn ? 'player' : 'opponent';
        gameState[side].board.forEach((card, idx) => {
            if(card) {
                card.hp -= 1;
                triggerDamageAnimation(side === 'player'?'opponent':'player', null, side, idx, 1);
            }
        });
    }
}

// --- MATCHMAKING & VS SCREEN ---

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


function startBattle() {
    // Reset battle state
    gameState.turn = 0;
    gameState.player.hp = gameState.player.maxHp = (currentMatchMode === 'endless' && playerProfile.endlessState) ? playerProfile.endlessState.playerHp : 30;
    gameState.opponent.hp = gameState.opponent.maxHp = (currentMatchMode === 'endless' && playerProfile.endlessState) ? 30 + (playerProfile.endlessState.currentWave * 5) : 30;

    gameState.player.credits = 1;
    gameState.player.maxCredits = 1;
    gameState.opponent.credits = 1;
    gameState.opponent.maxCredits = 1;

    gameState.player.battery = 0;
    gameState.opponent.battery = 0;

    gameState.player.board = [null, null, null, null, null];
    gameState.opponent.board = [null, null, null, null, null];

    gameState.player.secrets = [];
    gameState.opponent.secrets = [];

    // Módulo 9.1 Mutations logic
    if (currentMatchMode === 'endless' && playerProfile.endlessState && playerProfile.endlessState.activeMutation) {
        const mut = playerProfile.endlessState.activeMutation;
        if (mut.effect === 'all_poison') {
            // Apply logic during summon
        } else if (mut.effect === 'double_damage') {
            // Handled in triggerDamageAnimation or executeAttack
        } else if (mut.effect === 'no_heal') {
            // Handled in heal functions
        } else if (mut.effect === 'half_energy') {
             gameState.player.maxCredits = Math.ceil(gameState.player.maxCredits / 2);
        }
    }

    // Deck and Hand
    gameState.player.deck = [...playerProfile.deck].sort(() => 0.5 - Math.random());
    gameState.player.hand = [];

    gameState.opponent.deck = [...playerProfile.deck].sort(() => 0.5 - Math.random()); // Fake deck for opponent
    gameState.opponent.hand = [];

    for(let i = 0; i < 5; i++) {
        drawCard('player');
        drawCard('opponent');
    }

    AudioManager.playBGM('bgm_battle_1');
    updateBattleUI();

    // Start game
    gameState.isPlayerTurn = Math.random() > 0.5;
    if (gameState.isPlayerTurn) {
        startTurn('player');
    } else {
        startTurn('opponent');
        if (gameState.opponent.isBot) {
            botTurn();
        }
    }
}

// --- HEURISTIC AI & BOT EMOTES ---
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

function evaluateLethal() {
    let potentialDamage = 0;
    gameState.opponent.board.forEach(card => {
        if (card && !card.exhausted && card.atk > 0) potentialDamage += card.atk;
    });
    // Check hand for spells that deal direct damage
    gameState.opponent.hand.forEach(card => {
        if (card.type === CARD_TYPES.SPELL && card.effect.damage && (card.target === 'any' || card.target === 'enemy_hero')) {
            if (gameState.opponent.credits + gameState.opponent.battery >= card.cost) {
                potentialDamage += card.effect.damage;
            }
        }
    });
    return potentialDamage >= gameState.player.hp;
}

function botTurn() {
    triggerBotEmote('calculating');

    setTimeout(() => {
        const level = gameState.opponent.botLevel || 'easy';

        // 1. Play Cards Phase
        for (let i = gameState.opponent.hand.length - 1; i >= 0; i--) {
            const card = gameState.opponent.hand[i];
            const totalEnergy = gameState.opponent.credits + gameState.opponent.battery;

            if (totalEnergy >= card.cost) {
                if (card.type === CARD_TYPES.TROOP || card.type === CARD_TYPES.ENVIRONMENT) {
                    const emptyLanes = [];
                    for(let j=0; j<5; j++) if(!gameState.opponent.board[j]) emptyLanes.push(j);

                    if (emptyLanes.length > 0) {
                        gameState.opponent.selectedCardIndex = i;
                        // Smart placement for higher levels
                        let targetLane = emptyLanes[Math.floor(Math.random() * emptyLanes.length)];

                        if (level === 'hard' || level === 'expert') {
                            // Try to block player's highest attack card
                            let highestThreatLane = -1;
                            let maxThreat = -1;
                            for (let pLane = 0; pLane < 5; pLane++) {
                                const pCard = gameState.player.board[pLane];
                                if (pCard && pCard.atk > maxThreat && emptyLanes.includes(pLane)) {
                                    maxThreat = pCard.atk;
                                    highestThreatLane = pLane;
                                }
                            }
                            if (highestThreatLane !== -1) targetLane = highestThreatLane;
                        }

                        playCard(targetLane, 'opponent');
                    }
                } else if (card.type === CARD_TYPES.SPELL) {
                    gameState.opponent.selectedCardIndex = i;
                    let targetIndex = null;
                    if (card.effect.damage && card.target.includes('troop')) {
                        const targets = [];
                        gameState.player.board.forEach((c, idx) => { if(c) targets.push(idx); });
                        if (targets.length > 0) {
                            if (level === 'hard' || level === 'expert') {
                                // Target highest threat
                                targets.sort((a,b) => gameState.player.board[b].atk - gameState.player.board[a].atk);
                                targetIndex = targets[0];
                            } else {
                                targetIndex = targets[Math.floor(Math.random() * targets.length)];
                            }
                        }
                    }
                    playCard(targetIndex, 'opponent');
                } else if (card.type === CARD_TYPES.SECRET) {
                    gameState.opponent.selectedCardIndex = i;
                    playCard(null, 'opponent');
                }
            }
        }

        // 2. Attack Phase
        if (evaluateLethal()) triggerBotEmote('lethal');

        let attackPromises = [];
        for (let i = 0; i < 5; i++) {
            const card = gameState.opponent.board[i];
            if (card && !card.exhausted && card.atk > 0 && !(card.keywords && card.keywords.includes('defensor'))) {
                attackPromises.push(new Promise(resolve => {
                    setTimeout(() => {
                        const attackerEl = document.querySelector(`#opp-slot-${i} .card`);
                        if(attackerEl) attackerEl.classList.add('attack-animation-bot');

                        // Secret check
                        const pSecretIdx = gameState.player.secrets.findIndex(s => s.trigger === 'on_attacked');
                        if (pSecretIdx > -1 && gameState.player.secrets[pSecretIdx].effect.killAttacker) {
                            card.hp = 0;
                            showNotification(`SEGREDO REVELADO: ${gameState.player.secrets[pSecretIdx].name} destruiu o atacante!`, "success");
                            gameState.player.secrets.splice(pSecretIdx, 1);
                            checkDeadCards();
                            updateBattleUI();
                            resolve();
                            return;
                        }

                        setTimeout(() => {
                            const pCard = gameState.player.board[i];
                            if (pCard) {
                                // Trade
                                let pDmg = pCard.atk;
                                let oDmg = card.atk;

                                if (pCard.keywords && pCard.keywords.includes('escudo')) { pCard.keywords = pCard.keywords.filter(k=>k!=='escudo'); oDmg = 0; }
                                if (card.keywords && card.keywords.includes('escudo')) { card.keywords = card.keywords.filter(k=>k!=='escudo'); pDmg = 0; }

                                pCard.hp -= oDmg;
                                card.hp -= pDmg;

                                if(card.keywords && card.keywords.includes('veneno') && oDmg>0) pCard.hp = 0;
                                if(pCard.keywords && pCard.keywords.includes('veneno') && pDmg>0) card.hp = 0;

                                triggerDamageAnimation('opponent', i, 'player', i, oDmg);
                                if (pDmg > 0) triggerDamageAnimation('player', i, 'opponent', i, pDmg);

                                const pSlotEl = document.querySelector(`#player-slot-${i} .card`);
                                if(pSlotEl) pSlotEl.classList.add('collision-flash');

                            } else {
                                // Face
                                const hSecretIdx = gameState.player.secrets.findIndex(s => s.trigger === 'on_hero_attacked');
                                if (hSecretIdx > -1 && gameState.player.secrets[hSecretIdx].effect.preventDamage) {
                                    showNotification(`SEGREDO REVELADO: Preveniu o ataque do oponente!`, "success");
                                    if(gameState.player.secrets[hSecretIdx].effect.summon) {
                                        gameState.player.board[i] = JSON.parse(JSON.stringify(getCardById(gameState.player.secrets[hSecretIdx].effect.summon)));
                                    }
                                    gameState.player.secrets.splice(hSecretIdx, 1);
                                } else {
                                    gameState.player.hp -= card.atk;
                                    triggerDamageAnimation('opponent', i, 'player', null, card.atk);

                                    const pAvatar = document.getElementById('battle-player-avatar');
                                    if(pAvatar) {
                                        pAvatar.classList.add('screen-shake');
                                        setTimeout(() => pAvatar.classList.remove('screen-shake'), 400);
                                    }
                                    triggerBotEmote('damage');
                                }
                            }

                            if(attackerEl) attackerEl.classList.remove('attack-animation-bot');
                            card.exhausted = true;
                            checkDeadCards();
                            updateBattleUI();
                            resolve();
                        }, 200);
                    }, i * 600); // Stagger attacks
                }));
            }
        }

        Promise.all(attackPromises).then(() => {
            setTimeout(() => {
                checkWinCondition();
                if (gameState.opponent.hp > 0 && gameState.player.hp > 0) {
                    gameState.isPlayerTurn = true;
                    startTurn('player');
                }
            }, 500);
        });

    }, 1500);
}


// --- ENDLESS MODALS & LEADERBOARD ---
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



// --- ENDLESS MODE INITIALIZATION ---
function startEndlessMode() {
    if (playerProfile.deck.length < 40) {
        showNotification("Seu deck precisa de 40 cartas para jogar o Modo Infinito!", "error");
        return;
    }

    playerProfile.endlessState = {
        currentWave: 1,
        loot: 0,
        playerHp: 30, // Start with 30 HP
        maxPlayerHp: 30,
        dominantTribe: 'Neutro', // Can be updated during run
        activeMutation: { name: "Nenhuma", effect: "Padrão" }
    };

    saveProfile();
    currentMatchMode = 'endless';
    startMatchmaking(true);
}



// --- BOTTOM NAV BAR LOGIC (SPA) ---
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
