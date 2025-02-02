require("dotenv").config(); //Use env variables
// const chalk = require(chalk
const { Client, GatewayIntentBits } = require("discord.js");
// Google Callback URL
const GCbUrl = (process.env.WEB == 'hidaxo.xyz') ? `https://${process.env.WEB}` : `http://${process.env.WEB}`;

module.exports = {
  DISCORD: {
    secretBot: process.env.SECRET_BOT_DISCORD,
    TOKEN: process.env.TOKEN_DISCORD,
    intents: [
      GatewayIntentBits.Guilds, 
      GatewayIntentBits.GuildInvites, 
      GatewayIntentBits.GuildMessages, 
      GatewayIntentBits.GuildMessageTyping, 
      GatewayIntentBits.DirectMessages, 
      GatewayIntentBits.MessageContent, 
      GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMembers, 
      GatewayIntentBits.GuildVoiceStates
    ],
    CallbackURL: `http://${process.env.WEB}/auth/discord`,
    botID: "668118265779716106",
    ownerID: "591833087139119104",
    scopes: ["identify", "guilds", "email"]
  },
  GOOGLE: {
    ClientID: process.env.GOOGLE_CLIENT_ID,
    Secret: process.env.GOOGLE_SECRET,
    CallbackURL: `${GCbUrl}/auth/google/callback`,
    Scopes: [ 'email', 'profile', 'https://www.googleapis.com/auth/tasks.readonly', 'https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/youtube.readonly', 'https://www.googleapis.com/auth/youtube.force-ssl' ],
  },
  BOT: {
    TOKEN: {
      DISCORD: process.env.TOKEN_DISCORD,
      ESPCHATBOT: process.env.TOKEN_ESPCHATBOT,
      GENIUS: process.env.TOKEN_GENIUS_LYRICS,
      ZEEW: process.env.TOKEN_ZEEW,
      OPENAI_KEY: process.env.OPENAI_API_KEY,
      WOLFRAM_ALPHA: process.env.TOKEN_W_ALPHA,
      GAPIS: process.env.TOKEN_GSERVICES,
    },
    DB: {
      KEY_SQL: process.env.PASS_SQL,
      URI_SQL: `mysql://uhm9clvwkq3t6ovc:${process.env.PASS_SQL}@bkxad7etyo8ohsqcoaen-mysql.services.clever-cloud.com:3306/bkxad7etyo8ohsqcoaen`,
      USER_SQL: "uhm9clvwkq3t6ovc",
      HOST_SQL: "bkxad7etyo8ohsqcoaen-mysql.services.clever-cloud.com",
      NAME_SQL: "bkxad7etyo8ohsqcoaen",
      KEY_MONGO: process.env.PASS_MONGO,
    },
    PORT: 19205,
    WEB: process.env.WEB,
    keyMiPago: { 
      "usuario": process.env.USER_MIPAGO, 
      "clave": process.env.PASS_MIPAGO
    },
    // serverID: '654830450920914955', // Server TheBroland
    serverID: "855869897539584061", // Server Test
    console: {
      info: `|Daxo (i)| `,
      alert: `|Daxo (!)| `,
      warn: `|Daxo \-_-/| `,
      db: "[Daxo DB |||| ] ",
    },
  }
};
