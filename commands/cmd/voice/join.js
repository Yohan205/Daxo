const { joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior, PlayerSubscription, VoiceConnectionStatus, AudioPlayerStatus, createAudioResource } = require('@discordjs/voice');

module.exports = {
    name: "join",
    desc: "El bot se unirá a tu chat de voz",
    usage: "join",
    aliases: [],
    isPrivate: false,
    guildOnly: false,
    category: "voice",
    isOwner: true,
    status: true,
    run: (botxi, message, args) => {
        const src = createAudioResource("E:/Daxo/public/music/Veorra - Set Free.mp3", { inlineVolume: true});
        const player = createAudioPlayer();
        if (!message.member.voice.channelId) return message.channel.send('Debes estar conectado a un canal de voz');
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channelId,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });
        
        message.channel.send('Conectado al canal de voz.');
        // new PlayerSubscription(connection, player);
        src.volume.setVolume(0.6);
        player.play(src);
                connection.subscribe(player);

        /* switch (args[0]) {
            case "a":
                player.pause();
                connection.subscribe(player);
                message.channel.send('Cancion pausada.');
                break;
            case "b":
                player.unpause();
                
                message.channel.send('Cancion despausada.');
                break;
            case "c":
                
                break;
        } */

        connection.on(VoiceConnectionStatus.Ready, (oldState, newState) => {
            console.log('Connection is in the Ready state!');
            // console.log(oldState);
            console.log(newState.subscription.player.resource);
        });
    }
}