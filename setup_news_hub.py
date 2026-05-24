import re

with open("script.js", "r") as f:
    js = f.read()

patch_notes_code = """
/*
=============================================================================
🛠️ ZONA DO DESENVOLVEDOR - BANCO DE DADOS DE ATUALIZAÇÕES (PATCH NOTES) 🛠️
=============================================================================
COMO ADICIONAR UM NOVO PATCH:
1. Copie o bloco de um objeto existente (com { id, version, date, title... }).
2. Cole no topo deste array (para ficar em primeiro na lista).
3. Mude o 'id' para um valor único, ex: 'patch_1_1'.
4. Escreva o conteúdo livremente usando tags HTML como <strong>, <ul> e <li>.
=============================================================================
*/
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
"""

js = js.replace("(() => {\n'use strict';", "(() => {\n'use strict';\n\n" + patch_notes_code)

with open("script.js", "w") as f:
    f.write(js)
