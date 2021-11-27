const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "galleta",
    desc: "Da una galleta a un usuario",
    usage: "galleta <@usuario>",
    aliases: ["galleta","cookie", "glt", "cokie"],
    isPrivate: false,
    guildOnly: false,
    category: "actions",
    cooldown: 5,
    status: true,
    run: async (botxi, message, args, BOT) => {
        const Zeew = botxi.configs.get("Zeew");
        const zeewGif = new Zeew.gif(BOT.TOKEN_ZEEW);
        let user = message.mentions.users.first() || //por mencion
            server.members.resolve(args[0]); //por id
        let razon = args.slice(1).join(" ");
        let gif = await zeewGif.sfw.wink();

        if (!user) return message.channel.send("Menciona a un usuario para darle una galleta >.<");

        if (!razon) razon = "Sin razón alguna :grin:";
        const embed = new MessageEmbed()
            .setColor("0xF49F0A")
            .setAuthor(message.author.username, message.author.avatarURL())
            .setFooter("Gif proporcionado por Zeew", botxi.user.avatarURL())
            .setThumbnail(user.avatarURL())
            .setTitle("***" + user.username + ", *** tienes una galleta :cookie: de **" + message.author.username + "**")
            .setDescription("*Razón:* " + razon + "\n\n***(づ｡◕‿‿◕｡)づ:･ﾟ✧ :cookie:***")
            .setImage(gif);
        message.channel.send({embeds:[embed]});
    }
}