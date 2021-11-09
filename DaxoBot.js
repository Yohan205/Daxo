const { Client, Intents, Collection, MessageEmbed } = require("discord.js"); // Extract the required classes from the discord.js module
const fs = require('fs');
const path = require('path');
const botxi = new Client({intents: 32719}); // Create an instance of a Discord client [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.GUILD_VOICE_STATES (no funciona)]
const mEMBED = new MessageEmbed();
const zeew = require("zeew");

const { BOT } = require("./settings/config.js");
botxi.commands = new Collection();
botxi.configs = new Collection();
// const cldwn = require("./settings/functions");
botxi.configs.set("Zeew", zeew)
botxi.configs.set("EMBED", mEMBED)
const prefixes = ['d!', 'daxo ', 'Daxo ', 'D!']; //Array of prefixes
let prefix = ""; // Save prefix used

botxi.once("ready", () => { //On bot is ready
    botxi.user.setPresence({
        status: "online",
        activities: [{
            name: "Daxo help",
            type: "PLAYING"
        }]
    });
    console.log(
        `Estoy listo! ${botxi.user.username} conectado en ${botxi.guilds.cache.size} servidores y  ${botxi.users.cache.size} usuarios.`
    );
});

botxi.on('messageCreate', (message) => {
    // Este bucle verifica si el prefix es el del bot
    for (const thisPrefix of prefixes) {if (message.content.startsWith(thisPrefix)) prefix = thisPrefix;}
    if (!prefix) return;
    if (message.author.bot) return;
    // agrega a una lista los argumentos y toma en otra variable el comando
    let [command, ...args] = message.content.slice(prefix.length).trim().split(/\s+/);
    // const command = args.shift().toLowerCase();
    botxi.configs.set("prefix", prefix)
    // botxi.configs.set("BOT", BOT)

    const cmd = botxi.commands.get(command)
    if(!cmd) return;
    
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