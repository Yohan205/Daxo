require("dotenv").config(); //Use env variables
// const chalk = require(chalk
const { Client, GatewayIntentBits } = require("discord.js");

module.exports = {
  BOT: {
    TOKEN: {
      DISCORD: process.env.TOKEN_DISCORD,
      ESPCHATBOT: process.env.TOKEN_ESPCHATBOT,
      GENIUS: process.env.TOKEN_GENIUS_LYRICS,
      ZEEW: process.env.TOKEN_ZEEW,
      OPENAI_KEY: process.env.OPENAI_API_KEY,
      WOLFRAM_ALPHA: process.env.TOKEN_W_ALPHA,
    },
    DB: {
      KEY_SQL: process.env.PASS_SQL,
      URI_SQL: `mysql://uhm9clvwkq3t6ovc:${process.env.PASS_SQL}@bkxad7etyo8ohsqcoaen-mysql.services.clever-cloud.com:3306/bkxad7etyo8ohsqcoaen`,
      USER_SQL: "uhm9clvwkq3t6ovc",
      HOST_SQL: "bkxad7etyo8ohsqcoaen-mysql.services.clever-cloud.com",
      NAME_SQL: "bkxad7etyo8ohsqcoaen",
      KEY_MONGO: process.env.PASS_MONGO,
    },
    PORT: 443,
    WEB: process.env.WEB,
    keyMiPago: { 
      "usuario": process.env.USER_MIPAGO, 
      "clave": process.env.PASS_MIPAGO
    },
    secretBot: process.env.SECRET_BOTXI,
    callbackURL: `http://${process.env.WEB}/loginDiscord`,
    botID: "668118265779716106",
    ownerID: "591833087139119104",
    // serverID: '654830450920914955', // Server TheBroland
    serverID: "855869897539584061", // Server Test
    scopes: ["identify", "guilds", "email"],
    console: {
      info: `[Daxo] `,
      alert: `[Daxo] `,
      warn: `[Daxo] `,
      db: "[Database] ",
    },
    intents: [
      GatewayIntentBits.Guilds, 
      GatewayIntentBits.GuildInvites, 
      GatewayIntentBits.GuildMessages, 
      GatewayIntentBits.GuildMessageTyping, 
      GatewayIntentBits.DirectMessages, 
      GatewayIntentBits.MessageContent, 
      GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMembers, 
      GatewayIntentBits.GuildVoiceStates
    ]
  }
};
