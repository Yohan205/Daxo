// import fetchApi from 'node-fetch';
// const axios = require('axios');

import express from "express";
import path from "path";
import { engine } from "express-handlebars";
import session from "express-session";
import bodyParser from "body-parser";

import passport from "../settings/passport.js";
import BOT from "../settings/config.js";
import botxi from "../DiscordBot.js";

const app = express();

app
  .set("port", BOT.PORT || 80)
  .set("portSSL", BOT.PORTSSL || 443)
  //Engine
  .set("views", path.join(__dirname, "../view"))
  .set("view engine", ".hbs")
  .engine(
    ".hbs",
    engine({
      extname: ".hbs",
      defaultLayout: "main",
      layoutsDir: path.join(__dirname, "../view/layouts"),
    }),
  );

//Middlewares
app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(
    session({
      secret: "loginYoKo",
      resave: false,
      saveUninitialized: false,
    }),
  )
  .use(passport.initialize())
  .use(passport.session());

//Static files
app.use(express.static("public")).use((req, res, next) => {
  //@ts-ignore
  req.botxi = botxi;
  next();
});

//Routers
app.use("/", require("../routes/routes"));

export default app;
