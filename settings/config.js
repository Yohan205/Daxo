require("dotenv").config(); //Use env variables
// const chalk = require(chalk

module.exports = {
  BOT: {
    PORT: 443,
    WEB: process.env.WEB,
    TOKEN: process.env.TOKEN,
    TOKEN_ZEEW: process.env.TOKEN_ZEEW,
    TOKEN_CHATBOT: process.env.TOKEN_ESPCHATBOT,
    TOKEN_GENIUS: process.env.TOKEN_GENIUS_LYRICS,
    OPENAI_KEY: process.env.OPENAI_API_KEY,
    secretBot: process.env.SECRET_BOTXI,
    passSQL: process.env.PASS_SQL,
    passMongo: process.env.PASS_MONGO,
    uriDB: `mysql://uhm9clvwkq3t6ovc:${process.env.PASS_SQL}@bkxad7etyo8ohsqcoaen-mysql.services.clever-cloud.com:3306/bkxad7etyo8ohsqcoaen`,
    userDB: "uhm9clvwkq3t6ovc",
    hostDB: "bkxad7etyo8ohsqcoaen-mysql.services.clever-cloud.com",
    nameDB: "bkxad7etyo8ohsqcoaen",
    callbackURL: `http://${process.env.WEB}/loginDiscord`,
    botID: "668118265779716106",
    ownerID: "591833087139119104",
    serverID: '654830450920914955', // Server TheBroland
    // serverID: "855869897539584061", // Server Test
    scopes: ["identify", "guilds", "email"],
    console: {
      info: `[Daxo] `,
      alert: `[Daxo] `,
      warn: `[Daxo] `,
      db: "[Database] ",
    }
  }
};
