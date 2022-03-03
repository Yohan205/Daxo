const { MessageEmbed } = require("discord.js");
// const GConfig = require("../../../settings/models/guildConfig");

// function cmd(nameCmd) {return botxi.commands.get(nameCmd)}

module.exports = {
    name: "help",
    desc: "Para ver todos los comandos de Daxo",
    usage: "help [comando]",
    aliases: ["help"],
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

        const embed = new MessageEmbed().setColor("RANDOM")
        .setAuthor("Bot Multiproposito", botxi.user.avatarURL())
        .setTitle(".::|Comandos de Daxo|::.")
        .setURL("http://hidaxo.xyz")
        .setDescription('Prefix usado: ' + prefix + ' \n \u200B')
        .setTimestamp()
        .setFooter("Unete al servidor de soporte para conocer más sobre el bot", botxi.user.avatarURL());

        function searchCommands(nameCategory) {
            return botxi.commands.map(c => { //Hace una busqueda por cada comando
                if (c.category === nameCategory){   //Si la categoria del comando es igual a nameCategory
                    //Añade al embed cada comando que tenga esa categoria
                    embed.addField("-> `" + prefix + c.usage +"`", ":: "+ c.desc + "\n \u200B")
                }
            });
        }
        
        switch (args[0]) {
            case "info":
                embed.addField("Comandos de Información", '▔▔▔▔▔▔▔▔▔▔▔▔', true);
                searchCommands("info");
                message.channel.send({embeds:[embed]});
                break;
            case "fun":
                embed.addField("Comandos de Diversión", '▔▔▔▔▔▔▔▔▔▔▔', true);
                searchCommands("fun");
                message.channel.send({embeds:[embed]});
                break;
            case "misc":
                embed.addField("Misceláneos", '▔▔▔▔▔▔▔▔▔▔▔▔', true);
                searchCommands("misc");
                message.channel.send({embeds:[embed]});
                break;
            case "actions":
                embed.addField("Comandos de Acción", '▔▔▔▔▔▔▔▔▔▔▔▔', true);
                searchCommands("actions");
                message.channel.send({embeds:[embed]});
                break;
            case "mod":
                embed.addField("Comandos Admin/Moderadores", '▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔', true)
                .addField("-> `" + prefix + cmd("rol").usage + " find <rol> <@user>`", ":: Muestra si usuario tiene o no un rol. \n \u200B")
                .addField("-> `" + prefix + cmd("rol").usage + " list`", ":: Muestra los roles del servidor. \n \u200B")
                .addField("-> `" + prefix + cmd("rol").usage + " add <rol> <@user>`", ":: Agrega un rol al usuario mencionado. \n \u200B")
                .addField("-> `" + prefix + cmd("rol").usage + " remove <rol> <@user>`", ":: Quita un rol del usuario mencionado. \n \u200B")
                message.channel.send({embeds:[embed]});
                break;
            case "music":
                embed.addField("Comandos de Música", '▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔', true);
                searchCommands("music");
                message.channel.send({embeds:[embed]});
                break;

            default:
                if ( ifAdmin === true && message.member.roles.cache.has(admin.id)) {
                    embed.addField("Categorías de los comandos", '\n \u200B')
                    .addField("\u200B\u200B\u200B Información", '▔▔▔▔▔▔▔▔▔▔▔', true)
                    .addField("-> `" + prefix + "help info`",":: Muestra comandos de info. \n \u200B")
                    .addField("\u200B\u200B\u200B Diversión", '▔▔▔▔▔▔▔▔▔▔▔', true)
                    .addField("-> `" + prefix + "help fun`", ":: Muestra comandos de diversión. \n \u200B")
                    .addField("\u200B\u200B\u200B Acción", '▔▔▔▔▔▔▔▔▔▔▔', true)
                    .addField("-> `" + prefix + "help actions`", ":: Muestra comandos de acción. \n \u200B")
                    .addField("\u200B\u200B\u200B Admin/Moderadores", '▔▔▔▔▔▔▔▔▔▔▔', true)
                    .addField("-> `" + prefix + "help mod`", ":: Muestra comandos de moderación. \n \u200B")
                    .addField("\u200B\u200B\u200B Misceláneo", '▔▔▔▔▔▔▔▔▔▔▔', true)
                    .addField("-> `" + prefix + "help misc`", ":: Muestra comandos de interacción. \n \u200B")
                    .addField("\u200B\u200B\u200B Música", '▔▔▔▔▔▔▔▔▔▔▔', true)
                    .addField("-> `" + prefix + "help music`", ":: Muestra comandos para el reproductor. \n \u200B");
                    message.channel.send({embeds:[embed]});
                } else if (message.member.roles.cache.has(everyone.id)) {
                    embed.addField("Categorías de los comandos", '\n \u200B')
                    .addField("\u200B\u200B\u200B Información", '▔▔▔▔▔▔▔▔▔▔▔', true)
                    .addField("-> `" + prefix + "help info`",":: Muestra comandos de info. \n \u200B")
                    .addField("\u200B\u200B\u200B Diversión", '▔▔▔▔▔▔▔▔▔▔▔', true)
                    .addField("-> `" + prefix + "help fun`", ":: Muestra comandos de diversión. \n \u200B")
                    .addField("\u200B\u200B\u200B Acción", '▔▔▔▔▔▔▔▔▔▔▔', true)
                    .addField("-> `" + prefix + "help actions`", ":: Muestra comandos de acción. \n \u200B")
                    .addField("\u200B\u200B\u200B Misceláneo", '▔▔▔▔▔▔▔▔▔▔▔', true)
                    .addField("-> `" + prefix + "help misc`", ":: Muestra comandos de interacción. \n \u200B");
                    message.channel.send({embeds:[embed]});
                }
                break;
        }
        
        /*"**" + message.author.username + "**, Revisa tus mensajes privados.");
                //message.author.send( //Envia el mensaje al DM
        */
    }
}