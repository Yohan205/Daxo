const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "8ball",
    desc: "Preguntale a 8ball",
    usage: "8ball",
    aliases: [],
    isPrivate: false,
    guildOnly: false,
    category: "fun",
    isOwner: true,
    run: (botxi, message, args) => {
        const EMBED = botxi.configs.get("EMBED");
        let text = args.join(" ");
        var rpts = [
            "Sí",
            "No",
            "¿Por qué?",
            "Por favor",
            "Tal vez",
            "Ummm... No sé",
            "Definitivamente",
            " ¡Claro! ",
            " Sí ",
            " No ",
            " Por supuesto! ",
            " Por supuesto que no ",
            " No estoy seguro :confused:"
        ];
        if (!text) return message.reply(`Escriba una pregunta.`);

        const embed = EMBED
            .setColor("RANDOM")
            // .setAuthor(message.author.username, message.author.avatarURL())
            .setFooter(botxi.user.username, botxi.user.avatarURL())
            .setTimestamp()
            .addField(message.author.avatarURL(), message.author.username + " a su pregunta `" + text + "`",
                "Mi respuesta es: `" + rpts[Math.floor(Math.random() * rpts.length)] + "`");

        message.reply({embeds:[embed]});
    }
}