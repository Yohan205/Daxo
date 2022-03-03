const { Router } = require('express');
const authDiscord = require('../settings/authDiscord');
const GuildConfig = require("../settings/models/guildConfig");

const router = Router();

router.get('/dash', authDiscord, (req, res) => {

    let servidoresU = [];
    let gild = req.user.guilds.filter(p => (p.permissions & 8240) == 8240); // property guilds doesn't it 

    for (const key in gild) {
        if (req.botxi.guilds.cache.get(gild[key].id)) {
            servidoresU.push({
                esta: true,
                id: req.botxi.guilds.cache.get(gild[key].id).id,
                name: req.botxi.guilds.cache.get(gild[key].id).name,
                icon: req.botxi.guilds.cache.get(gild[key].id).icon,
                acronym: req.botxi.guilds.cache.get(gild[key].id).nameAcronym
            })
        } else {
            servidoresU.push({
                esta: false,
                id: gild[key].id,
                name: gild[key].name,
                icon: gild[key].icon
            })
        }
    }

    res.render("D-dash", {
        title: "Dashboard",
        descPag: "Dashboard de tus servidores",
        keywordsPag: "Discord, Dashboard, Bot, Daxo",
        user: req.user,
        email: req.user.email,
        servidoresU
    });
});

router.get('/dashjs', authDiscord, (req, res) => {
    res.json({
        user: req.user,
        email: req.user.email
    })
    // console.log(req.user)
});

router.get('/dash/:id', authDiscord, (req, res) => {

    let id = req.params.id;
    let servers = req.botxi.guilds.cache.get(id);

    res.render('D-panel', {
        title: "Dashboard " + servers.name,
        descPag: "Dashboard de tu servidor",
        keywordsPag: "Dashboard, Discord, Bot, Daxo",
        user: req.user,
        servers
    });
});

router.get('/dashjs/:id', authDiscord, (req, res) => {
    let id = req.params.id;
    let servers = req.botxi.guilds.cache.get(id);
    let canales = servers.channels.cache.filter(c => c.type === "GUILD_TEXT" || c.type === "GUILD_VOICE" || c.type === "GUILD_CATEGORY" || c.type === "GUILD_PUBLIC_THREAD").map(ch => ({ type: ch.type, name: ch.name, id: ch.id, rawpstn: ch.rawPosition }));
    let emoji = JSON.stringify(servers.emoji.cache);

    res.json({
        user: req.user,
        servers,
        canales,
        emoji: JSON.parse(emoji),
        roles: servers.roles.cache,
        personas: servers.members
    })
});

router.get('/dash/:id/commands', authDiscord, async (req, res) => {
    let guildId = req.params.id,
        gConfig = await GuildConfig.findOne({ID: guildId}),
        guildConfig = new Object();
    if (gConfig) {
        guildConfig = {
            hasRol: true,
            prefix: gConfig.prefix ? gConfig.prefix : "",
            adminRol: gConfig.adminRol ? gConfig.adminRol : ""
        }
    }
    let servers = req.botxi.guilds.cache.get(guildId),
        roles = servers.roles.cache.filter(r => r.name !== "@everyone" && r.tags == null).map(rol => ({ name: rol.name, id: rol.id })),
        canales = servers.channels.cache.filter(c => c.type === "GUILD_TEXT").map(ch => ({ name: ch.name, id: ch.id })),
        emoji = JSON.stringify(servers.emojis.cache);

    if (guildConfig.adminRol === "@everyone") guildConfig.hasRol = false;

    //cn.query('SELECT * FROM daxoMjs', (err, result) => {
    res.render('D-customCMD', {
        title: "Custom Commands " + servers.name,
        descPag: "Otros comandos",
        keywordsPag: "", 
        user: req.user,
        servers,
        canales,
        roles,
        guild: gConfig ? guildConfig : false,
        emojis: JSON.parse(emoji)
    });
    //})
});

// Guarda el rol Admin del servidor
router.post('/dash/:id/saveRol', async (req, res) => {
    let ID = req.params.id;
    const { adminRol } = req.body;
    let guildConfig = await GuildConfig.findOne({ID}); // Encuentra la configuración de un servidor por ID

    if (!guildConfig) { // Si no existe en la base de datos, lo crea
        let newGuildConfig = new GuildConfig({
            ID,
            adminRol
        });
    
        newGuildConfig.save((err, data)=>{
            console.error(err)
        });
    } else {
        await GuildConfig.updateOne({ ID }, { adminRol });
    }
    
    res.redirect('/dash/' + ID + '/commands');
});

// Guarda el prefix del servidor
router.post('/dash/:id/set-prefix', async (req, res) => {
    let ID = req.params.id;
    const { setPrefix } = req.body;
    let guildConfig = await GuildConfig.findOne({ID}); // Encuentra la configuración de un servidor por ID

    if (!guildConfig) { // Si no existe en la base de datos, lo crea
        let newGuildConfig = new GuildConfig({
            ID,
            prefix: setPrefix
        });
    
        newGuildConfig.save((err, data)=>{
            console.error(err)
        });
    } else {
        await GuildConfig.updateOne({ ID }, { prefix: setPrefix });
    }
    
    res.redirect('/dash/' + ID);
});

router.post('/dash/:id/send-cmd', (req, res) => {
    let id = req.params.id;
    let servers = req.botxi.guilds.cache.get(id);
    const { msgText, canalID } = req.body;
    if (canalID === "none") return res.redirect('/dash/' + id + '/commands');
    let canal = servers.channels.cache.get(canalID);
    canal.send(msgText);
    // cn.query('INSERT INTO daxoMjs SET?', {
    //     contenido: msgText
    // }, (err, result) => {})
    res.redirect('/dash/' + id)
});

router.get('/dash/:id/emojis', authDiscord, (req, res) => {

    let id = req.params.id;
    let servers = req.botxi.guilds.cache.get(id);
    let emoji = JSON.stringify(servers.emojis.cache);

    res.render('D-emojis', {
        title: "Lista de emojis | " + servers.name,
        descPag: "Lista de emojis del servidor de Discord",
        keywordsPag: "",
        user: req.user,
        servers,
        emojis: JSON.parse(emoji)
    });
});

router.get('/dash/:id/canales', authDiscord, (req, res) => {

    let id = req.params.id;
    let servers = req.botxi.guilds.cache.get(id);
    let canalesTxt = servers.channels.cache.filter(c => c.type === "GUILD_TEXT").map(ch => ({ name: ch.name, id: ch.id, position: ch.rawPosition }));
    let canalesCty = servers.channels.cache.filter(c => c.type === "GUILD_CATEGORY").map(ch => ({ name: ch.name, id: ch.id, position: ch.rawPosition }));

    res.render('D-channels', {
        title: "lista de canales | " + servers.name,
        descPag: "lista de canales del servidor de Discord",
        keywordsPag: "",
        user: req.user,
        servers,
        canalesTxt,
        canalesCty
    });
});

module.exports = router;