import re

with open("script.js", "r") as f:
    js = f.read()

vault_logic = """
function claimArenaVault(wins) {
    // Escala de recompensas garantida
    const goldReward = wins * 50 + 50; // Mínimo 50, Máximo 650
    const stardustReward = wins * 20; // Mínimo 0, Máximo 240
    let packsToGive = 0;

    if (wins >= 3) packsToGive = 1;
    if (wins >= 7) packsToGive = 2;
    if (wins === 12) packsToGive = 3;

    playerProfile.coins += goldReward;
    playerProfile.stardust += stardustReward;

    // Simplificando packs dando gold extra pra comprar, ou podemos dar as cartas direto.
    // Vamos dar ouro equivalente ao pacote básico (100) pra cada pack ganho.
    playerProfile.coins += (packsToGive * 100);

    let msg = `O Cofre da Arena foi aberto! (${wins} Vitórias)\\n`;
    msg += `+${goldReward + (packsToGive * 100)} Moedas `;
    if (stardustReward > 0) msg += `| +${stardustReward} Pó Estelar `;
    if (packsToGive > 0) msg += `(Inclui Bônus de Pacotes)`;

    showNotification(msg, "success");

    // Try to trigger achievement if 12 wins
    if (wins === 12) {
        const ach = playerProfile.achievements.find(a => a.id === 'a5');
        if (ach && !ach.completed) {
            ach.progress = 1;
            ach.completed = true;
            playerProfile.unlockedAvatars.push(ach.reward.value);
            showNotification(`Troféu Conquistado: ${ach.desc}!`, "success");
        }
    }

    playerProfile.arenaState = null;
    saveProfile();
    showScreenSPA('main-menu');
}
"""

js = js.replace("function startArenaDraft() {", vault_logic + "\nfunction startArenaDraft() {")

with open("script.js", "w") as f:
    f.write(js)
