const { countFiles } = require("../controllers/utilities");
const RAM = require("../controllers/usedRAM");
const fetch = require('node-fetch');
// const { BOT } = require("../settings/config");

module.exports = {
    name: "ready",
    type: "once",
    /**
     * 
     * @param {String} args 
     * @param {Object} BOT configs 
     * @return
     */
    run: async (botxi, args, BOT) => {
        const cantidadComandos = countFiles("./commands/text/", ".js");
        const slashCommands = botxi.slashCommands.map(x => x); //Mapeo de todos los comandos
        // console.log(slashCommands);

        //Para actualizar los comandos slash activar la siguietne linea
        //botxi.application.commands.set(slashCommands); //Slash Commands Global

        botxi.guilds.cache.get(BOT.serverID).commands.set(slashCommands);
        const estados = [
            {
                name: "Daxo help",
                type: "WATCHING"
            },
            {
                name: "Minecraft",
                type: "PLAYING"
            },
            {
                name: `${botxi.guilds.cache.size} servidores`,
                type: "COMPETING"
            },
            {
                name: `${botxi.users.cache.size} Usuarios`,
                type: "LISTENING"
            },
        ];
    
        setInterval(() => {
            function presence(){
                botxi.user.setPresence({
                    status: "online",
                    activities: [estados[Math.floor(Math.random() * estados.length)]]
                });
            }
            presence();
        }, 20000);
        
        console.info(BOT.console.info + `Memoria RAM usada ${RAM.usedByProcess} y la memoria libre es ${RAM.free}`);
        console.log(BOT.console.info + `Conectado en ${botxi.guilds.cache.size} servidores y ${botxi.users.cache.size} usuarios con ${cantidadComandos} comandos`);

    }
}