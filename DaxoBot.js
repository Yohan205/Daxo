const { Client, Collection } = require("discord.js"); // Extract the required classes from the discord.js module
const fs = require('fs');
const path = require('path');
const botxi = new Client({intents: 32719}); // Create an instance of a Discord client [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.GUILD_VOICE_STATES (no funciona)]
const zeew = require("zeew");

const { BOT } = require("./settings/config.js");
const actions = require("./functions/actions");
botxi.commands = new Collection();
botxi.configs = new Collection();
botxi.configs.set("actions", actions);
// const cldwn = require("./settings/functions");
botxi.configs.set("Zeew", zeew);


const prefixes = ['d!', 'daxo ', 'Daxo ', 'D!']; //Array of prefixes
let prefix = ""; // Save prefix used


botxi.on("ready", () => { //On bot is ready
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
});

botxi.on('messageCreate', (message) => {
    // Este bucle verifica si el prefix esta en la lista de prefixes
    for (const thisPrefix of prefixes) {if (message.content.startsWith(thisPrefix)) prefix = thisPrefix;}
    if (!prefix) return; // si el prefix no esta en la lista, no lo lee el bot
    if (message.author.bot) return; // si el autor del mensaje es un bot no lo lee
    // agrega a una lista los argumentos y toma en otra variable el comando
    let [command, ...args] = message.content.slice(prefix.length).trim().split(/\s+/);
    // const command = args.shift().toLowerCase();
    botxi.configs.set("prefix", prefix);
    // botxi.configs.set("BOT", BOT)

    const cmd = botxi.commands.get(command) || botxi.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
    if(!cmd) return;
    if(!cmd.status) return message.reply(`El comando **${cmd.name}** no está activo`); // si estatus es true mandar mensaje que el comando esta desactivado
    
    cmd.run(botxi, message, args, BOT)
})

const commands = fs.readdirSync(path.join(__dirname, "commands/cmd"));
for (const folders of commands){
    const folder = fs.readdirSync(path.join(__dirname, "commands/cmd", folders));
    for (const file of folder){
        const cmd = require(path.join(__dirname, "commands/cmd", folders, file));
        botxi.commands.set(cmd.name, cmd)
    }
}

botxi.once("error", e => console.error(e));
botxi.once("warn", e => console.warn(e));
botxi.once("debug", (e) => console.info(e));
botxi.login(BOT.TOKEN); //Login to Discord Client

module.exports = botxi