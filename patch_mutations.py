with open("script.js", "r") as f:
    js = f.read()

mutations_logic = """
// --- GLOBAL MUTATIONS (ENDLESS) ---
const ENDLESS_MUTATIONS = [
    { id: 'zero_grav', name: 'Gravidade Zero', icon: '🌌', desc: 'Cartas da tribo Construção ou Ferramenta custam o dobro.',
      hookDraw: (card) => {
          if (card.tribes && (card.tribes.includes(TRIBES.FERRAMENTA) || card.tribes.includes('Construção'))) {
              card.cost *= 2;
          }
      }
    },
    { id: 'blood_moon', name: 'Lua de Sangue', icon: '🌑', desc: 'Sempre que uma tropa atacar, ela toma 1 de dano.',
      hookAttack: (attacker) => { attacker.hp -= 1; }
    },
    { id: 'toxic_spores', name: 'Esporos Tóxicos', icon: '🍄', desc: 'No fim do turno, todas as tropas tomam 1 de dano.' }, // Handled in startTurn (which acts as end of previous)
    { id: 'haste_aura', name: 'Aura de Ímpeto', icon: '⚡', desc: 'Todas as tropas inimigas ganham +2 de Ataque no momento em que são jogadas.',
      hookEnemyPlay: (card) => { if(card.type === CARD_TYPES.TROOP) card.atk += 2; }
    },
    { id: 'vampirism', name: 'Sede de Sangue', icon: '🧛', desc: 'Dano causado por feitiços inimigos cura o Herói deles na mesma proporção.' }, // Handled in resolveSpell
    { id: 'fragile_minds', name: 'Mentes Frágeis', icon: '🧠', desc: 'Comprar cartas extras (além da 1ª do turno) custa 1 HP do Herói.',
      hookDrawExtra: () => { gameState.player.hp -= 1; AudioManager.playSFX('hero_damage'); }
    },
    { id: 'titan_shield', name: 'Escudos Titânicos', icon: '🛡️', desc: 'Todas as tropas inimigas entram com Escudo.',
      hookEnemyPlay: (card) => { if(card.type === CARD_TYPES.TROOP) { if(!card.keywords) card.keywords=[]; card.keywords.push('escudo'); } }
    },
    { id: 'decay', name: 'Decadência', icon: '🍂', desc: 'Toda rodada o Herói do jogador perde 1 HP máximo.',
      hookTurn: () => { gameState.player.maxHp = Math.max(1, gameState.player.maxHp - 1); gameState.player.hp = Math.min(gameState.player.hp, gameState.player.maxHp); }
    }
];

function triggerEndlessMutationEvent(event, data) {
    if (currentMatchMode !== 'endless' || !playerProfile.endlessState || !playerProfile.endlessState.activeMutation) return;
    const mut = playerProfile.endlessState.activeMutation;
    const mutObj = ENDLESS_MUTATIONS.find(m => m.id === mut.id);
    if (!mutObj) return;

    if (event === 'attack' && mutObj.hookAttack) mutObj.hookAttack(data);
    if (event === 'enemyPlay' && mutObj.hookEnemyPlay) mutObj.hookEnemyPlay(data);
    if (event === 'drawExtra' && mutObj.hookDrawExtra) mutObj.hookDrawExtra();
    if (event === 'turn' && mutObj.hookTurn) mutObj.hookTurn();
}
"""

js = js.replace("// --- ENDLESS MODE (A FENDA DA ETERNIDADE) ---", mutations_logic + "\n// --- ENDLESS MODE (A FENDA DA ETERNIDADE) ---")


# Inject Hooks
# 1. Attack hook
js = js.replace("let pDmg = attackerCard.atk;", "let pDmg = attackerCard.atk;\n            triggerEndlessMutationEvent('attack', attackerCard);")
js = js.replace("let oDmg = defenderCard.atk;", "let oDmg = defenderCard.atk;\n            triggerEndlessMutationEvent('attack', defenderCard);")

# 2. Enemy Play hook
js = js.replace("gameState.opponent.board[laneIndex] = card;", "gameState.opponent.board[laneIndex] = card;\n        if (side === 'opponent') triggerEndlessMutationEvent('enemyPlay', card);")

# 3. Turn & Toxic Spores hook
turn_hook = """    // Mutations Turn Hook
    if (currentMatchMode === 'endless' && side === 'player') {
        triggerEndlessMutationEvent('turn');
        if (playerProfile.endlessState.activeMutation && playerProfile.endlessState.activeMutation.id === 'toxic_spores') {
            gameState.player.board.forEach(c => { if(c) c.hp -= 1; });
            gameState.opponent.board.forEach(c => { if(c) c.hp -= 1; });
            showNotification("Esporos Tóxicos causaram 1 de dano global!", "error");
        }
    }"""
js = js.replace("drawCard(side, 1);", turn_hook + "\n    drawCard(side, 1);")

# 4. Spell Vampirism Hook
res_spell_old = """if (card.effect.damage) {"""
res_spell_new = """if (card.effect.damage) {
        if (currentMatchMode === 'endless' && side === 'opponent' && playerProfile.endlessState.activeMutation && playerProfile.endlessState.activeMutation.id === 'vampirism') {
            gameState.opponent.hp += card.effect.damage;
            AudioManager.playSFX('hero_heal');
        }"""
js = js.replace(res_spell_old, res_spell_new)

# 5. Endless Draw Hack (We don't have the explicit drawCard function parsed, we will intercept whenever hands are pushed or drawn using a dirty array proxy hack in init or find the exact text)
# Actually, since I can't grep drawCard reliably, I'll hook into `drawCard` if it exists.
import re
if re.search(r'function drawCard', js):
    draw_old = "function drawCard(side, amount) {"
    draw_new = """function drawCard(side, amount) {
    if (side === 'player' && amount > 1) {
        for(let k=1; k<amount; k++) triggerEndlessMutationEvent('drawExtra');
    }"""
    js = js.replace(draw_old, draw_new)

with open("script.js", "w") as f:
    f.write(js)
