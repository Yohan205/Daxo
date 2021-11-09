const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ejemploEmbed",
    desc: "Muestra un ejemplo de un mensaje Embed",
    usage: "ejemploEmbed",
    aliases: ["embed"],
    isPrivate: false,
    guildOnly: false,
    category: "test",
    isOwner: true,
    run: (botxi, message, args) => {
        const embed = new MessageEmbed()
                .setTitle("Este es su título, puede contener 256 caracteres")
                .setAuthor(message.author.username, message.author.avatarURL())
                .setColor(0x00AE86)
                .setDescription("Este es el cuerpo principal del texto, puede contener 2048 caracteres.")
                .setFooter("Pie de página, puede contener 2048 caracteres", botxi.user.avatarURL())
                .setImage(message.author.avatarURL())
                .setThumbnail(message.author.avatarURL())
                .setURL("http://hidaxo.xyz")
                .addField("Este es un título de campo, puede contener 256 caracteres",
                    "Este es un valor de campo, puede contener 2048 caracteres.")
                .addField("Campo en línea", "Debajo del campo en línea", true)
                .addField("Campo en línea 3", "Puede tener un máximo de 25 campos.", true);
            message.channel.send({embeds:[embed]});
    }
}