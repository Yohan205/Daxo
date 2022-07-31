const { getVoiceConnection } = require('@discordjs/voice');
module.exports = {
    name: "leave",
    desc: "El bot se saldrá del chat de voz",
    usage: "leave",
    aliases: [],
    isPrivate: false,
    guildOnly: false,
    category: "music",
    cooldown: 0,
    status: true,
    run: (botxi, message) => {
        message.channel.send('Desconectando del canal de voz.');
        const connection = getVoiceConnection(message.guild.id);
        connection.destroy();
    }
}
