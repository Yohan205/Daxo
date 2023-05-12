const Discord = require('discord.js');

module.exports = {
    name: "ppt",
    desc: "Juega `Piedra`, `Papel` o `Tijera` contra mi y prueba tu suerte.:wink:",
    usage: "ppt",
    aliases: ["ppt"],
    isPrivate: false,
    guildOnly: false,
    category: "fun",
    cooldown: 3,
    status: true,
    /**
     * 
     * @param {Discord.Client} botxi 
     * @param {Discord.Message} message 
     * @param {String} args 
     * @returns 
     */
    run: (botxi, message, args) => {
        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("piedra")
            .setLabel("Piedra")
            .setStyle("PRIMARY")
            .setEmoji("🪨"),
            new Discord.MessageButton()
            .setCustomId("papel")
            .setLabel("Papel")
            .setStyle("PRIMARY")
            .setEmoji("📄"),
            new Discord.MessageButton()
            .setCustomId("tijeras")
            .setLabel("Tijera")
            .setStyle("PRIMARY")
            .setEmoji("✂️"),
        );

        message.channel.send({content: "Juega contra mi a Piedra, Papel o Tijera \n\n Selecciona una opción:", components: [row]});

    },
    btn: [
        {
            id: "piedra",
            execute: async (botxi, int) => {
                let random = ["He ganado! Jejej Elegi papel :page_facing_up:. El papel cubre a la roca. :sunglasses:", // Perdedor -jeje-
                "Has ganado! Elegi tijera :scissors:. Las tijeras no pueden cortar rocas. :pensive:", // Ganaste :D
                "Empate. :rock: vs :rock:, gana... ninguno! :neutral_face:"
                ] // Empate ._.

            // Enviamos el mensaje aplicando Math.random() que nos dara una respuesta aleatoria de la matriz
                await int.deferUpdate();
                int.editReply({ content: `${random[Math.floor(Math.random() * random.length)]}`, components: []});
            }
        },
        {
            id: "papel",
            execute: async (botxi, int) => {
                let random = ["He ganado! Elegi tijera :scissors:. Las tijeras cortan el papel. :sunglasses:", // Perdedor -jeje-
                "Has ganado! Elegi piedra :rock:. El papel cubre a la roca. :unamused:", // Ganaste :D
                "Empate.. :page_facing_up: vs :page_facing_up: ._."
                ]

                await int.deferUpdate();
                int.editReply({ content: `${random[Math.floor(Math.random() * random.length)]}`, components: []});
            }
        },
        {
            id: "tijeras",
            execute: async (botxi, int) => {
                let random = ["He ganado! Elegi piedra :rock:. Tus tijeras no pueden cortar rocas. :sunglasses:", // Perdedor -jeje-
                "Has ganado! Elegi papel :page_facing_up:. Las tijeras cortan el papel. :confused:", // Ganaste :D
                "Empate! :scissors: contra :scissors:... ._. :handshake:"
                ]
                await int.deferUpdate();
                int.editReply({ content: `${random[Math.floor(Math.random() * random.length)]}`, components: []});
            }
        }
    ]
}