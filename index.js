// Gets the config file
const { BOT } = require("./settings/config");

/**
 * For use it like a https server discomment next line and config it through the .pem files
 */
// const https = require('https');
const http = require('http');
// Use file sistem
const fs = require('fs');
// Usen express server
const app = require("./server/express");

// Call to DaxoBot
require('./DaxoBot');

// Gets the mongoDB file for config conection to DB
require("./server/mongoDB");

/*const options = {
  key: fs.readFileSync(BOT.WEB+'-key.pem'),
  cert: fs.readFileSync(BOT.WEB+'.pem')
};*/

http.Server(app).listen(80, () => {
  console.log(BOT.console.info+'Server in port' , 80)
})

/*https.createServer(options, app).listen(app.get('port'), () => {
    console.log(BOT.console.info+'Server SSL in port' , app.get('port'))
});*/