module.exports = {
    name: "ping",
    description: "Comando ping",
    type: 1,
    run: (botxi, int) => {
        //console.log(int);
        int.reply({content: `📨 Ping Mensajes: \`${Math.floor(int.createdTimestamp - Date.now())} ms\`
        🛰️ Ping DiscordAPI: \`${botxi.ws.ping} ms\``, ephemeral: true});
        /*int.reply({content: '🏓 Pong!', ephemeral: true}).then((m) => {
            m.edit(
              
            );
          });*/
    }
}