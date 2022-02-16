const { Client, Message } = require('discord.js');


module.exports = {
    name: "setVolume",
    desc: "Ajusta el volumen del reproductor",
    usage: "setVolume < 1-100>",
    aliases: ["setVolume", "setVol"],
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
        // console.log(typeof Number(args[0]) === "number");
        if (!args) return message.reply("Olvidaste decirme en cuánto ajusto el volumen.");
        botxi.distube.setVolume(message, Number(args[0]));
        message.channel.send(`Se configuró el volumen en ${args[0]}%`)
    }
}