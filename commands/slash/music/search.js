module.exports = {
    name: 'search',
    description: "Busca una canción con lo que recuerdes de ella",
    type: 1,
    require: true,
    options: [
        {
            name: 'text',
            description: "Escribe la canción a buscar",
            type: 3,
            reqeuire: true
        }
    ],
    run: async (botxi, int) => {
        const args = int.options._hoistedOptions[0].value;
        let results = await botxi.distube.search(args);
        // console.log(searches);
        const searches = results.map(song =>`\t**=>>** ${song.name} - \`${song.formattedDuration}\` `).slice(0, 10).join('\n');

        int.reply({content: `Según lo que me dijiste \`${args}\` \n **Encontré éstas canciones**:\n ${searches}\` `});
    }
}