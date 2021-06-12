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
    res.json({
        user: req.user,
        bot: req.botxi
    })
})

app.get('/dash/:id', auth, (req, res) => {

    let id = req.params.id;
    let servidor = req.botxi.guilds.cache.get(id);
    let canales = servidor.channels.cache;

    res.render('dash', {
        title: "Dashboard",
        descPag: "Dashboard_de_Daxo",
        user: req.user,
        servidor,
        canales
    })
})

require('./DaxoBot')

app.listen(app.get('port'), () => {
    console.log('Server in port', app.get('port'))
})