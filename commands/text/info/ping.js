const Discord = require('discord.js');


module.exports = {
    name: "ping",
    desc: "Muestra el ping de la API de Discord y del tiempo que toma enviar los mensajes en ms.",
    usage: "ping",
    aliases: ["ping",],
    isPrivate: false,
    guildOnly: false,
    category: "info",
    cooldown: 0,
    status: true,
    /**
    * @param {Discord.Client} botxi
    * @param {Discord.Message} message
    * @param {String} args
    * @returns
    */
    run: async(botxi, message, args) => {
        message.reply('🏓 Pong!').then((m) => {
            m.edit(
              `📨 Ping Mensajes: \`${Math.floor(m.createdTimestamp - Date.now())} ms\`
          🛰️ Ping DiscordAPI: \`${botxi.ws.ping} ms\``
            );
          });
    }
}