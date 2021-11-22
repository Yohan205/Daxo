const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "neko",
    desc: "Imagen de neko",
    usage: "neko",
    aliases: [],
    isPrivate: false,
    guildOnly: false,
    category: "misc",
    isOwner: true,
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