module.exports = {
    name: "ping",
    description: "Comando ping",
    type: 1,
    run: (botxi, int) => { // int -> interaction with command
        // console.log(int);
        
        int.reply({content: '🏓 Pong!', ephemeral: true});
    },
    options: [
        {
            name: "message",
            description: "Ping Message or API",
            type: 5, // 3 is type STRING
            run: (botxi, int) => {
                // console.log(int.options);
                int.reply({content: `📨 Ping Mensajes: \`${Math.floor(int.createdTimestamp - Date.now())} ms\``, ephemeral: true});
            }
        },
        {
            name: "dapi",
            description: "Ping Discord API",
            type: 3,
            run: (botxi, int) => {
                int.reply({content: `🛰️ Ping DiscordAPI: \`${botxi.ws.ping} ms\``, ephemeral: true});
            }
        }
    ]
}