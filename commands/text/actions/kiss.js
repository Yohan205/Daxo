const Zeew = require('zeew')

module.exports = {
    name: "kiss",
    desc: "Besa a un usuario",
    usage: "kiss",
    aliases: ["kiss",],
    isPrivate: false,
    guildOnly: false,
    category: "actions",
    cooldown: 10,
    status: true,
    run: async(botxi, message, args, BOT) => {
        const actions = botxi.configs.get("actions");
        const zeewGif = new Zeew.gif(BOT.TOKEN.ZEEW);
        let gif = await zeewGif.sfw.kiss();
        const embed = actions(gif, "besando", message);
        message.channel.send({embeds:[embed]});
    }
}