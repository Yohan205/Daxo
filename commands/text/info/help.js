const { EmbedBuilder } = require("discord.js");
// const GConfig = require("../../../settings/models/guildConfig");

// function cmd(nameCmd) {return botxi.commands.get(nameCmd)}

module.exports = {
    name: "help",
    desc: "Para ver todos los comandos de Daxo",
    usage: "help [comando]",
    aliases: ["help", "info"],
    isPrivate: false,
    guildOnly: false,
    category: "info",
    cooldown: 0,
    status: true,
    run: async (botxi, message, args) => {
        const prefix = botxi.configs.get("prefix");
        const GuildConfig = botxi.configs.get("GuildConfig");
        let guildConfig = await GuildConfig.findOne({ID: message.guildId}),
            roles = {
                all: "@everyone",
                own: "⟨⟨ElAdmin⟩⟩"
            },
        admin, 
        ifAdmin = true,
        everyone = message.guild.roles.cache.find((r) => r.name === roles.all);

        if (guildConfig) {
            if (!guildConfig.adminRol) {
                ifAdmin = false;
                admin = everyone;
            } else {
                roles.admin = guildConfig.adminRol;
                admin = message.guild.roles.cache.find((r) => r.name === roles.admin);
            }
        } else {
            admin = everyone;
            ifAdmin = false;
        }

        const embed = new EmbedBuilder()
        .setAuthor({name: "Bot Multiproposito", iconURL: botxi.user.avatarURL()})
        .setTitle(".::|Comandos de Daxo|::.")
        .setURL("http://hidaxo.xyz")
        .setDescription('Prefix usado: ' + prefix + ' \n \u200B')
        .setTimestamp()
        .setFooter({text:"Unete al servidor de soporte para conocer más sobre el bot", iconURL: botxi.user.avatarURL()});

        function searchCommands(nameCategory) {
            return botxi.commands.map(c => { //Hace una busqueda por cada comando
                if (c.category === nameCategory){   //Si la categoria del comando es igual a nameCategory
                    //Añade al embed cada comando que tenga esa categoria
                    embed.addFields({name: `-> \`${prefix} ${c.usage}\` `, value: `:: ${c.desc} \n \u200B`});
                }
            });
        }
        
        switch (args[0]) {
            case "info":
                embed.addFields({name: "Comandos de Información", value: '▔▔▔▔▔▔▔▔▔▔▔▔', inline: true});
                searchCommands("info");
                message.channel.send({embeds:[embed]});
                break;
            case "fun":
                embed.addFields({name: "Comandos de Diversión", value: '▔▔▔▔▔▔▔▔▔▔▔', inline: true});
                searchCommands("fun");
                message.channel.send({embeds:[embed]});
                break;
            case "misc":
                embed.addFields({name: "Misceláneos", value: '▔▔▔▔▔▔▔▔▔▔▔▔', inline: true});
                searchCommands("misc");
                message.channel.send({embeds:[embed]});
                break;
            case "actions":
                embed.addFields({name: "Comandos de Acción", value: '▔▔▔▔▔▔▔▔▔▔▔▔', inline: true});
                searchCommands("actions");
                message.channel.send({embeds:[embed]});
                break;
            case "mod":
                embed.addFields({name: "Comandos Admin/Moderadores", value: '▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔', inline: true},
                {name: `-> \`${prefix} ${cmd("rol").usage.name} ${cmd("rol").usage.options[0]}\``, vaue: ":: Muestra los roles del servidor. \n \u200B"},
                {name: `-> \`${prefix} ${cmd("rol").usage.name} ${cmd("rol").usage.options[1]}\``, value: ":: Muestra si usuario tiene o no un rol. \n \u200B"},
                {name: `-> \`${prefix} ${cmd("rol").usage.name} ${cmd("rol").usage.options[2]}\``, value: ":: Agrega un rol al usuario mencionado. \n \u200B"},
                {name: `-> \`${prefix} ${cmd("rol").usage.name} ${cmd("rol").usage.options[3]}\``, value: ":: Quita un rol del usuario mencionado. \n \u200B"});
                message.channel.send({embeds:[embed]});
                break;
            case "music":
                embed.addFields({name: "Comandos de Música", value: '▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔', inline: true});
                searchCommands("music");
                message.channel.send({embeds:[embed]});
                break;

            default:
                if ( ifAdmin === true && message.member.roles.cache.has(admin.id)) {
                    embed.addFields({name: "Categorías de los comandos", value: '\n \u200B'},
                    {name: "\u200B\u200B\u200B Información", value: '▔▔▔▔▔▔▔▔▔▔▔', inline: true},
                    {name: "-> `" + prefix + "help info`", value: ":: Muestra comandos de info. \n \u200B"},
                    {name: "\u200B\u200B\u200B Diversión", value: '▔▔▔▔▔▔▔▔▔▔▔', inline: true},
                    {name: "-> `" + prefix + "help fun`", value: ":: Muestra comandos de diversión. \n \u200B"},
                    {name: "\u200B\u200B\u200B Acción", value: '▔▔▔▔▔▔▔▔▔▔▔', inline: true},
                    {name: "-> `" + prefix + "help actions`", value: ":: Muestra comandos de acción. \n \u200B"},
                    {name: "\u200B\u200B\u200B Admin/Moderadores", value: '▔▔▔▔▔▔▔▔▔▔▔', inline: true},
                    {name: "-> `" + prefix + "help mod`", value: ":: Muestra comandos de moderación. \n \u200B"},
                    {name: "\u200B\u200B\u200B Misceláneo", value: '▔▔▔▔▔▔▔▔▔▔▔', inline: true},
                    {name: "-> `" + prefix + "help misc`", value: ":: Muestra comandos de interacción. \n \u200B"},
                    {name: "\u200B\u200B\u200B Música", value: '▔▔▔▔▔▔▔▔▔▔▔', inline: true},
                    {name: "-> `" + prefix + "help music`", value: ":: Muestra comandos para el reproductor. \n \u200B"});
                    message.channel.send({embeds:[embed]});
                } else if (message.member.roles.cache.has(everyone.id)) {
                    embed.addFields({name: "Categorías de los comandos", value: '\n \u200B'},
                    {name: "\u200B\u200B\u200B Información", value: '▔▔▔▔▔▔▔▔▔▔▔', inline: true},
                    {name: "-> `" + prefix + "help info`", value: ":: Muestra comandos de info. \n \u200B"},
                    {name: "\u200B\u200B\u200B Diversión", value: '▔▔▔▔▔▔▔▔▔▔▔', inline: true},
                    {name: "-> `" + prefix + "help fun`", value: ":: Muestra comandos de diversión. \n \u200B"},
                    {name: "\u200B\u200B\u200B Acción", value: '▔▔▔▔▔▔▔▔▔▔▔', inline: true},
                    {name: "-> `" + prefix + "help actions`", value: ":: Muestra comandos de acción. \n \u200B"},
                    {name: "\u200B\u200B\u200B Misceláneo", value: '▔▔▔▔▔▔▔▔▔▔▔', inline: true},
                    {name: "-> `" + prefix + "help misc`", value: ":: Muestra comandos de interacción. \n \u200B"});
                    message.channel.send({embeds:[embed]});
                }
                break;
        }
        
        /*"**" + message.author.username + "**, Revisa tus mensajes privados.");
                //message.author.send( //Envia el mensaje al DM
        */
    }
}