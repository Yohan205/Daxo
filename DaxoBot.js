const { Client, Collection } = require("discord.js"); // Extract the required classes from the discord.js module
const fs = require('fs');
const path = require('path');
const botxi = new Client({intents: 32719}); // Create an instance of a Discord client [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.GUILD_VOICE_STATES (no funciona)]
const zeew = require("zeew");

const { BOT } = require("./settings/config.js");
const actions = require("./functions/actions");
botxi.commands = new Collection();
botxi.slashCommands = new Collection();
botxi.configs = new Collection();
botxi.configs.set("actions", actions);
// const cldwn = require("./settings/functions");
botxi.configs.set("Zeew", zeew);
// botxi.configs.set("chalk", chalk);

// Busca los eventos
const eventFiles = fs.readdirSync(path.join(__dirname, "events"));
//fs.readdirSync('./events').filter(file => file.endsWith('.js'));
// Ejecuta cada evento/archivo
for (const file of eventFiles) {
	const event = require(path.join(__dirname, "events", file));
    //require(`./events/${file}`);
    // si se ejecuta una sola vez:
	if (event.once) {
        // Con (...args) pasa los argumentos para cada evento/archivo
		botxi.once(event.name, (...arg) => event.run(botxi, ...arg, BOT)); 
	} else {
		botxi.on(event.name, (...arg) => event.run(botxi, ...arg, BOT));
	}
}

const commands = fs.readdirSync(path.join(__dirname, "commands/cmd"));
for (const folders of commands){
    const folder = fs.readdirSync(path.join(__dirname, "commands/cmd", folders));
    for (const file of folder){
        const cmd = require(path.join(__dirname, "commands/cmd", folders, file));
        botxi.commands.set(cmd.name, cmd)
    }
}

const slashCommands = fs.readdirSync(path.join(__dirname, "commands/slash"));
for (const folders of slashCommands){
    const folder = fs.readdirSync(path.join(__dirname, "commands/slash", folders));
    for (const file of folder){
        const slashCmd = require(path.join(__dirname, "commands/slash", folders, file));
        botxi.slashCommands.set(slashCmd.name, slashCmd)
    }
}

botxi.once("error", e => console.error(e));
botxi.once("warn", e => console.warn(e));
botxi.once("debug", (e) => console.info(e));
botxi.login(BOT.TOKEN); //Login to Discord Client

module.exports = botxi