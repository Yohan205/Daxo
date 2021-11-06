const passport = require("passport");
const { Strategy } = require('passport-discord');
const { BOT } = require("./settings/config.js");

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((obj, done) => {
    done(null, obj)
})

passport.use(new Strategy({
    clientID: botID,
    clientSecret: process.env.SECRET_BOTXI,
    callbackURL: process.env.URL_CALB,
    scope: scopes
}, (accesstoken, refreshtoken, profile, cb) => {
    process.nextTick(() => {
        return cb(null, profile)
    })
}))

module.exports = passport