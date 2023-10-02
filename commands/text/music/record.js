const { Client, Message } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');
const fs = require('fs');


module.exports = {
    name: "record",
    desc: "Graba tu llamada si así lo deseas",
    usage: "record",
    aliases: ["record", "rec"],
    isPrivate: false,
    guildOnly: false,
    category: "music",
    cooldown: 10,
    status: true,
    /**
    * @param {Client} botxi
    * @param {Message} message
    * @param {String} args
    * @returns
    */
    run: async(botxi, message, args) => {
        // Verifica que el autor del mensaje esté en un canal de voz
        const canal = message.member.voice.channel;
        if (!canal) return message.reply('Debes estar en un canal de voz para usar este comando.');

        const connection = joinVoiceChannel({
            channelId: canal.id,
            guildId: canal.guild.id,
            adapterCreator: canal.guild.voiceAdapterCreator,
        });

        const recordingMap = botxi.configs.get("records"); // Mapa para almacenar los canales de voz en los que se está grabando

        const audioStream = connection.receiver.subscribe(message.member, {
            end: {
                behavior: NoSubscriberBehavior.Destroy,
                duration: 1000,
            },
        });

        const outputStream = fs.createWriteStream('audio.pcm');
        audioStream.pipe(outputStream);

        const audioResource = createAudioResource('audio.pcm');
        const audioPlayer = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause,
        },
        });

        audioPlayer.play(audioResource);
    connection.subscribe(audioPlayer);
    audioPlayer.on('error', console.error);
    audioPlayer.on('stateChange', (oldState, newState) => {
      if (newState.status === 'idle') {
        connection.destroy();
        fs.unlinkSync('audio.pcm');
      }
    });

        message.channel.send('Comenzando la grabación...');

    }
}