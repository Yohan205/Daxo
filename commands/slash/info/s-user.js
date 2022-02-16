const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "User",
    type: 2,
    run: (botxi, int) => {
        console.log(int);
        let estados = {
            "online": "🟢 En línea",
            "idle": "🌙 Ausente",
            "dnd": "⛔ No molestar",
            "offline": "⚪ Desconectado/invisible"
        };

        let user = int.user
        const rolAlto = int.guild.members.resolve(user.id).roles.highest;

        // console.log(int.guild.members.resolve(user.id).roles.cache);
        let pres = true
        if (int.guild.members.resolve(user.id).presence == null){
            pres = false;
        }

        const userEmbed = new MessageEmbed()
            .setThumbnail(user.displayAvatarURL({ format: 'png', size: 1024, dynamic: true }))
            .addFields(
                {
                    name: "Información del usuario: " + user.tag,
                    value: "🆔:" + user.id
                },
                {
                    name: 'Apodo',
                    value: int.guild.members.resolve(user.id).nickname == null ? "Ninguno" : int.guild.members.resolve(user.id).nickname,
                    inline: true
                },
                {
                    name: 'Jugando a',
                    value: pres == false ? "Nada" : int.guild.members.resolve(user.id).presence.activities[0] ?int.guild.members.resolve(user.id).presence.activities[0].name : 'Nada',
                    inline: true
                },
                {
                    name: 'Estado',
                    value: pres == false ? estados["offline"] : estados[int.guild.members.resolve(user.id).presence.status],
                    inline: true
                },
                {
                    name:'Cuenta Creada', 
                    value:user.createdAt.toLocaleDateString("es-co"),
                    inline:true
                },
                {
                    name: 'Fecha de Ingreso',
                    value: int.guild.members.resolve(user.id).joinedAt.toLocaleDateString("es-co"),
                    inline: true
                },
                {
                    name: 'Roles',
                    value: int.guild.members.resolve(user.id).roles.cache.map((roles) => `<@&${roles.id}>`).join(', ')
                }
            )
            .setTimestamp()
            .setFooter("Daxo", botxi.user.avatarURL())
            .setColor(rolAlto.color);

        int.reply({embeds:[userEmbed]});
    }
}