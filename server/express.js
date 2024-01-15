// import fetchApi from 'node-fetch';
// const axios = require('axios');

const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');

const passport = require('../settings/passport');
const { BOT } = require("../settings/config");
const botxi = require('../DiscordBot');
const app = express();

app.set('port', BOT.PORT || 5050)
//Engine
    .set('views', path.join(__dirname, '../view'))
    .set('view engine', '.hbs')
    .engine('.hbs', engine({
        extname: ".hbs",
        defaultLayout: "main"
    }));

//Middlewares
app.use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(session({
        secret: "loginYoKo",
        resave: false,
        saveUninitialized: false
    }))
    .use(passport.initialize())
    .use(passport.session());


//Static files
app.use(express.static("public"))
    .use((req, res, next) => {
        req.botxi = botxi;
        next();
    });

//Routers
app.use("/", require("../routes/routes"))

module.exports = app;