module.exports = {
    name: "ppt",
    desc: "Juega piedra, Papel o tijeras con Daxo",
    usage: "ppt",
    aliases: [],
    isPrivate: false,
    guildOnly: false,
    category: "fun",
    isOwner: true,
    status: true,
    run: (botxi, message, args) => {
        // Condicionaremos que si el usuario no manda ningun argumento. O sea solo escribe el comando. *
        if (!args[0]) return message.channel.send("Opciones: `piedra`, `papel` o `tijera`").then(m => m.delete({ timeout: 10000 }))

        // Haremos una declaracion en matriz con las diferentes opciones ya dichas.
        let Options = ["piedra", "papel", "tijera"];
        // Condicionamos la matriz con el metodo .includes() que nos va a determinar si lo que mandamos esta dentro de la matriz, si no entonces devolvera false.
        if (!Options.includes(args[0].toLowerCase())) return message.reply(":x: Opcion incorrecta!").then(d => d.delete({ timeout: 60000 }));

        //Ahora empezamos a obtener las cosas de la matriz y condicionamos..

        // Si args[0] es igual a "piedra" es decir, if(args[0] == <-piedra-/papel/tijera>)
        if (args[0] == "piedra") {
            // Creamos una condicional de matriz que tendra las respuestas.
            let random1 = ["He ganado! Jejej Elegi papel :page_facing_up:. El papel cubre a la roca. :sunglasses:", // Perdedor -jeje-
                    "Has ganado! Elegi tijera :scissors:. Las tijeras no pueden cortar rocas. :pensive:", // Ganaste :D
                    "Empate. :rock: vs :rock:, gana... ninguno! :neutral_face:"
                ] // Empate ._.

            // Enviamos el mensaje aplicando Math.random() que nos dara una respuesta aleatoria de la matriz.
            message.reply(" " + random1[Math.floor(Math.random() * random1.length)] + "")

            // Si no es "piedra", pero es "papel"
        } else if (args[0] == "papel") {

            let random2 = ["He ganado! Elegi tijera :scissors:. Las tijeras cortan el papel. :sunglasses:", // Perdedor -jeje-
                "Has ganado! Elegi piedra :rock:. El papel cubre a la roca. :unamused:", // Ganaste :D
                "Empate.. :page_facing_up: vs :page_facing_up: ._."
            ]

            message.reply(" " + random2[Math.floor(Math.random() * random2.length)] + "")

        } else if (args[0] == "tijera") {
            let random3 = ["He ganado! Elegi piedra :rock:. Tus tijeras no pueden cortar rocas. :sunglasses:", // Perdedor -jeje-
                "Has ganado! Elegi papel :page_facing_up:. Las tijeras cortan el papel. :confused:", // Ganaste :D
                "Empate! :scissors: contra :scissors:... ._. :handshake:"
            ]

            message.reply(" " + random3[Math.floor(Math.random() * random3.length)] + "")
        }
    }
}