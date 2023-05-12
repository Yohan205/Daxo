module.exports = {
    name: "pause",
    description: "Pausa el reproductor",
    type: 1,
    run: (botxi, int) => {
        int.channel.sendTyping();

        const queue = botxi.distube.getQueue(int.guild.id);

        if (!queue) return int.reply("Parece que no hay nada en cola...😶‍🌫️ Que tal si agregas algo? \n Usa el comando \`play\` y me dices la 🎶 canción 🎵 que quieras 😉");

        botxi.distube.pause(queue);
        int.reply({content:"Has pausado el reproductor 😕"});
    }
}