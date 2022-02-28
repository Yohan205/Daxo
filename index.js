const { BOT } = require("./settings/config.js");
const app = require("./server/express");
const conectDB = require('./settings/conectMySQL');
const cn = conectDB();

require('./DaxoBot');

app.listen(app.get('port'), () => {
    console.log(BOT.console.info+'Server in port' , app.get('port'))
});