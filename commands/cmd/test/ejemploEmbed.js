const Discord = require("discord.js");

module.exports = {
    name: "ejemploEmbed",
    desc: "Muestra un ejemplo de un mensaje Embed",
    usage: "ejemploEmbed",
    aliases: ["ejemploEmbed", "embed"],
    isPrivate: false,
    guildOnly: false,
    category: "test",
    cooldown: 0,
    status: true,
    run: async (botxi, message, args) => {
        
        const embed = new Discord.MessageEmbed()
                .setTitle("Este es su título, puede contener 256 caracteres")
                .setAuthor(message.author.username, message.author.avatarURL())
                .setColor(0x00AE86)
                .setDescription("Este es el cuerpo principal del texto, puede contener 2048 caracteres.")
                .setFooter("Pie de página, puede contener 2048 caracteres", botxi.user.avatarURL())
                .setTimestamp()
                .setImage(message.author.avatarURL())
                .setThumbnail(message.author.avatarURL())
                .setURL("http://hidaxo.xyz")
                .addField("Este es un título de campo, puede contener 256 caracteres",
                    "Este es un valor de campo, puede contener 2048 caracteres.")
                .addField("Campo en línea", "Debajo del campo en línea", true)
                .addField("Campo en línea 3", "Puede tener un máximo de 25 campos.", true);
            
            const row2 = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageSelectMenu()
                .setCustomId("menu")
                .setMaxValues(1)
                .setPlaceholder("Presiona alguna de estas opciones")
                .addOptions([
                    {
                        label: "Opción 1",
                        description: "Esta es la descripción de la opción",
                        value: "Hola!",
                        emoji: "❤️"
                    },
                    {
                        label: "Opción 2",
                        description: "Esta es la descripción de la opción",
                        value: "Hi!"
                    }
                ])
            )
    
            const m = await message.channel.send({embeds: [embed], components: [row2]})
    
            const filter = i => i.user.id === message.author.id;
    
            const collector = m.createMessageComponentCollector({filter: filter, time: 10000});
    
            collector.on("collect", async i => {
                if (i.values[0] === "Hola!") {
                    await i.deferUpdate();
                    i.editReply({ content: "Has dado a la opcion 1", components: [], embeds: []})
                } else if (i.values[0] === "Hi!") {
                    await i.deferUpdate();
                    i.editReply({ content: "Has dado a la opcion 2", components: [], embeds: []})
                }
            })
    }
}