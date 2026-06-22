import { getLocalIPs } from "fulnode.js";
import fs from "fs";
import https from "https";
import http from "http";

import BOT from "./settings/config.js";
// const fs = require("fs"); // Use file sistem
// Gets the config file
// const { BOT } = require("./settings/config");
// const { getLocalIP } = require("./controllers/utilities");

/**
 * For use it like a https server discomment next line and config it through the .pem files
 */
// const https = require("https");
// const http = require("http");

// Use express server
import app from "./server/express.js";
import serverToSocket from "./controllers/socket.js";
// const app = require("./server/express");
// const serverToSocket = require("./controllers/socket");

// Call to DiscordBot
require("./DiscordBot");

// Gets the mongoDB file for config conection to DB
require("./server/mongoDB");

const httpServer = new http.Server(app);

serverToSocket(httpServer);

httpServer.listen(app.get("port"), () => {
  console.log(BOT.console.info + "Server in port", app.get("port"));
  console.info(BOT.console.info + `IP address is ${getLocalIPs().join(", ")}`);
});

if (fs.existsSync(BOT.keyPathFile) && fs.existsSync(BOT.crtPathFile)) {
  const options = {
    key: fs.readFileSync(BOT.keyPathFile),
    cert: fs.readFileSync(BOT.crtPathFile),
  };

  const httpsServer = https.createServer(options, app);
  serverToSocket(httpsServer);
  httpsServer.listen(app.get("portSSL"), () => {
    console.log(BOT.console.info + "Server SSL in port", app.get("portSSL"));
  });

  httpsServer.on("error", (err) => {
    console.error("Failed to start HTTPS server:", err);
    process.exit(1);
  });
}
