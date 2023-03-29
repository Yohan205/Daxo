module.exports = {
    name: "addList",
    type: "distube.on",
    run: async(queue, playlist) => {
        const canal = queue.textChannel;
        canal.send(`Se añadió la playlist \`${playlist.name}\` con ${playlist.songs.length} songs a la cola`);
    }
}