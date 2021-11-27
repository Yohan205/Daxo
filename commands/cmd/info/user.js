const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "user",
    desc: "Muestra la información de un usuario",
    usage: "user [@user]",
    aliases: ["user", "u"],
    isPrivate: false,
    guildOnly: false,
    category: "info",
    cooldown: 0,
    status: true,
    run: async (botxi, message, args) => {
        let color = {
            "online": "#00c903",
            "idle": "#ff9a00",
            "dnd": "#ff0000",
            "offline": "#d8d8d8"
        };
        let estados = {
            "online": "🟢 En línea",
            "idle": "🌙 Ausente",
            "dnd": "⛔ No molestar",
            "offline": "⚪ Desconectado/invisible"
        };

        const user = message.mentions.users.first() || message.author,
            userInGuild = message.guild.members.resolve(user.id), // Obtiene datos del usuario en el guild
            rolAlto = userInGuild.roles.highest; // Obtiene el rol más alto del usuario
        let arr = userInGuild._roles.slice(); // Obtiene en un array los roles del usuario
        let isPres = true; 
        // Si precense es null, devuelve false sino true
        if (userInGuild.presence == null) isPres = false;

        // Esta condicion pasa cada rol del array en un string
        if (arr[0]) {
            arr = arr.map((r) => `<@&${r}>`).join(', ');
        } else {arr = "Sin Roles"}

        const userEmbed = new MessageEmbed()
            .setThumbnail(user.displayAvatarURL({ format: 'png', size: 1024, dynamic: true }))
            .addFields(
                {
                    name: "Información del usuario: " + user.tag,
                    value: "🆔:" + user.id
                },
                {
                    name: 'Apodo',
                    value: userInGuild.nickname == null ? "Ninguno" : userInGuild.nickname,
                    inline: true
                },
                {
                    name: 'Jugando a',
                    value: isPres == false ? "Nada" : userInGuild.presence.activities[0] ?userInGuild.presence.activities[0].name : 'Nada',
                    inline: true
                },
                {
                    name: 'Estado',
                    value: isPres == false ? estados["offline"] : estados[userInGuild.presence.status],
                    inline: true
                },
                {
                    name:'Cuenta Creada', 
                    value:user.createdAt.toLocaleDateString("es-co"),
                    inline:true
                },
                {
                    name: 'Fecha de Ingreso',
                    value: userInGuild.joinedAt.toLocaleDateString("es-co"),
                    inline: true
                },
                {
                    name: 'Roles',
                    value: arr
                }
            )
            .setTimestamp()
            .setFooter("Daxo", botxi.user.avatarURL())
            .setColor(rolAlto.color);

        message.channel.send({embeds:[userEmbed]});
    }
}