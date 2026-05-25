const GAME_PATCH_NOTES = [
    {
        id: 'patch_1_0_0',
        version: 'v1.0.0',
        date: '22 Mai 2026',
        title: 'O Despertar da Arena',
        subtitle: 'Lançamento Oficial e Novas Mecânicas!',
        content: `
            Bem-vindos ao lançamento oficial do <strong>Emoji Arena</strong>! Foram meses de balanceamento e desenvolvimento intenso.
            <br><br>
            <strong>Novidades Principais:</strong>
            <ul>
                <li>O Modo <em>Fenda da Eternidade</em> foi adicionado. Tente sobreviver o máximo que puder para recompensas exponenciais!</li>
                <li>Mutações Pós-Combate (Roguelike): Agora os inimigos recebem buffs passivos a cada 5 ondas.</li>
                <li>O novo sistema de <em>SecOps</em> bane trapaceiros e criptografa seu save.</li>
            </ul>
            <br>
            <strong>Balanceamento:</strong>
            <ul>
                <li>[Dragão Ancião]: Custo reduzido de 10 para 9.</li>
                <li>[Lorde Vampiro]: Roubo de vida ajustado para equilibrar as partidas.</li>
            </ul>
        `
    }
];

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

if (typeof CARD_TYPES !== 'undefined') Object.freeze(CARD_TYPES);
if (typeof RARITIES !== 'undefined') Object.freeze(RARITIES);
if (typeof TRIBES !== 'undefined') Object.freeze(TRIBES);
if (typeof HEROES !== 'undefined') Object.freeze(HEROES);
if (typeof CardDatabase !== 'undefined') Object.freeze(CardDatabase);
if (typeof DAILY_QUESTS !== 'undefined') Object.freeze(DAILY_QUESTS);
if (typeof ACHIEVEMENTS !== 'undefined') Object.freeze(ACHIEVEMENTS);
if (typeof ENDLESS_MUTATIONS !== 'undefined') Object.freeze(ENDLESS_MUTATIONS);

function getCardById(id) {
    return CardDatabase.find(c => c.id === id);
}