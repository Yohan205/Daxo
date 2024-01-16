// const Zeew = require('zeew');
// const { BOT } = require("./settings/config.js");
//const { Client, EmbedBuilder, MessageAttachment } = require("discord.js");
// const Genius = require("genius-lyrics");
const fetch = require('node-fetch');
const MiPago = require('mi-pago');
const { miPay } = require('../../../controllers/utilities');
const { Message } = require('discord.js');

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
  /**
   * 
   * @param {data} botxi client info
   * @param {Message} message message to send
   * @param {array} args 
   * @param {BOT} BOT configs
   */
  run: async (botxi, message, args, BOT) => {
    let mensaje = "OK", data;

    const rec = new miPay(BOT.keyMiPago);
    const rec1 = new MiPago(BOT.keyMiPago);

    // data = await rec.recargaPaq(args[0],args[1],args[2],"Saldo");
    // data = await rec1.querySell(args[0])
    // data = rec.queryPaqs(args[0]? args[0] : "", args[1]? args[1] : "")

    // mensaje = `**Recarga ${data.Detalle}** por $${data.value? data.value : "Off"} al número \`${data.number ? data.number : data.Datos.Des}\` \n TokenID: \`${data.tk}\` - Ref: ${data.Ref ? data.Ref : "Off"}\nEl saldo actual es: ${await rec1.saldo} `;

    // console.log(data);
    // console.log(await rec.queryPaqs("Claro", "ti"));

    async function saldoTarjeta(cardID) {
      // const encodedQuery = encodeURIComponent(query);
      // const url = `${API_URL}${encodedQuery}`;
      const url = `http://localhost:2023/api`;
      const data = { cardID, name: 'YohanColla' }

      try {
        // @ts-ignore
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const result = await response.text();
        return result.trim();
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }

    message.channel.sendTyping(args[0]);
    mensaje = await saldoTarjeta(710489695);

    
//*

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
