module.exports = {
    name: "ping",
    description: "Comando ping",
    type: 1,
    run: (botxi, int) => {
        int.reply({content: "Pong!"})
        console.log(int);
    }
}