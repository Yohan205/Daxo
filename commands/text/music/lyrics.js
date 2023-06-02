const { Client, Message } = require('discord.js');
const Genius = require("genius-lyrics");
const { separarString } = require('../../../controllers/utilities')


module.exports = {
    name: "lyrics",
    desc: "Obtiene la letra de la canción que busques.",
    usage: "lyrics (nombre de la canción) (nombre del artista)",
    aliases: ["lyrics","letras"],
    isPrivate: false,
    guildOnly: false,
    category: "music",
    cooldown: 30,
    status: true,
    /**
    * @param {Client} botxi
    * @param {Message} message
    * @param {String} args
    * @returns
    */
    run: async(botxi, message, args, BOT) => {
        let aBuscar = "";

        for (let a = 0; a < args.length; a++) {
          aBuscar += " "+args [a];
        }

        const ClientGenius = new Genius.Client(BOT.TOKEN.GENIUS);
        
        const searches = await ClientGenius.songs.search(aBuscar);
        
        // Pick first one
        const firstSong = searches[0];
        
        // Ok lets get the lyrics
        let lyrics = "", letra = true, songTitle = "Lyrics of "+firstSong.title+":\n";

        firstSong.lyrics()
        .catch((e) => {
            message.channel.send({ content: "No lyrics found"}); 
            console.error(e);
            letra = false;
        });

        if (letra) {
            lyrics = await firstSong.lyrics();
            if (lyrics.length > 2000) {
               letra = separarString(lyrics, 2000);
                
                message.channel.send({ content: songTitle});
                for (let o = 0; o < letra.length; o++) {
                    message.channel.send({ content: letra[o]});
                }
            } else {
                letra = songTitle + lyrics + "\n";
                message.channel.send({ content: letra});
            }
        }
    }
}