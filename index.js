// import fetchApi from 'node-fetch';
// const axios = require('axios');

const chalk = require('chalk');
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const gravatar = require('gravatar');

const passport = require('./settings/passport');
const authDiscord = require('./settings/authDiscord');
const conectDB = require('./settings/conectMySQL')
const { BOT } = require("./settings/config.js");
const botxi = require('./DaxoBot');
const app = express();
const cn = conectDB();

//Settings
app.set('port', BOT.PORT || 5040);

//Engine
app.set('views', path.join(__dirname, '/view'))
app.set('view engine', '.hbs')
app.engine('.hbs', engine({
    extname: ".hbs",
    defaultLayout: "main"
}))

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: "loginDiscord",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


//Static files
app.use(express.static("public"));
app.use((req, res, next) => {
    req.botxi = botxi;
    next();
});

//Routes
// app.use("/", require("./routes/routes"));

app.get('/', (req, res) => {
    res.render('home', {
        title: "Inicio",
        descPag: "En HiDaxo tenemos una gran variedad de contenido, todo depende de ti lo que quieras encontrar.",
        keywordsPag: "HiDaxo, Daxo, TheBroland, The Broland"
    })
});

app.get('/test', (req, res) => {
    var email_yohan = "cyohanalejandro@gmail.com";

    var photo_gravatar = gravatar.url(email_yohan, {s: '80', d: '404'})

    res.render('test', {
        title: "PRUEBAS",
        descPag: "Página de pruebas",
        keywordsPag: "test",
        foto_perfil: photo_gravatar
    })
});

app.get('/loginDiscord', passport.authenticate("discord", { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dash')
});
app.use("/", require("./dash.routes"));

app.post('/apiGD', (req, res) => {
    // let id = req.params.id;
    console.log(req.body);
    const { userGD } = req.body;
    if (userGD === "") return res.redirect('/');
    
    /* res.json({
        userGD,
    }); */
    res.render('geometry_dash', {
        title: "Geometry Dash Api",
        descPag: "API de GeometryDash",
        keywordsPag: "",
        userGD,
    });
});

app.get('/login', (req, res) => {
    res.render('login', {
        title: "Iniciar sesión",
        descPag: "Inicia sesión con tu cuenta de Discord",
        keywordsPag: ""
    })
});

app.get('/TheBroland', (req, res) => {
    res.render('TheBroland', {
        title: "The Broland",
        descPag: "Mira más informacion sobre The Broland",
        keywordsPag: "The Broland, TheBroland, Brolandia, Server, Servidor"
    })
});

app.get('/TheBroland/images', (req, res) => {
    res.render('gallery_images', {
        title: "Galería de imágenes",
        descPag: "Fotos de The Broland",
        keywordsPag: ""
    })
});

app.get('/music', (req, res) => {
    res.render('music', {
        title: "Música",
        descPag: "Escucha algunas canciones",
        keywordsPag: ""
    })
});

app.get('/otros/comandos-de-voz-google', (req, res) => {
    res.render('CmdsGoogle', {
        title: "Comandos de voz para el asistente de google",
        descPag: "Aquí podrás ver los comandos de voz más comunes para que uses al asistente de google",
        keywordsPag: "comandos de voz, google assistant, asistente de google, google, hablar con google"
    })
});

app.get('/dash', authDiscord, (req, res) => {

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

app.get('/dashjs', authDiscord, (req, res) => {
    res.json({
        user: req.user,
        email: req.user.email
    });
    console.log(req.user);
});

app.get('/dash/:id', authDiscord, (req, res) => {

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

app.get('/dashjs/:id', authDiscord, (req, res) => {
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
    });
});

app.get('/dash/:id/commands', authDiscord, (req, res) => {

    let id = req.params.id;
    let servers = req.botxi.guilds.cache.get(id);
    let canales = servers.channels.cache.filter(c => c.type === "GUILD_TEXT").map(ch => ({ name: ch.name, id: ch.id }));
    let emoji = JSON.stringify(servers.emojis.cache);

    //cn.query('SELECT * FROM daxoMjs', (err, result) => {
    res.render('D-customCMD', {
        title: "Custom Commands " + servers.name,
        descPag: "Otros comandos",
        keywordsPag: "", 
        user: req.user,
        servers,
        canales,
        //msg: result,
        emojis: JSON.parse(emoji)
    });
    //})
});

app.post('/dash/:id/send-cmd', (req, res) => {
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

app.get('/dash/:id/emojis', authDiscord, (req, res) => {

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

app.get('/dash/:id/canales', authDiscord, (req, res) => {

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

require('./DaxoBot');

app.listen(app.get('port'), () => {
    console.log(BOT.console.info+'Server in port' , app.get('port'))
})