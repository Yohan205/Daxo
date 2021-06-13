require('dotenv').config(); //Use env variables
const botxi = require('./DaxoBot')
const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const app = express();
const auth = require('./middlewares')
const session = require('express-session');
const passport = require('./passport');

//Settings
app.set('port', process.env.PORT || 3000);

//Engine
app.set('views', path.join(__dirname, '/view'))
app.set('view engine', '.hbs')
app.engine('.hbs', hbs({
    extname: ".hbs",
    defaultLayout: "main"
}))

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
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
    //res.send('Hello Word')
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
    let gild = req.user.guilds.filter(p => (p.permissions & 8) === 8);

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
        descPag: "Dashboard_de_Daxo",
        user: req.user,
        servidoresU
    });
});

app.get('/dash/:id', auth, (req, res) => {

    let id = req.params.id;
    let servers = req.botxi.guilds.cache.get(id);
    let canales = servers.channels.cache;

    res.json({
        servers,
        canales,
        roles: servers.roles.cache,
        personas: servers.members
    })

    //res.render('panel', {
    //    title: "Dashboard",
    //    descPag: "Dashboard_de_Daxo",
    //    user: req.user,
    //    servers,
    //    canales
    //});
});

app.get('/dashjs', auth, (req, res) => {
    res.json({
        user: req.user,
        bot: req.botxi
    })
})

require('./DaxoBot')

app.listen(app.get('port'), () => {
    console.log('Server in port', app.get('port'))
})