const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    desc: "Para ver todos los comandos del bot",
    usage: "help",
    aliases: [],
    isPrivate: false,
    guildOnly: false,
    category: "test",
    isOwner: true,
    run: (botxi, message) => {
            const emHelp = new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor("Comandos de Daxo", botxi.user.avatarURL())
                .addField("Comandos de Información", '▔▔▔▔▔▔▔▔▔▔▔▔', true)
                .addField("-> `" + prefix + "user <@user>`", ":: Muestra información sobre un usuario mencioando.")
                .addField("-> `" + prefix + "server`", ":: Muestra información del servidor donde está el bot.")
                .addField("-> `" + prefix + "inviteBot`", ":: Enviará un link para que puedas tener a Daxo en tu servidor preferido. :wink: \n")
                .addField("Comandos de Diversión", '▔▔▔▔▔▔▔▔▔▔▔', true)
                .addField("-> `" + prefix + "galleta`", ":: Da una galleta a un usuario.")
                .addField("-> `" + prefix + "8ball`", ":: El bot respondera a tus preguntas con una respuesta aleatoria. \nPor ejemplo: *" + prefix + "8ball hoy llueve?*")
                .addField("-> `" + prefix + "ppt`", ":: Juega `Piedra`, `Papel` o `Tijera` con Daxo y prueba tu suerte.:wink: \nPor ejemplo: *" + prefix + "ppt piedra*")
                .addField("-> `" + prefix + "love`", ":: El bot calculará el porcentaje de amor entre dos usuarios 7u7. \nPor ejemplo: *" + prefix + "love <@usuario1> <@usuario2>* \n")
                .addField("Comandos Admin/Moderadores", '▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔', true)
                .addField("-> `" + prefix + "rol <@user> <rol>`", ":: Muestra información del rol de un usuario mencionado.")
                .addField("-> `" + prefix + "rol-list`", ":: Muestra los roles del servidor.")
                .addField("-> `" + prefix + "rol-add <@user> <rol>`", ":: Agrega un rol a un usuario mencionado.")
                .addField("-> `" + prefix + "rol-remove <@user> <rol>`", ":: Quita un rol de un usuario mencionado. \n")
                .addField("Comandos de Interacción", '▔▔▔▔▔▔▔▔▔▔▔▔', true)
                .addField("-> `" + prefix + "saludos`", ":: Retorna un saludo como mensaje.")
                .addField("-> `" + prefix + "announce`", ":: Hace que el bot diga un mensaje (AUN EN DESARROLLO).")
                .setFooter("Unete al servidor de soporte para conocer más sobre el bot", botxi.user.avatarURL());
            message.channel.send({embeds:[emHelp]});
            /*"**" + message.author.username + "**, Revisa tus mensajes privados.");
                    //message.author.send( //Envia el mensaje al DM
            "-> " + prefix + "ping           :: Comprueba la latencia del bot y de tus mensajes.\n"*/
    }
}