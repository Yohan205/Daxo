module.exports = {
    name: "playSong",
    type: "distube.on",
    run: async (queue, song) => {
        const canal = queue.textChannel;
        canal.send(`**Reproduciendo: ** \`${song.name}\` | \`${song.formattedDuration}\``)
    }
}