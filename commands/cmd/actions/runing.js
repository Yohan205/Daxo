const Zeew = require('zeew');

module.exports = {
    name: "run",
    desc: "Salir a correr",
    usage: "run",
    aliases: ["run",],
    isPrivate: false,
    guildOnly: false,
    category: "actions",
    isOwner: true,
    status: true,
    run: async(botxi, message, args, BOT) => {
        const actions = botxi.configs.get("actions");
        const zeewGif = new Zeew.gif(BOT.TOKEN_ZEEW);
        let gif = await zeewGif.sfw.run();
        const embed = actions(gif, "corriendo", message);
        message.channel.send({embeds:[embed]});
    }
}