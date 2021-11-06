const { joinVoiceChannel } = require('@discordjs/voice');
module.exports = {
    name: "join",
    desc: "El bot se unirá a tu chat de voz",
    usage: "join",
    aliases: [],
    isPrivate: false,
    guildOnly: false,
    category: "voice",
    isOwner: true,
    run: (botxi, message) => {
        if (!message.member.voice.channelId) return message.channel.send('Debes estar conectado a un canal de voz');
        joinVoiceChannel({
            channelId: message.member.voice.channelId,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });
        message.channel.send('Conectado al canal de voz.');
    }
}