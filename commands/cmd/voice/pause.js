const { getVoiceConnection, VoiceConnectionStatus, AudioPlayerStatus, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

module.exports = {
    name: "pause",
    desc: "Pausa la canción",
    usage: "pause",
    aliases: ["pause",],
    isPrivate: false,
    guildOnly: false,
    category: "voice",
    isOwner: true,
    status: false,
    run: (botxi, message, args) => {
        const player = createAudioPlayer();
        const connection = getVoiceConnection(message.guild.id);

        if (!message.member.voice.channelId) return message.channel.send('Debes estar conectado a un canal de voz');

        player.on(AudioPlayerStatus.Playing, (oldState, newState) => {
            console.log('Audio player is in the Playing state!');
            console.log(oldState);
            console.log("ESPACIOOOOOOO");
            console.log(newState);
        });
        
        connection.on(VoiceConnectionStatus.Ready, (oldState, newState) => {
            console.log('Connection is in the Ready state!');
            console.log("ESPACIOOOOOOO");
            console.log(newState.subscription.player.resource);
        });

        switch (args[0]) {
            case "a":
                player.pause();
                message.channel.send('Cancion pausada.');
                break;
            case "b":
                player.unpause();
                message.channel.send('Cancion despausada.');
                break;

            default:
                
                break;
        }
        
        
    }
}