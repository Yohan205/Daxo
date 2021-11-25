const chalk = require('chalk');
const { Client, Message, Collection } = require('discord.js');

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Client} botxi 
     * @param {Message} message 
     * @returns Parametros xd
     */
    run (botxi, message, BOT) {
        const prefixes = ['d!', 'daxo ', 'Daxo ', 'D!']; //Array of prefixes
        let prefix = ""; // Save prefix used
        // Este bucle verifica si el prefix esta en la lista de prefixes
        for (const thisPrefix of prefixes) {if (message.content.startsWith(thisPrefix)) prefix = thisPrefix;}
        if (!prefix) return; // si el prefix no esta en la lista, no lo lee el bot
        if (message.author.bot) return; // si el autor del mensaje es un bot no lo lee
        // agrega a una lista los argumentos y toma en otra variable el comando
        let [command, ...args] = message.content.slice(prefix.length).trim().split(/\s+/);
        // const command = args.shift().toLowerCase();
        botxi.configs.set("prefix", prefix);
        botxi.buttons = new Collection();
        // botxi.configs.set("BOT", BOT)

        const cmd = botxi.commands.get(command) || botxi.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
        if(!cmd) return;
        if(!cmd.status) return message.reply(`El comando **${cmd.name}** no está activo`); // si estatus es true mandar mensaje que el comando esta desactivado
        if(cmd.btn){
            cmd.btn.map(b => {botxi.buttons.set(b.id, b)})
        }

        cmd.run(botxi, message, args, BOT)
    }
}