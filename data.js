const GAME_PATCH_NOTES = [





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


const CardDatabase = [


const DAILY_QUESTS = [


const ACHIEVEMENTS = [

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