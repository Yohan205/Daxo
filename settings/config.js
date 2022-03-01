require('dotenv').config(); //Use env variables
const chalk = require('chalk');

module.exports = {
    BOT:{
        PORT: 80,
        TOKEN: process.env.TOKEN,
        TOKEN_ZEEW: process.env.TOKEN_ZEEW,
        TOKEN_CHATBOT: process.env.TOKEN_ESPCHATBOT,
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
        scopes: ["identify", "guilds", "email"],
        console: {
            info: chalk.green.bold(`[Daxo] `),
            alert: chalk.red.bold(`[Daxo] `),
            warn: chalk.yellow(`[Daxo] `),
            db: chalk.bold.green('[Database] ')
        }
    }
}