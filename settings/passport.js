const passport = require("passport");
const { Strategy } = require('passport-discord');
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const findOrCreate = require('mongoose-findorcreate');

const Users = require("../settings/models/Users");
const BOT = require("./config.js");

passport.use(Users.createStrategy());

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((obj, done) => {
    done(null, obj)
});

passport.use(new GoogleStrategy({
    clientID:     BOT.GOOGLE.ClientID,
    clientSecret: BOT.GOOGLE.Secret,
    callbackURL: BOT.GOOGLE.CallbackURL,
    //passReqToCallback   : true
  },
  function(accessToken, refreshToken, profile, done) {
    var data = profile._json;
    //@ts-ignore
    data.provider = (profile.provider); data.accessToken = accessToken;
    //console.log(accessToken);
    //console.log(data);
    //@ts-ignore
    Users.findOrCreate({ googleId: profile.id }, {user: profile.displayName, photo: data.picture, email: data.email}, (err, user) => {
        //console.log(user);
      return done(err, data);
    });
  }
));

///// PASSPORT - DISCORD //////////////////////////////////
passport.use(new Strategy({
    clientID: BOT.DISCORD.botID,
    clientSecret: BOT.DISCORD.secretBot,
    callbackURL: BOT.DISCORD.CallbackURL,
    scope: BOT.DISCORD.scopes
}, (accesstoken, refreshtoken, profile, cb) => {
  console.log(profile.email);
  //@ts-ignore
  Users.findOrCreate({ email: profile.email }, {photo: profile.avatar}, (err, user) => {
      //console.log(user);
    return cb(err, profile);
  });
  /*
    process.nextTick(() => {
        return cb(null, profile)
    })*/
}))
///// PASSPORT - DISCORD //////////////////////////////////

module.exports = passport