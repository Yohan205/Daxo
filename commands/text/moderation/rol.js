const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "rol",
    desc: "Moderación de roles",
    usage: {name: "rol", options: ["list", "find <rol> <@user>","add <rol> <@user>", "remove <rol> <@user>"]},
    aliases: ["rol", "r"],
    isPrivate: false,
    guildOnly: false,
    category: "mod",
    cooldown: 0,
    status: true,
    run: (botxi, message, args) => {
        let server = message.guild

        let rol = message.mentions.roles.first() || //por mencion
            server.roles.resolve(args[1]) || //por id
            server.roles.cache.find(r => r.name == args.slice(1).join(' ')); //por nombre

        let persona = message.mentions.members.first() || //por mencion
            server.members.resolve(args[1]) || //por id
            message.member;
        
        let estaRol = server.roles.cache.some(r => r == rol),
            tieneRol = persona.roles.cache.some(r => r == rol);

        if (args[0] == "find" || args[0] === "f") {
            // Primero revisa si el usuario es el mismo autor o no, luego si en el mensaje hay algun rol
            if (persona == message.member) {
                if (!args[1]) return message.reply("Porfa, pon el nombre o id del rol para poder buscarlo");

                // Si el rol no esta en el servidor manda un mensaje
                if (!estaRol) return message.reply('No pude encontrar el rol en el servidor o está mal escrito :c');

                // Si el usuario tiene o no el rol, entonces...
                if (tieneRol) {
                    message.reply(`Sí tienes el rol **${rol.name}** `)
                } else {
                    message.reply(`No tienes el rol **${rol.name}** `)
                }
            } else {
                if (!persona) return message.reply("No mencionaste a nadie, debes mencionar o poner la id de un usuario.")
                if (!rol) return message.reply("Porfa, menciona o pon el id del rol para poder buscarlo");
                
                // Si el rol no esta en el servidor manda un mensaje
                if (!estaRol) return message.reply('No pude encontrar el rol en el servidor o está mal escrito :c');

                // Si el usuario tiene o no el rol, entonces...
                var msg = "";
                if (tieneRol) {
                    msg = `**${persona.user.tag}** sí tiene el rol \`${rol.name}\` `;
                } else {
                    msg = `**${persona.user.tag}** no tiene el rol \`${rol.name}\` `;
                }
                message.channel.send(msg)
            }
        } else if (args[0] == "add"){
            // Revisa si el bot tiene permiso para añadir roles
            if (!server.me.permissions.has("MANAGE_ROLES")) return message.reply("Que mal, no tengo permisos para hacer eso");
            // Tambien, si el autor tiene el permiso
            if (!message.member.permissions.has("MANAGE_ROLES")) return message.reply("Wey no tienes permisos para hacer eso! D:");
            // Si no menciona el usuario
            persona = message.mentions.members.first() || message.guild.members.resolve(args[1]);
            if (!persona) return message.reply('Oye menciona o pon la id de alguien para darle el rol');
            // Si no menciona el rol
            if (!rol) return message.reply('Menciona o pon el nombre o id del rol a dar sino, cómo voy a saber qué rol quieres jsjsjs');
            // Si el rol está es en el servidor
            if (!estaRol) return message.reply('Parece que ese rol no está en el servidor :confused:');
            // Si el bot puede editar roles
            if (!rol.editable) return message.reply('Lo siento, pero no puedo darle ese rol a nadie, pues es más alto que mi rol');
            // Si el rol a dar es más alto que el del usuario
            if (rol.comparePositionTo(message.member.roles.highest) > 0) return message.reply('El rol mencionado es más alto que tu rol (en lo que a jerarquia se refiere), asi no puedes darselo a nadie');

            // Agrega el rol al usuario
            persona.roles.add(rol)
                .catch(e => message.reply('Ups, ocurrio un **error** vuelve a intentarlo'))
                .then(() => {
                    message.channel.send(`Listo, le agrege el rol **${rol.name}** a **${persona.user.username}**`)
                });
        } else if (args[0] == "remove" || args[0] === "rv"){
            // Revisa si el bot tiene permiso para añadir roles
            if (!server.me.permissions.has("MANAGE_ROLES")) return message.reply("Que mal, no tengo permisos para hacer eso");
            // Tambien, si el autor tiene el permiso
            if (!message.member.permissions.has("MANAGE_ROLES")) return message.reply("Wey no tienes permisos para hacer eso! D:");
            // Si no menciona el usuario
            persona = message.mentions.members.first() || message.guild.members.resolve(args[1]);
            if (!persona) return message.reply('Oye menciona o pon la id de alguien para darle el rol');
            // Si no menciona el rol
            if (!rol) return message.reply('Menciona o pon el nombre o id del rol a dar sino, cómo voy a saber qué rol quieres jsjsjs');
            // Si el rol está es en el servidor
            if (!estaRol) return message.reply('Parece que ese rol no está en el servidor :confused:');
            // Si el bot puede editar roles
            if (!rol.editable) return message.reply('Lo siento, pero no puedo quitarle ese rol a nadie, pues es más alto que mi rol');
            // Si el rol a dar es más alto que el del usuario
            if (rol.comparePositionTo(message.member.roles.highest) > 0) return message.reply('El rol mencionado es más alto que tu rol (en lo que a jerarquia se refiere), asi no puedes darselo a nadie');

            /*let reason = args.slice(2).join('');
            if(!reason) return message.channel.send("Necesitas decir una razón");*/

            // Quita el rol del usuario
            persona.roles.remove(rol.id)
            .catch(e => message.reply("Ocurrio un **error**"))
            .then(() => message.channel.send(`Listo! le quité el rol **${rol.name}** a **${persona.user.username}**`));
                //message.channel.send(`Listo, le saque el rol **${rol.name}** a **${persona.user.username}** con la razon de: _${reason}`)
        } else if (args[0] == "list" || args[0] === "lt"){
            const embed = new EmbedBuilder()
            .setColor(0x00AE86)
            .setDescription(
                server.roles.cache.map(role => `O <@&${role.id}>`)
                .join('\n')
            )
            .setFooter(`Lista de roles de: ${server.name}`, server.iconURL());
            message.channel.send({embeds:[embed]});
        } else {
            message.reply("Revisa help mod, para ver los comandos.")
        }
    }
}