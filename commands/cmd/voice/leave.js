const { getVoiceConnection } = require('@discordjs/voice');
module.exports = {
    name: "leave",
    desc: "El bot se saldrá del chat de voz",
    usage: "leave",
    aliases: [],
    isPrivate: false,
    guildOnly: false,
    category: "voice",
    isOwner: true,
    status: true,
    run: (botxi, message) => {
        const connection = getVoiceConnection(message.guild.id);
        connection.destroy();
        message.channel.send('Desconectando del canal de voz.');
    }
}
