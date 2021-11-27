const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ship",
    desc: "Daxo calculará el porcentaje de amor entre dos usuarios 7u7.",
    usage: "ship <@usuario1> <@usuario2>",
    aliases: ["loveCalculator", "loveCalc", "ship"],
    isPrivate: false,
    guildOnly: false,
    category: "fun",
    cooldown: 5,
    status: true,
    run: (botxi, message, args) => {
        const random = Math.floor(Math.random() * 100);
        let heard = "";
        if (random < 50) { // si el valor es menor a 50
            heard = ':broken_heart:'; // entonces muestra un heart broken
        } else if (random < 80) {
            heard = ':sparkling_heart: :two_hearts:';
        } else if (random < 101) {
            heard = ':heartpulse: :revolving_hearts:';
        }
        const embed = new MessageEmbed()
            .setDescription(heard + ' **' + random + ' %**' + ' ' + heard)
            .setColor("RANDOM");

        
        if (args[1]){
            let personas = message.mentions.users.map(m => m.username).join(' y ');

            if (!personas) return message.channel.send('Tienes que mencionar a dos usuarios para calcular');

            // muestra segun el valor de love cierto emoji de corazon
            
            embed.setTitle('El porcentaje de amor de ' + personas + ' es:');
            
            message.channel.send({embeds:[embed]});
        } else {
            let persona = message.mentions.members.first() || //por mencion
            message.guild.members.resolve(args[1]);

            embed.setTitle('El porcentaje de amor entre '+ message.author.username + ' y ' + persona.user.username + ' es:');
            
            message.channel.send({embeds:[embed]});
        }

        
    }
}