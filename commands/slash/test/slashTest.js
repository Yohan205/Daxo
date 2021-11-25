module.exports = {
    name: "ping",
    description: "Comando ping",
    type: 1,
    run: (botxi, int) => {
        int.reply({content: "Pong!", ephemeral: true});
        console.log(int);
    }
}