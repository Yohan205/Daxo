const { BOT } = require("./settings/config");
const https = require('https');
const http = require('http');
const fs = require('fs');
const app = require("./server/express");

require("./server/mongoDB");
require('./DaxoBot');

const options = {
  key: fs.readFileSync(BOT.WEB+'-key.pem'),
  cert: fs.readFileSync(BOT.WEB+'.pem')
};

http.Server(app).listen(80, () => {
  console.log(BOT.console.info+'Server in port' , 80)
})

https.createServer(options, app).listen(app.get('port'), () => {
    console.log(BOT.console.info+'Server SSL in port' , app.get('port'))
});