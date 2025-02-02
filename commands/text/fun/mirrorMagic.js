//@ts-nocheck
const Discord = require('discord.js');
//const Canvas = require('canvas');

module.exports = {
    name: "mirrorMagic",
    desc: "Usa el espejo mágico y nombra a tu persona favorita. OwO",
    usage: "espejoMagico <@usuario>",
    aliases: ["mirrorMagic", "espejoMagico", "espejo", "mirror"],
    isPrivate: false,
    guildOnly: false,
    category: "fun",
    cooldown: 10,
    status: false,
    /**
    * @param {Discord.Client} botxi
    * @param {Discord.Message} message
    * @param {String} args
    * @returns
    */
    run: async(botxi, message, args) => {
        let mention = message.mentions.users.first() || botxi.users.cache.get(args[0]) || message.author // necesitaremos un usuario para sacar su avatar

        let avatar = mention.displayAvatarURL({ size: 256, format: 'png', dynamic: false }) // el avatar en si

        const canvas = Canvas.createCanvas(451, 679) // el canvas de 451 x 679 para que quede perfect la imagen :perrito:
        const ctx = canvas.getContext('2d') // el contexto

        let bg = await Canvas.loadImage('https://cdn.discordapp.com/attachments/750461925099307129/753343100826550473/images.jpeg') // la imagen del meme del espejo
        ctx.drawImage(bg, 0, 0) //dibujamos la imagen en todo el canvas

        ctx.beginPath() // empezamos un path para hacer un circulo
        ctx.arc(canvas.width/2, 500, 125, 0, Math.PI * 2) // creamos el circulo
        ctx.fillStyle = 'rgba(0,0,0,0.2)' // rellenaremos 
        ctx.fill() // rellenamos el circulo
        ctx.stroke() // creamos el circulo en si
        ctx.closePath() // cierro el path
        ctx.clip() //y se clipea

        let imagen = await Canvas.loadImage(avatar) // cargamos el avatar en Canvas
        ctx.drawImage(imagen, 100.5, 375) // y lo dibujamos en la zona del circulo anterior

        let att = new Discord.MessageAttachment(canvas.toBuffer(), 'espejo.png') // creamos el attachment con el buffer
        
        message.channel.send({files: [att]});
        message.delete();
    }
}