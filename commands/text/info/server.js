const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "server",
    desc: "Da la info del servidor",
    usage: "server",
    aliases: [],
    isPrivate: false,
    guildOnly: false,
    category: "info",
    cooldown: 0,
    status: true,
    run: (botxi, message, args) => {
        const server = message.guild
        const embed = new MessageEmbed()
            .setAuthor(server.name, server.iconURL())
            .setColor(0xe9f10a)
            .setFooter("Daxo | Shard:" + server.shardId, botxi.user.avatarURL())
            .addField("ID", server.id, true)
            // .addField("Region", server.region, true)
            .addField("Creado el", server.joinedAt.toDateString(), true)
            .addField("Dueño del Servidor", "<@"+server.ownerId + ">", true)
            // .addField("Miembros", str(server.memberCount), true)
            // .addField("Roles", server.roles.cache.size, true)
            // .addField("Canales", server.channels.cache.size, true)
            // .addField("Emojis", server.emojis.cache.size, true)
            .setThumbnail(server.iconURL());
            message.channel.send({embeds:[embed]});
    }
}