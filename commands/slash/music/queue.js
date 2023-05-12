module.exports = {
    name: "queue",
    description: "Muestra la lista de reproducción",
    type: 1,
    run: (botxi, int) => {
        int.channel.sendTyping();

        //Get the queue (Object)
        const queue = botxi.distube.getQueue(int.guild.id);
        // console.log(botxi.distube, queue);

        if (!queue) return int.reply("Parece que no hay nada en cola...😶‍🌫️ Que tal si agregas algo? \n Usa el comando \`play\` y me dices la 🎶 canción 🎵 que quieras 😉");

        const songs = queue.songs.map((s, id) => `**${id? id : 'Sonando🎵'}**: ${s.name} - \`${s.formattedDuration}\` `).slice(0, 10).join('\n');

        int.reply({content: songs});
    }
}