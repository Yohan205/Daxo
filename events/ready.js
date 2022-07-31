const { countFiles } = require("../controllers/utilities");
const RAM = require("../controllers/usedRAM");

module.exports = {
    name: "ready",
    type: "once",
    run: (botxi, args, BOT) => {
        const cantidadComandos = countFiles("./commands/text/", ".js");
        const slashCommands = botxi.slashCommands.map(x => x); //Mapeo de todos los comandos
        // console.log(slashCommands);
        // botxi.application.commands.set(slashCommands); //Slash Commands Global
        botxi.guilds.cache.get("855869897539584061").commands.set(slashCommands);
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