const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "user",
    desc: "Da la info de un usuario",
    usage: "user",
    aliases: [],
    isPrivate: false,
    guildOnly: false,
    category: "info",
    isOwner: true,
    run: (botxi, message, args) => {
        let userm = message.mentions.users.first();
        if (!userm) {
            var user = message.author;

            const embed = new MessageEmbed()
                .setThumbnail(user.avatarURL)
                .setAuthor(user.username + "#" + user.discriminator, user.avatarURL)
                .addField(
                    "Jugando a",
                    user.presence.game != null ? user.presence.game.name : "Nada",
                    true
                )
                .addField("ID", user.id, true)
                .addField("Estado", user.presence.status, true)
                .addField("Apodo", message.member.nickname, true)
                .addField("Cuenta Creada", user.createdAt.toDateString(), true)
                .addField("Fecha de Ingreso", message.member.joinedAt.toDateString())
                .addField(
                    "Roles",
                    message.member.roles.cache.map(roles => `\`${roles.name}\``).join(", ")
                )
                .setColor(0x66b3ff);

            message.channel.send({embeds:[embed]});
        } else {
            const embed = new MessageEmbed()
                .setThumbnail(userm.avatarURL)
                .setAuthor(userm.username + "#" + userm.discriminator, userm.avatarURL)
                .addField(
                    "Jugando a",
                    userm.presence.game != null ? userm.presence.game.name : "Nada",
                    true
                )
                .addField("ID", userm.id, true)
                .addField("Estado", userm.presence.status, true)
                .addField("Cuenta Creada", userm.createdAt.toDateString(), true)
                .setColor(0x66b3ff);

            message.channel.send({embeds:[embed]});
        }
    }
}