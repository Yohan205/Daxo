const { Client, Message } = require('discord.js');


module.exports = {
    name: "search",
    desc: "Buscar una canción o video en youtube",
    usage: "search <Video o canción a buscar>",
    aliases: ["search", "find"],
    isPrivate: false,
    guildOnly: false,
    category: "music",
    cooldown: 5,
    status: false,
    /**
    * @param {Client} botxi
    * @param {Message} message
    * @param {String} args
    * @returns
    */
    run: async(botxi, message, args) => {
        if (!args) return message.reply("Olvidaste decirme qué video o canción buscar.");
        console.log(botxi.distube.search(args.join(" ")));
        
    }
}