module.exports = {
    name: 'volume',
    description: 'Cambia el volumen del reproductor',
    type: 1,
    require: true,
    options: [
        {
            name: 'percent',
            description: "Escribe un número de 1 a 200",
            type: 4,
            require: true,
            min_value: 1,
            max_value: 200
        }
    ],
    run: (botxi, int) => {
        int.channel.sendTyping();

        const vol= int.options._hoistedOptions[0].value;

        if (vol > 200) return int.reply("Hey! has puesto un volumen demasiado alto 😑 \n Bájale un poco para no aturdir a la people");

        botxi.distube.setVolume(int, vol);
        int.reply(`He ajustado el volumen al ${vol}%`);
    }
}