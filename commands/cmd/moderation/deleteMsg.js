const Discord = require('discord.js');

module.exports = {
    name: "deleteMsg",
    desc: "Borra hasta 100 mensajes de un canal.",
    usage: "deleteMsg",
    aliases: ["deleteMsg","bulkDelete", "borrar"],
    isPrivate: false,
    guildOnly: false,
    category: "moderation",
    isOwner: true,
    status: true,
    run: (botxi, message, args) => {
        let canalInfo = message.guild.channels.cache.get(message.guild.systemChannelId);
        if (!message.guild.me.permissionsIn(message.channel).has('MANAGE_MESSAGES'))
        return message.reply('Perdon, pero no tengo permisos');

        if (!message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES'))
        return message.reply('Perdon, pero no tienes permisos');

        if (!args[0]) return message.reply('Escriba la cantidad de mensajes a eliminar');
        let cantidad = parseInt(args[0]);

        if (!cantidad || isNaN(cantidad)) return message.channel.send('Introduce un numero por favor');

        if (cantidad > 100) {
            message.channel.send(
                'El maximo de mensajes que puedo borrar es 100, por lo tanto lo establecere automaticamente ahi'
            );
            cantidad = 100;
        }

        message.channel.messages.fetch({ limit: cantidad }).then((mensajes) => {
        message.channel
            .bulkDelete(mensajes.filter((m) => !m.pinned))
            .then(() => {
            canalInfo.send(`Listo, borre ${cantidad} mensajes :ok_hand:`).then((m) => {
                setTimeout(() => m.delete(), 15000);
            });
            })
            .catch((e) => {
            message.channel.send('Ocurrio un error y no pude borrar los mensajes');
            });
        });
    }
}