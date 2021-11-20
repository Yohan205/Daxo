const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "user",
    desc: "Da la info de un usuario",
    usage: "user",
    aliases: ["user", "u"],
    isPrivate: false,
    guildOnly: false,
    category: "info",
    isOwner: true,
    status: true,
    run: (botxi, message, args) => {
        const EMBED = botxi.configs.get("EMBED");

        let color = {
            "online": "#00c903",
            "idle": "#ff9a00",
            "dnd": "#ff0000",
            "offline": "#d8d8d8"
        };
        let estados = {
            "online": "En Línea",
            "idle": "Ausente",
            "dnd": "No molestar",
            "offline": "Desconectado/invisible"
        };

        let user = message.mentions.users.first() || message.author;
        const rolAlto = message.guild.members.resolve(user.id).roles.highest;

        // console.log(message.guild.members.resolve(user.id).roles.cache);
        let pres = true
        if (message.guild.members.resolve(user.id).presence == null){
            pres = false;
        }

        const userEmbed = new MessageEmbed()
            .setThumbnail(user.displayAvatarURL({ format: 'png', size: 1024, dynamic: true }))
            .addField("Información del usuario: " + user.tag, "**ID: **" + user.id)
            .addField('Apodo', message.guild.members.resolve(user.id).nickname == null ? "Ninguno" : message.guild.members.resolve(user.id).nickname, true)
            .addField(
                'Jugando a',
                pres == false ? "Nada" :
                message.guild.members.resolve(user.id).presence.activities[0] ?
                message.guild.members.resolve(user.id).presence.activities[0].name : 'Nada', true
            )
            .addField('Estado', pres == false ? "Desconectado/invisible" : estados[message.guild.members.resolve(user.id).presence.status], true)
            .addField('Cuenta Creada', user.createdAt.toDateString(), true)
            .addField('Fecha de Ingreso', message.guild.members.resolve(user.id).joinedAt.toDateString(), true)
            .addField(
                'Roles',
                message.guild.members.resolve(user.id)
                .roles.cache.map((roles) => `<@&${roles.id}>`)
                .join(', ')
            )
            .setTimestamp()
            .setFooter("Daxo", botxi.user.avatarURL())
            .setColor(rolAlto.color);

        message.channel.send({embeds:[userEmbed]});
    }
}