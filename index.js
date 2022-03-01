const { BOT } = require("./settings/config");
const app = require("./server/express");

require("./server/mongoDB");
require('./DaxoBot');

app.listen(app.get('port'), () => {
    console.log(BOT.console.info+'Server in port' , app.get('port'))
});