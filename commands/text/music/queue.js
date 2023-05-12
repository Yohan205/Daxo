const { Client, Message } = require('discord.js');


module.exports = {
    name: "queue",
    desc: "Muestra la cola de canciones actualmente.",
    usage: "queue [página]",
    aliases: ["queue", "q"],
    isPrivate: false,
    guildOnly: false,
    category: "music",
    cooldown: 10,
    status: true,
    /**
    * @param {Client} botxi
    * @param {Message} message
    * @param {String} args
    * @returns
    */
    run: async(botxi, message, args) => {
        const queue = botxi.distube.getQueue(message.guild.id);

        if (!queue) return message.reply("Parece que no hay nada en cola...😶‍🌫️ Que tal si agregas algo? \n Usa el comando \`play\` y me dices la 🎶 canción 🎵 que quieras 😉");

        message.channel.send('Cola actual:\n' + queue.songs.map((song, id) =>
            `**${id+1}**. _${song.name}_ - \`${song.formattedDuration}\``
        ).join("\n"));
    }
}