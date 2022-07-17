const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const { DisTube } = require('distube');
const { Client, Collection, MessageAttachment, MessageEmbed } = require("discord.js"); // Extract the required classes from the discord.js module
const botxi = new Client({intents: 32719}); // Create an instance of a Discord client [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.GUILD_VOICE_STATES (no funciona)]
const zeew = require("zeew");

const { BOT } = require("./settings/config");
const actions = require("./controllers/actions");
const GuildConfig = require("./settings/models/guildConfig");
botxi.commands = new Collection();
botxi.slashCommands = new Collection();
botxi.configs = new Collection();
botxi.configs.set("actions", actions);
// const cldwn = require("./settings/controllers");
botxi.configs.set("GuildConfig", GuildConfig);
// botxi.configs.set("chalk", chalk);
botxi.distube = new DisTube(botxi, {
    youtubeDL: false,
    leaveOnStop: true,
    emitAddSongWhenCreatingQueue: true,
    emitAddListWhenCreatingQueue: false
});

// Busca los eventos
const eventFiles = fs.readdirSync(path.join(__dirname, "events"));
//fs.readdirSync('./events').filter(file => file.endsWith('.js'));
// Ejecuta cada evento/archivo
for (const file of eventFiles) {
	const event = require(path.join(__dirname, "events", file));
    //require(`./events/${file}`);
    // Ejecuta cada evento segun su tipo:
    switch (event.type) {
        case "once": // Se ejecuta una vez
            botxi.once(event.name, (...arg) => event.run(botxi, ...arg, BOT));
            break;
    
        case "on": // Mientras está encendido
            botxi.on(event.name, (...arg) => event.run(botxi, ...arg, BOT));
            break;
        case "distube.on":
            botxi.distube.on(event.name, (q, s) => event.run(q, s));
            break;

        default:
            break;
    }
}

// Pasa por cada carpeta dentro de cmd
const commands = fs.readdirSync(path.join(__dirname, "commands/cmd"));
for (const folders of commands){
    const folder = fs.readdirSync(path.join(__dirname, "commands/cmd", folders));
    for (const file of folder){ // Ejecuta cada comando
        const cmd = require(path.join(__dirname, "commands/cmd", folders, file));
        botxi.commands.set(cmd.name, cmd)
    }
}

// Pasa por cada caprta dentro de los comandos de barra
const slashCommands = fs.readdirSync(path.join(__dirname, "commands/slash"));
for (const folders of slashCommands){
    const folder = fs.readdirSync(path.join(__dirname, "commands/slash", folders));
    for (const file of folder){ // Lee cada comando
        const slashCmd = require(path.join(__dirname, "commands/slash", folders, file));
        botxi.slashCommands.set(slashCmd.name, slashCmd)
    }
}

botxi.distube.on("error", (eCanal, e) => botxi.emit("errorLog", e, BOT, 'ErrorDistube'))
botxi.once("error", e => {console.error(e);botxi.emit("errorLog", e, BOT, 'Error');});
botxi.once("warn", e => botxi.emit("errorLog", e, BOT, 'Warn'));
// botxi.once("debug", (e) => console.info(e));
botxi.login(BOT.TOKEN); //Login to Discord Client

module.exports = botxi