// Gets the config file
const { BOT } = require("./settings/config");

/**
 * For use it like a https server discomment next line and config it through the .pem files
 */
const https = require('https');
const http = require('http');
// Use file sistem
const fs = require('fs');
// Usen express server
const app = require("./server/express");
const serverToSocket = require("./controllers/socket");

// Call to DiscordBot
require('./DiscordBot');

// Gets the mongoDB file for config conection to DB
require("./server/mongoDB");

const keyPathFile = './server/cert/'+BOT.WEB+'-key.key';
const crtPathFile = './server/cert/'+BOT.WEB+'.crt';


// @ts-ignore
const httpServer = http.Server(app);

serverToSocket(httpServer);

httpServer.listen(app.get('port'), () => {
  console.log(BOT.console.info+'Server in port' , app.get('port'))
})

if (fs.existsSync(keyPathFile) && fs.existsSync(crtPathFile)){
  const options = {
    key: fs.readFileSync(keyPathFile),
    cert: fs.readFileSync(crtPathFile)
  };

  const httpsServer = https.createServer(options, app);
  serverToSocket(httpsServer);
  httpsServer.listen(app.get('portSSL'), () => {
    console.log(BOT.console.info+'Server SSL in port' , app.get('portSSL'))
  });

  httpsServer.on('error', (err) => {
    console.error('Failed to start HTTPS server:', err);
    process.exit(1);
  });
}

