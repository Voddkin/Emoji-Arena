import re

with open("script.js", "r") as f:
    js = f.read()

translations = {
    # It appears I've missed translating some english card desc!
    "name: 'Elven Archer', desc: 'Attacks safely from distance.'": "name: 'Arqueira Élfica', desc: 'Ataca com segurança à distância.'",
    "name: 'Dwarven Knight', desc: 'A sturdy defender.'": "name: 'Cavaleiro Anão', desc: 'Um defensor resistente.'",
    "name: 'Fire Mage', desc: 'Deals 2 damage on play.'": "name: 'Mago de Fogo', desc: 'Causa 2 de dano ao jogar.'",
    "name: 'Orc Boss', desc: 'Strong leader.'": "name: 'Chefe Orc', desc: 'Líder forte.'",
    "name: 'Street Thug', desc: 'Fights dirty.'": "name: 'Vândalo de Rua', desc: 'Luta sujo.'",
    "name: 'Stray Dog', desc: 'Loyal companion.'": "name: 'Cachorro de Rua', desc: 'Companheiro leal.'",
    "name: 'Water Elemental', desc: 'Flows like a river.'": "name: 'Elemental de Água', desc: 'Flui como um rio.'",
    "name: 'Mystic Healer', desc: 'Heals the hero.'": "name: 'Curandeira Mística', desc: 'Cura o herói.'",
    "name: 'Rusty Sword', desc: 'Better than bare hands.'": "name: 'Espada Enferrujada', desc: 'Melhor que mãos nuas.'",
    "name: 'Fireball', desc: 'Deal 3 damage.'": "name: 'Bola de Fogo', desc: 'Causa 3 de dano.'",
    "name: 'Heal', desc: 'Restore 3 HP.'": "name: 'Cura', desc: 'Restaura 3 de HP.'",
    "name: 'Shield Up', desc: 'Give a troop +2 HP.'": "name: 'Levantar Escudo', desc: 'Concede +2 de HP a uma tropa.'",
    "name: 'Pizza Delivery', desc: 'Fast food.'": "name: 'Entregador de Pizza', desc: 'Comida rápida.'",
    "name: 'Sports Car', desc: 'Vroom.'": "name: 'Carro Esportivo', desc: 'Vrum.'",
    "name: 'Doctor', desc: 'Medical professional.'": "name: 'Médico', desc: 'Profissional da saúde.'",
    "name: 'Rain Cloud', desc: 'It is getting wet.'": "name: 'Nuvem de Chuva', desc: 'Está ficando molhado.'",
    "name: 'Mountain Peak', desc: 'High ground.'": "name: 'Pico da Montanha', desc: 'Terreno elevado.'",
    "name: 'Crystal Ball', desc: 'Sees the future.'": "name: 'Bola de Cristal', desc: 'Vê o futuro.'",
    "name: 'Robot', desc: 'Beep boop.'": "name: 'Robô', desc: 'Beep boop.'",
    "name: 'Dragon', desc: 'Breathes fire. Devastating.'": "name: 'Dragão', desc: 'Cospe fogo. Devastador.'",
    "name: 'Vampire Lord', desc: 'Drains life from enemies.'": "name: 'Lorde Vampiro', desc: 'Drena a vida dos inimigos.'",
    "name: 'Ninja', desc: 'Strikes first.'": "name: 'Ninja', desc: 'Ataca primeiro.'",
    "name: 'Toxic Slime', desc: 'Lethal touch.'": "name: 'Lodo Tóxico', desc: 'Toque letal.'",
    "name: 'Meteor Strike', desc: 'Deal 5 damage.'": "name: 'Chuva de Meteoros', desc: 'Causa 5 de dano.'",
    "name: 'Magic Shield', desc: 'Absorbs next attack.'": "name: 'Escudo Mágico', desc: 'Absorve o próximo ataque.'",
    "name: 'Poison Trap', desc: 'Destroy next attacker.'": "name: 'Armadilha Venenosa', desc: 'Destrói o próximo atacante.'",
    "name: 'Enchanted Forest', desc: 'All allied troops gain +1/+1.'": "name: 'Floresta Encantada', desc: 'Todas as tropas aliadas recebem +1/+1.'",
}

for eng, pt in translations.items():
    js = js.replace(eng, pt)

with open("script.js", "w") as f:
    f.write(js)
