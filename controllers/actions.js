const { EmbedBuilder } = require("discord.js");

module.exports = (url, action, message) => {
    const footer = {
        text:"Gif proporcionado por Zeew", 
        iconURL: botxi.user.avatarURL()
    }

    if (!message.mentions.members.first()) {
        const embed = new EmbedBuilder()
            .setFooter(footer)
            .setImage(url)
            .setColor("RANDOM");

        switch (action) {
            case "saludando":
                embed.setDescription("**"+message.member.displayName+"** está "+action+" a todos");
                return embed;

            case "corriendo":
                embed.setDescription("**"+message.member.displayName+"** está "+ action);
                return embed;
            default:
                const embedError = new EmbedBuilder()
                    .setTitle("**"+message.member.displayName+"** Necesitas mencionar a alguien para ejecutar la acción")
                    .setColor("#FF0000");
                return embedError;
        }
    } else {
        const embed = new EmbedBuilder()
            .setFooter(footer)
            .setDescription("**"+message.member.displayName+"** ha "+action+" a **"+message.mentions.members.first().displayName+"**")
            .setImage(url)
            .setColor("RANDOM");
        return embed;
    }
}