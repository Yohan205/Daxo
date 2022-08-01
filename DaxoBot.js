/* Requerimos del modulo fs para manipular los archivos (leer y escribir) */
const fs = require('fs');
// const chalk = require('chalk'); lo usaba para dar un toque de color a la terminal
const path = require('path');
/* Con DisTube hace que bot pueda reproducir canciones */
const { DisTube } = require('distube');

/* Extrae las clases requeridas del modulo discord.js */
const { Client, Collection, GatewayIntentBits, MessageAttachment, MessageEmbed } = require("discord.js"); 
/* Create an instance of a Discord client */
const botxi = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates] });  //new Client({intents: 32719});

const zeew = require('zeew');

/* Obtiene los datos de configuración del BOT */
const { BOT } = require("./settings/config");
/* Obtiene los comandos de acciones que puede hacer un usuario (run, greet) */
const actions = require("./controllers/actions");
/* Obtiene los models de configuración de los Guilds */
const GuildConfig = require("./settings/models/guildConfig");
/* Guarda los commandos en una colleccion de datos */
botxi.commands = new Collection();
botxi.slashCommands = new Collection();
botxi.configs = new Collection();
botxi.configs.set("actions", actions);
// const cldwn = require("./settings/controllers");
botxi.configs.set("GuildConfig", GuildConfig);
// botxi.configs.set("chalk", chalk);

/* Configuracion del modulo DisTube */
botxi.distube = new DisTube(botxi, {
    youtubeDL: false,
    leaveOnStop: true,
    emitAddSongWhenCreatingQueue: true,
    emitAddListWhenCreatingQueue: false
});

/* Usando el modulo fs busca en la carpeta los eventos, almacenando la ruta en la constante eventFiles */
const eventFiles = fs.readdirSync(path.join(__dirname, "events"));
//fs.readdirSync('./events').filter(file => file.endsWith('.js'));
/* Teniendo la ruta de la carpeta y mediante un bucle for, ejecuta cada evento/archivo dentro de ésta */
for (const file of eventFiles) {
    // Guarda la ruta del evento/archivo
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
const commands = fs.readdirSync(path.join(__dirname, "commands/text"));
for (const folders of commands){
    const folder = fs.readdirSync(path.join(__dirname, "commands/text", folders));
    for (const file of folder){ // Ejecuta cada comando
        const cmd = require(path.join(__dirname, "commands/text", folders, file));
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