module.exports = {
    name: "ready",
    once: true,
    run: (botxi) => {
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
        
        console.log(
            `Estoy listo! ${botxi.user.username} conectado en ${botxi.guilds.cache.size} servidores y  ${botxi.users.cache.size} usuarios.`
        );

        const slashCommands = botxi.slashCommands.map(x => x);
        // console.log(slashCommands);
        botxi.application.commands.set(slashCommands);
    }
}