const passport = require("passport");
const { Strategy } = require('passport-discord');
const { BOT } = require("./config.js");

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((obj, done) => {
    done(null, obj)
})

passport.use(new Strategy({
    clientID: BOT.botID,
    clientSecret: BOT.secretBot,
    callbackURL: BOT.callbackURL,
    scope: BOT.scopes
}, (accesstoken, refreshtoken, profile, cb) => {
    process.nextTick(() => {
        return cb(null, profile)
    })
}))

module.exports = passport