module.exports = {
    name: "ping",
    description: "Comando ping",
    type: 1,
    run: (botxi, int) => {
        console.log(int);
        int.reply({content: '🏓 Pong!', ephemeral: true}).then((m) => {
            m.edit(
              `📨 Ping Mensajes: \`${Math.floor(m.createdTimestamp - Date.now())} ms\`
          🛰️ Ping DiscordAPI: \`${botxi.ws.ping} ms\``
            );
          });
    }
}