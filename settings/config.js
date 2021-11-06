require('dotenv').config(); //Use env variables

module.exports = {
    BOT:{
        PORT: 80,
        TOKEN: process.env.TOKEN,
        TOKEN_ZEEW: process.env.TOKEN_ZEEW,
        secretBot: process.env.SECRET_BOTXI,
        userDB: process.env.USER_DB,
        passDB: process.env.PASS_DB,
        uriBD: process.env.URI_DB,
        hostDB: "bkxad7etyo8ohsqcoaen-mysql.services.clever-cloud.com",
        nameDB: "bkxad7etyo8ohsqcoaen",
        calbURL: "http://localhost/login",
        botID: "668118265779716106",
        ownerID: "591833087139119104",
        scopes: ["identify", "guilds", "email"]
    }
}