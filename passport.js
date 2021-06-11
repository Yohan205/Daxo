const passport = require("passport")
const { Strategy } = require('passport-discord')

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((obj, done) => {
    done(null, obj)
})

passport.use(new Strategy({
    clientID: process.env.ID_BOTXI,
    clientSecret: process.env.SECRET_BOTXI,
    callbackURL: process.env.URL_CALBAK,
    scope: ['identify', 'guilds']
}, (accesstoken, refreshtoken, profile, cb) => {
    process.nextTick(() => {
        return cb(null, profile)
    })
}))

module.exports = passport