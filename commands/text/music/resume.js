const { Client, Message } = require('discord.js');


module.exports = {
    name: "resume",
    desc: "Continua reproduciendo lo que hay en lista",
    usage: "resume",
    aliases: ["resume",],
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
    run: async(botxi, message) => {
        const queue = botxi.distube.getQueue(message.guild.id);
        if (!queue) return message.reply("La cola está vacía...😶‍🌫️ \nPor qué no agregar algo de música 🎵 a éste momento? \nUsa el comando \`play\`");
        botxi.distube.resume(queue);
    }
}