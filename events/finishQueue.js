module.exports = {
    name: "finish",
    type: "distube.on",
    run: async(queue) => {
        const canal = queue.textChannel;
        canal.send(`No hay mas canciones en cola.`)
    }
}