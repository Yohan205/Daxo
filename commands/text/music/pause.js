const { Client, Message } = require('discord.js');


module.exports = {
    name: "pause",
    desc: "Pausa lo que esté en reproducción",
    usage: "pause",
    aliases: ["pause","pausar"],
    isPrivate: false,
    guildOnly: false,
    category: "music",
    cooldown: 2,
    status: true,
    /**
    * @param {Client} botxi
    * @param {Message} message
    * @param {String} args
    * @returns
    */
    run: async(botxi, message, args) => {
        const queue = botxi.distube.getQueue(message.guild.id);
        if (!queue) return message.reply("La cola está vacía...\nPuedes agregar algo con el comando \`play\`");
        botxi.distube.pause(queue)
    }
}