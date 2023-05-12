module.exports = {
    name: "resume",
    description: "Continúa reproduciendo lo que hay en lista",
    type: 1,
    run: (botxi, int) => {
        int.channel.sendTyping();

        const queue = botxi.distube.getQueue(int.guild.id);

        if (!queue) return int.reply("Parece que no hay nada en cola...😶‍🌫️ Que tal si agregas algo? \n Usa el comando \`play\` y me dices la 🎶 canción 🎵 que quieras 😉");

        const songs = queue.songs.map((s, id) => `**${id? id : 'Sonando🎵'}**: ${s.name} - \`${s.formattedDuration}\` `).slice(0, 10).join('\n');
        
        botxi.distube.resume(queue);
        int.reply({content: songs});
    }
}