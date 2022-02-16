module.exports = {
    name: "play",
    description: "Reproduce una canción en un canal de voz",
    type: 1,
    run: (botxi, int) => {
        // int.channel.sendTyping()
        const canal = int.member.voice.channel;
        if (!canal) return int.reply({content: "No estás en un canal de voz,\nDebes estar en un canal de voz para poder unirme.", ephemeral: true});;

        const song = "Subwoofer Lullaby c418";
        // if (!song) return int.reply({content: "Olvidaste decirme que quieres reproducir...", ephemeral: true});

        botxi.distube.play(canal, song, {
            member: int.member,
            textChannel: int.channel,
            int
        });
    }
}