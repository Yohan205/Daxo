const { Client, Message } = require('discord.js');


module.exports = {
    name: "skip",
    desc: "Salta a la siguiente canción o a la posición que digas",
    usage: "skip [3]",
    aliases: ["skip", "jump"],
    isPrivate: false,
    guildOnly: false,
    category: "music",
    cooldown: 5,
    status: true,
    /**
    * @param {Client} botxi
    * @param {Message} message
    * @param {String} args
    * @returns
    */
    run: async(botxi, message, args) => {
        if (!args[0]) {
            message.channel.send("Reproduciendo el siguiente contenido")
            message.channel.sendTyping()
            botxi.distube.skip(message);
        } else {
            botxi.distube.jump(message, parseInt(args[0]))
            .catch(err => message.channel.send("No leí una posición válida."));
        }
    }
}