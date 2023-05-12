module.exports = {
    name: "addSong",
    type: "distube.on",
    run: async(queue, song) => {
        const canal = queue.textChannel;
        canal.send(`**Se añadió: ** \`${song.name}\` | \`${song.formattedDuration}\``)
    }
}