const chalk = require("chalk");
const Discord = require('discord.js');
const Zeew = require("zeew");

module.exports = {
    name: "guildMemberAdd", //typingStart
    /**
     * 
     * @param {Discord.Client} botxi 
     * @param {Discord.GuildMember} member 
     * @returns Parametros xd
     */
    run: async(botxi, member, BOT) => {
        const zeewImg = new Zeew.img(BOT.TOKEN_ZEEW);
        // console.log("Nuevo usuario: " + chalk.magenta(member.user.username) + ` se ha unido a ${member.guild.name}.`);
        let canal = botxi.channels.cache.get(member.guild.systemChannelId);

        const card = new zeewImg.card.bienvenida()
            .token(BOT.TOKEN_ZEEW)
            .estilo("anime") // mas estilos en la doc
            .avatar(member.user.displayAvatarURL({ format: 'png', dynamic: true }))
            .fondo("https://yohancolla.alwaysdata.net/DiscordThemeMaker015.jpg")
            .colorTit("#FF3DB0")
            .titulo("Bienvenido")
            .colorDesc("#FFFFFF")
            .descripcion("Tenemos un nuevo usuario");

        const render = await zeewImg.card.render(card);
        let att = new Discord.MessageAttachment(render, 'welcome.png') // creamos el attachment con el buffer
        canal.send({files: [att]});
    }
}