require('dotenv').config(); //Use env variables

module.exports = {
    BOT:{
        PORT: 80,
        TOKEN: process.env.TOKEN,
        TOKEN_ZEEW: process.env.TOKEN_ZEEW,
        secretBot: process.env.SECRET_BOTXI,
        passDB: process.env.PASS_DB,
        uriDB: process.env.URI_DB,
        userDB: "uhm9clvwkq3t6ovc",
        hostDB: "bkxad7etyo8ohsqcoaen-mysql.services.clever-cloud.com",
        nameDB: "bkxad7etyo8ohsqcoaen",
        calbURL: "http://localhost/loginDiscord",
        botID: "668118265779716106",
        ownerID: "591833087139119104",
        scopes: ["identify", "guilds", "email"]
    }
}