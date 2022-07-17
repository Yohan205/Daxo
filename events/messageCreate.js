const chalk = require('chalk');
const timeUnd = require("../controllers/timeUnd");
const GuildConfig = require("../settings/models/guildConfig");
const { Client, Message, Collection } = require('discord.js');
const coolDown = new Set();

module.exports = {
    name: "messageCreate",
    type: "on",
    /**
     * @param {Client} botxi 
     * @param {Message} message 
     * @returns Parametros xd
     */
    run: async (botxi, message, BOT) => {
        let guildConfig = await GuildConfig.findOne({ID: message.guildId});
        // console.log(guildConfig);
        let prefixes = ['daxo ', 'Daxo ']; //Array of prefixes
        if (guildConfig) prefixes.push(guildConfig.prefix);
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

        const cmd = botxi.commands.get(command) || botxi.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
        if(!cmd) return console.log(command);
        if(!cmd.status) return message.reply(`Sorry, el comando **${cmd.name}** no está activo :c`).then((m)=>{
            console.warn(BOT.console.warn + "El comando " + chalk.yellow(cmd.name)+ " no está activo!");
            botxi.emit("errorLog", "El comando " + cmd.name + " no está activo", BOT, 'CommandInactive');
        }); // si estatus es true mandar mensaje que el comando esta desactivado

        if (cmd.cooldown > 0){
            const tiempo = timeUnd.timeOUT(cmd.cooldown);
            if (coolDown.has(message.author.id)) return message.reply("No tan rápido camarada, utiliza el comando después de " + tiempo.msg + tiempo.und);
            coolDown.add(message.author.id); //Si no tiene cooldown se establecerá.
        
            cmd.run(botxi, message, args, BOT)

            setTimeout(() => {
                coolDown.delete(message.author.id); 
            }, tiempo.time); //Quita al usuario del enfriamiento después del tiempo establecido.
        } else {
            cmd.run(botxi, message, args, BOT)
        }
        if(cmd.btn) cmd.btn.map(b => {botxi.buttons.set(b.id, b)});
    }
}