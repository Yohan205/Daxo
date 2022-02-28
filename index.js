const { BOT } = require("./settings/config.js");
const app = require("./server/express");
const conectDB = require('./settings/conectMySQL');
const cn = conectDB();

const mongoose = require('mongoose');

require('./DaxoBot');

app.listen(app.get('port'), () => {
    console.log(BOT.console.info+'Server in port' , app.get('port'))
});

let URI = `mongodb+srv://Daxo:`+BOT.passMongo+`@cluster0.kl1zz.mongodb.net/DaxoDB?retryWrites=true&w=majority`;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Conectado a mongoDB")
})