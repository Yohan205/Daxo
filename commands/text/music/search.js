const { Client, Message } = require('discord.js');


module.exports = {
    name: "search",
    desc: "Buscar una canción o video en youtube",
    usage: "search <Video o canción a buscar>",
    aliases: ["search", "buscar",  "sh"],
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
        if (!args) return message.reply("Olvidaste decirme qué video o canción buscar.");
        let results = await botxi.distube.search(args.join(" "));

        const searches = results.map(song =>`\t**=>>** ${song.name} - \`${song.formattedDuration}\` `).slice(0, 10).join('\n');

        message.channel.send({content: `Según lo que me dijiste \`${args}\` \n **Encontré éstas canciones**:\n ${searches}\` `});
    }
}