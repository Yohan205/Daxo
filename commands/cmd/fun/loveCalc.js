const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "loveCalculator",
    desc: "Calcula el amor entre dos usuarios",
    usage: "loveCalculator",
    aliases: ["love", "loveCalc"],
    isPrivate: false,
    guildOnly: false,
    category: "fun",
    isOwner: true,
    run: (botxi, message, args) => {
        const EMBED = botxi.configs.get("EMBED");
        let personas = message.mentions.users.map(m => m.username).join(' y ');

            if (!personas) return message.channel.send('Tienes que mencionar a dos usuarios para calcular');

            const random = Math.floor(Math.random() * 100);
            let heard = "";

            if (random < 50) {
                heard = ':broken_heart:';

            } else if (random < 80) {
                heard = ':sparkling_heart: :two_hearts:';

            } else if (random < 101) {
                heard = ':heartpulse: :revolving_hearts:';

            }

            const embed = EMBED
                .setTitle('El porcentaje de amor de ' + personas + ' es:')
                .setDescription(heard + ' **' + random + ' %**' + ' ' + heard)
                .setColor("RANDOM");

            message.channel.send({embeds:[embed]});
    }
}