module.exports = {
    name: "play", //Reproductor
    description: "Reproduce una canción desde Youtube",
    type: 1,
    require: true,
    options: [
        {
            name: "add",
            description: "Escribe el nombre de la canción",
            type: 3,
            require: true,
        }
    ],
    run: (botxi, int) => {
        int.channel.sendTyping();

        const canal = int.member.voice.channel; //Guarda el canal donde se encuentre el usuario

        if (!canal) return int.reply({content: "No estás en un canal de voz,\nDebes estar en un canal de voz para poder unirme.", ephemeral: true});

        const song= int.options._hoistedOptions[0].value;

        int.reply({content: "Buscando....", ephemeral: true});
        // console.log(song);

        botxi.distube.play(canal, song, {
            member: int.member,
            textChannel: int.channel,
            int
        }).catch(err => int.channel.send("No pude realizar la búsqueda."));
    }
}