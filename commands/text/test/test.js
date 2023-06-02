// const Zeew = require('zeew');
// const { BOT } = require("./settings/config.js");
//const { Client, EmbedBuilder, MessageAttachment } = require("discord.js");
// const Genius = require("genius-lyrics");
const fetch = require('node-fetch');
const miPago = require('mi-pago');
const { recargaQuery, miPay } = require('../../../controllers/utilities');

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
    let mensaje = "OK", data;
    // const keyMP = BOT.keyMiPago; 

    const rec = new miPay(BOT.keyMiPago);
    const rec1 = new miPago(BOT.keyMiPago);

    //data = await rec.recargar(args[0],args[1],args[2],"Saldo");
    // data = await rec.queryPaqs(args[0])
    data = rec.queryPaqs(args[0]? args[0] : "", args[1]? args[1] : "")

    // mensaje = `**Recarga ${data.Detalle}** por $${data.value? data.value : "Off"} al número \`${data.number ? data.number : "Off"}\` \n TokenID: \`${data.tk}\` - Ref: ${data.Ref}\nEl saldo actual es: ${await rec.saldo} `;

    console.log(data);
    // console.log(await rec.queryPaqs("Claro", "ti"));
    
    /*Usando el wolfram alpha
    const API_KEY = BOT.TOKEN.WOLFRAM_ALFA;
    const API_URL = `http://api.wolframalpha.com/v1/result?appid=${API_KEY}&i=`;

    async function wolframAlphaQuery(query) {
      const encodedQuery = encodeURIComponent(query);
      const url = `${API_URL}${encodedQuery}`;

      try {
        const response = await fetch(url);
        const result = await response.text();
        return result.trim();
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }

    // Ejemplo de uso
    const query = '2+2';
    wolframAlphaQuery(query)
      .then(result => {
        console.log(`El resultado de "${query}" es: ${result}`);
        mensaje = `El resultado de "${query}" es: ${result}`;
      })
      .catch(error => {
        console.error('Error:', error);
      });
//*/

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
  
    // console.log(res[0].name + res[0].url);
    message.delete({ timeout: 10000 });
  },
  /*btn: [
    {
      id: "b1",
      execute: async (botxi, int) => {
        await int.deferUpdate();
        int.editReply({ content: "Respuesta al botón", components: [] });
      },
    },
  ],*/
};
