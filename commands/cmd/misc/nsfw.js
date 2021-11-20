const Zeew = require("zeew");

module.exports = {
    name: "noVer",
    desc: "Comando NSFW",
    usage: "noVer",
    aliases: ["noVer","maid"],
    isPrivate: false,
    guildOnly: false,
    category: "nsfw",
    isOwner: true,
    status: true,
    run: async (botxi, message, args, BOT) => {
        const zeewGif = new Zeew.gif(BOT.TOKEN_ZEEW);
        let gif = await zeewGif.nsfw.maid();
        if(!message.channel.nsfw) return message.reply("**Oh no, lo que intentas ver sólo es para +18 en un canal NSFW**")
        message.channel.send(gif).then(message.delete({ timeout: 90000 }));
    }
}