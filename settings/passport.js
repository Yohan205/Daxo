//@ts-nocheck
const passport = require("passport");
const { Strategy } = require("passport-discord");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

const Users = require("../settings/models/Users");
const { DISCORD, GOOGLE } = require("./config.js");

passport.use(Users.createStrategy());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// GoogleStrategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE.ClientID,
      clientSecret: GOOGLE.Secret,
      callbackURL: GOOGLE.CallbackURL,
      //passReqToCallback   : true
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const data = profile._json || {};
        data.provider = profile.provider;
        data.accessToken = accessToken;

        const user = await Users.findOne({
          $or: [{ googleId: profile.id }, { email: data.email }],
        }).exec();

        if (user) {
          user.googleId = user.googleId || profile.id;
          user.email = user.email || data.email;
          user.user = user.user || profile.displayName;
          user.photo = user.photo || data.picture;
          const saved = await user.save();
          return done(null, saved);
        }

        const newUser = await Users.create({
          googleId: profile.id,
          email: data.email,
          user: profile.displayName,
          photo: data.picture,
        });

        return done(null, newUser);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

///// // Discord Strategy //////////////////////////////////
passport.use(
  new Strategy(
    {
      clientID: DISCORD.botID,
      clientSecret: DISCORD.secretBot,
      callbackURL: DISCORD.CallbackURL,
      scope: DISCORD.scopes,
    },
    async (accesstoken, refreshtoken, profile, cb) => {
      try {
        const email = profile.email || null;

        const user = await Users.findOne({
          $or: [{ discordId: profile.id }, { email: email }],
        }).exec();

        if (user) {
          user.discordId = user.discordId || profile.id;
          user.email = user.email || email;
          user.photo = user.photo || profile.avatar;
          user.user = user.user || profile.username || profile.displayName;
          const saved = await user.save();
          console.log("DISCORD:", {
            email: profile.email,
            discordId: profile.id,
            photo: profile.avatar,
          });
          return cb(null, saved);
        }

        const newUser = await Users.create({
          discordId: profile.id,
          email: email,
          photo: profile.avatar,
          user: profile.username || profile.displayName,
        });

        return cb(null, newUser);
      } catch (err) {
        return cb(err);
      }
    },
  ),
);
///// PASSPORT - DISCORD //////////////////////////////////

module.exports = passport;
