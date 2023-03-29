// const Zeew = require('zeew');
// const { BOT } = require("./settings/config.js");
//const { Client, EmbedBuilder, MessageAttachment } = require("discord.js");
const Genius = require("genius-lyrics");

module.exports = {
  name: "test",
  desc: "Comando de pruebas",
  usage: "test",
  aliases: [],
  isPrivate: false,
  guildOnly: false,
  category: "test",
  cooldown: 0,
  status: true,
  run: async (botxi, message, args, BOT) => {
    // console.log(botxi.users)
    let aBuscar = "";

    for (let a = 0; a < args.length; a++) {
      aBuscar += " "+args [a];
    }
    console.log(aBuscar);
    const Client = new Genius.Client(BOT.TOKEN_GENIUS);
    
    const searches = await Client.songs.search(aBuscar);
    
    let busquedas = "";

    for (let b = 0; b < searches.length; b++) {
      busquedas += searches[b].fullTitle +"\n"+ searches[b].thumbnail+"\n";
      
    }

    console.log(searches);

    const mensaje = busquedas;

    // Pick first one
    // const firstSong = searches[0];
    //console.log("About the Song:\n", firstSong, "\n");
    
    

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
    /* const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                .setCustomId("b1")
                .setLabel("Presioname ❤️")
                .setStyle("PRIMARY")
                .setEmoji("👍")
            );

        message.channel.send({content: "Este es un botón", components: [row]}); */

    // const ifilter = i => i.user.id === message.author.id;

    // const colector = m.createMessageComponentCollector({ filter: ifilter, time: 6000});

    message.channel.send({ content: mensaje});
    // let res = await botxi.distube.search("overthinker");
    // console.log(res[0].name + res[0].url);
    message.delete({ timeout: 10000 });
  },
  btn: [
    {
      id: "b1",
      execute: async (botxi, int) => {
        await int.deferUpdate();
        int.editReply({ content: "Respuesta al botón", components: [] });
      },
    },
  ],
};
