const { Client, Message } = require('discord.js');


module.exports = {
    name: "resume",
    desc: "Continua con lo que esté en cola",
    usage: "resume",
    aliases: ["resume",],
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
    run: async(botxi, message) => {
        const queue = botxi.distube.getQueue(message.guild.id);
        if (!queue) return message.reply("La cola está vacía...\nPuedes agregar algo con el comando \`play\`");
        botxi.distube.stop(queue)
        message.channel.send("Se detuvo el reproductor.")
    }
}