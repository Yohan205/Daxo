const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "neko",
    desc: "Te muestra una hermosa neko",
    usage: "neko",
    aliases: [],
    isPrivate: false,
    guildOnly: false,
    category: "misc",
    cooldown: 10,
    status: true,
    run: async (botxi, message, args, BOT) => {
        const Zeew = botxi.configs.get("Zeew");
        const zeewGif = new Zeew.gif(BOT.TOKEN_ZEEW);
        let gifNeko = await zeewGif.sfw.neko();
        message.channel.send(gifNeko).then((m) => {
            m.react('👍');
            m.react('❤️');
        });
    }
}