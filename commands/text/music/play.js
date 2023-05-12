const { Client, Message } = require('discord.js');


module.exports = {
    name: "play",
    desc: "Reproduce una canción desde youtube",
    usage: "play <nombre canción | URL>",
    aliases: ["play", "p"],
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
        message.channel.sendTyping()
        const canal = message.member.voice.channel;
        if (!canal) return message.reply("No estás en un canal de voz,\nDebes estar en un canal de voz para poder unirme.");

        const song = args.join(" ");
        if (!song) return message.reply("Olvidaste decirme que quieres reproducir...");

        botxi.distube.play(canal, song, {
            member: message.member,
            textChannel: message.channel,
            message
        }).catch(err => message.channel.send("No pude realizar la búsqueda."));

    }
}