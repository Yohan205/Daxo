require('dotenv').config(); //Use env variables

module.exports = {
    BOT:{
        PORT: 80,
        TOKEN: process.env.TOKEN,
        TOKEN_ZEEW: process.env.TOKEN_ZEEW,
        TOKEN_YT: process.env.TOKEN_YT,
        secretBot: process.env.SECRET_BOTXI,
        passDB: process.env.PASS_DB,
        uriDB: `mysql://uhm9clvwkq3t6ovc:${process.env.PASS_DB}@bkxad7etyo8ohsqcoaen-mysql.services.clever-cloud.com:3306/bkxad7etyo8ohsqcoaen`,
        userDB: "uhm9clvwkq3t6ovc",
        hostDB: "bkxad7etyo8ohsqcoaen-mysql.services.clever-cloud.com",
        nameDB: "bkxad7etyo8ohsqcoaen",
        calbURL: `http://${process.env.WEB}/loginDiscord`,
        botID: "668118265779716106",
        ownerID: "591833087139119104",
        scopes: ["identify", "guilds", "email"]
    }
}