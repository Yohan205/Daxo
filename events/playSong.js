const { distubeStatus } = require('../controllers/utilities');

module.exports = {
    name: "playSong",
    type: "distube.on",
    run: async (queue, song) => {
        const canal = queue.textChannel;

        // queue.filters.map( e => console.log(e))

        canal.send(`**Reproduciendo: ** \`${song.name}\` | \`${song.formattedDuration}\`\`\nRequested by: ${song.user}`) //\n${distubeStatus(queue)}
    }
}