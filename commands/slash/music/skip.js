module.exports = {
    name: 'skip',
    description: 'Cambia de canción a la siguiente o la que escojas',
    type: 1,
    require: true,
    options: [
        {
            name: 'position',
            description: "Escoje la posición según la lista",
            type: 10,
            choices: [
                {
                    name: '1',
                    value: 1
                },
                {
                    name: '2',
                    value: 2
                },
                {
                    name: '3',
                    value: 3
                },
                {
                    name: '4',
                    value: 4
                },
                {
                    name: '5',
                    value: 5
                },
                {
                    name: '6',
                    value: 6
                },
                {
                    name: '7',
                    value: 7
                },
                {
                    name: '8',
                    value: 8
                },
                {
                    name: '9',
                    value: 9
                },
                {
                    name: '10',
                    value: 10
                }
            ]
        }
    ],
    run: (botxi, int) => {
        int.channel.sendTyping();

        const queue = botxi.distube.getQueue(int.guild.id);

        if (!queue) return int.reply("Parece que no hay nada en cola...😶‍🌫️ Que tal si agregas algo? \n Usa el comando \`play\` y me dices la 🎶 canción 🎵 que quieras 😉");

        console.log(queue.songs);

        const optInt = int.options._hoistedOptions[0];

        if (!optInt) {
            int.reply("Reproduciendo el siguiente contenido")
            botxi.distube.skip(int);
            return
        }

        int.reply(`Saltando a otra canción`);
        botxi.distube.jump(int, optInt.value)
        .catch(err => int.reply("No leí una posición válida."));
    }
}