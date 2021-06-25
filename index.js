require('dotenv').config(); //Use env variables
const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const app = express();
const auth = require('./settings/middlewares');
const session = require('express-session');
const passport = require('./settings/passport');
const bodyParser = require('body-parser');
const dbConnection = require('./settings/dbConnection')
const botxi = require('./DaxoBot');

//const cn = dbConnection();

//Settings
app.set('port', process.env.PORT || 5040);

//Engine
app.set('views', path.join(__dirname, '/view'))
app.set('view engine', '.hbs')
app.engine('.hbs', hbs({
    extname: ".hbs",
    defaultLayout: "main"
}))

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: "loginDiscord",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())


//Static files
app.use(express.static("public"))
app.use((req, res, next) => {
    req.botxi = botxi;
    next();
})

//Routers
app.get('/', (req, res) => {
    res.render('home', {
        title: "Inicio",
        descPag: "Página de inicio"
    })
})

app.get('/login', passport.authenticate("discord", { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dash')
})

app.get('/dash', auth, (req, res) => {

    let servidoresU = [];
    let gild = req.user.guilds.filter(p => p.permissions === 8240);

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

    res.render("dash", {
        title: "Dashboard",
        descPag: "Dashboard de tus servidores",
        user: req.user,
        email: req.user.email,
        servidoresU
    });
});

app.get('/dashjs', auth, (req, res) => {
    res.json({
        user: req.user,
        email: req.user.email
    })
    console.log(req.user)
})

app.get('/dash/:id', auth, (req, res) => {

    let id = req.params.id;
    let servers = req.botxi.guilds.cache.get(id);

    res.render('panel', {
        title: "Dashboard " + servers.name,
        descPag: "Dashboard de tu servidor",
        user: req.user,
        servers
    });
});

app.get('/dashjs/:id', auth, (req, res) => {
    let id = req.params.id;
    let servers = req.botxi.guilds.cache.get(id);
    let canales = servers.channels.cache.filter(c => c.type === "text" || c.type === "category").map(ch => ({ type: ch.type, name: ch.name, id: ch.id, rawpstn: ch.rawPosition }));
    let emoji = JSON.stringify(servers.emojis.cache);

    res.json({
        user: req.user,
        servers,
        canales,
        emoji: JSON.parse(emoji),
        roles: servers.roles.cache,
        personas: servers.members
    })
})

app.get('/dash/:id/commands', auth, (req, res) => {

    let id = req.params.id;
    let servers = req.botxi.guilds.cache.get(id);
    let canales = servers.channels.cache.filter(c => c.type === "text").map(ch => ({ name: ch.name, id: ch.id }));
    let emoji = JSON.stringify(servers.emojis.cache);

    //cn.query('SELECT * FROM daxoMjs', (err, result) => {
    res.render('customCMD', {
        title: "Custom Commands " + servers.name,
        descPag: "Otros comandos",
        user: req.user,
        servers,
        canales,
        //msg: result,
        emojis: JSON.parse(emoji)
    });
    //})
});

app.post('/dash/:id/formulario', (req, res) => {
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
})

app.get('/dash/:id/emojis', auth, (req, res) => {

    let id = req.params.id;
    let servers = req.botxi.guilds.cache.get(id);
    let emoji = JSON.stringify(servers.emojis.cache);

    res.render('emojis', {
        title: "Lista de emojis | " + servers.name,
        descPag: "Lista de emojis del servidor de Discord",
        user: req.user,
        servers,
        emojis: JSON.parse(emoji)
    });
});

app.get('/dash/:id/canales', auth, (req, res) => {

    let id = req.params.id;
    let servers = req.botxi.guilds.cache.get(id);
    let canalesTxt = servers.channels.cache.filter(c => c.type === "text").map(ch => ({ name: ch.name, id: ch.id, position: ch.rawPosition }));
    let canalesCty = servers.channels.cache.filter(c => c.type === "category").map(ch => ({ name: ch.name, id: ch.id, position: ch.rawPosition }));

    res.render('channels', {
        title: "lista de canales | " + servers.name,
        descPag: "lista de canales del servidor de Discord",
        user: req.user,
        servers,
        canalesTxt,
        canalesCty
    });
});

require('./DaxoBot')

app.listen(app.get('port'), () => {
    console.log('Server in port', app.get('port'))
})