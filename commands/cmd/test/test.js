// const Zeew = require('zeew');
const Discord = require('discord.js');

module.exports = {
    name: "test",
    desc: "Comando de pruebas",
    usage: "test",
    aliases: [],
    isPrivate: false,
    guildOnly: false,
    category: "test",
    isOwner: true,
    status: true,
    run: async (botxi, message, args, BOT) => {
        // console.log(botxi.users)
        // console.log(args[1]) 

        // let infoRol = []; 
        
        /* for (let ro of message.guild.members.resolve(message.author.id).roles.cache){
            const r = ro[1];
            const RO = message.guild.roles.resolve(r.id);
            if (r.name !== "@everyone"){
                
            }
            var infos = {
                id: r.id,
                name: r.name,
                color: r.color, 
                hoist: r.hoist, 
                rawPosition: r.rawPosition
            }
            infoRol.push(infos)
        }
        const rolAlto = message.member.roles.highest;
        for (const e of infoRol){
            if (rolAlto.id == e.id) {
                console.log(rolAlto.color);
            }
        } */

        // BOTONES
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                .setCustomId("b1")
                .setLabel("Presioname ❤️")
                .setStyle("PRIMARY")
                .setEmoji("👍")
            )

            const m = await message.channel.send({content: "Este es un botón", components: [row], tts: true});

            const ifilter = i => i.user.id === message.author.id;

            const colector = m.createMessageComponentCollector({ filter: ifilter, time: 6000});

            colector.on("collect", async i => {
                if (i.customId === "b1") {
                    await i.deferUpdate();
                    i.editReply({ content: "Respuesta al botón", components: []});
                }
            });
            

        message.delete({ timeout: 10000 });      
    }
}