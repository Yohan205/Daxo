const { Client, Message } = require('discord.js');
const fs = require('fs');
const { join } = require('path');
const { spawn } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const { createAudioPlayer, createAudioResource } = require('@discordjs/voice');

const player = createAudioPlayer();


module.exports = {
    name: "stopRec",
    desc: "Stop recording",
    usage: "stopRec",
    aliases: ["stopRec",],
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
      const recordingMap = botxi.configs.get("records"); // Mapa para almacenar los canales de voz en los que se está grabando

    // Verifica que el autor del mensaje esté en un canal de voz y haya una grabación activa en ese canal
    if (!message.member.voice.channel && !recordingMap.has(message.member.voice.channelId)) return message.channel.send('No hay grabación activa en tu canal de voz.');

    console.log('--------------------------------');

    const { audioStream, connection } = recordingMap.get(message.member.voice.channelId);

    audioStream.destroy(); // Finaliza el flujo de audio

    message.channel.send('Grabación finalizada.');
    
    // Cuando finalice la grabación
    audioStream.on('destroy', () => {
        // Convierte el archivo PCM a MP3 usando ffmpeg
        const ffmpegProcess = spawn(ffmpeg, [
          '-f',
          's16le',
          '-ar',
          '48000',
          '-ac',
          '2',
          '-i',
          'audio.pcm',
          'audio.mp3',
        ]);
  
        ffmpegProcess.on('close', () => {
          // Elimina el archivo PCM después de la conversión
          fs.unlinkSync('audio.pcm');
        });
      });

      let resource = createAudioResource(join(__dirname, 'audio.mp3'));
    // Reproduce el archivo de audio grabado
    player.play(resource);
    connection.subscribe(player);

    player.on('idle', () => {
      connection.destroy(); // Desconecta al bot del canal de voz después de la reproducción
    });
    recordingMap.delete(message.member.voice.channel.id); // Elimina el objeto de flujo de audio del mapa

    }
}