const mongoose = require('mongoose');
const { BOT } = require("../settings/config");

//let URI = `mongodb+srv://Daxo:`+BOT.passMongo+`@cluster0.kl1zz.mongodb.net/DaxoDB?retryWrites=true&w=majority`;

let URI = `mongodb+srv://Daxo:`+BOT.passMongo+`@cluster0.kl1zz.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(BOT.console.db+"Conectado a MongoDB")
}).catch((e) => {
    console.error(e)
})

module.exports = mongoose;