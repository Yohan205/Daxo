//ts-nocheck
import passport from "passport";
import { Strategy } from "passport-discord";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import findOrCreate from "mongoose-findorcreate";

import User from "../settings/models/Users.js";
import CONFIG from "./config.js";

const { use, serializeUser, deserializeUser } = passport;
const { createStrategy, findOne, create } = User;
const { GOOGLE, DISCORD } = CONFIG;

use(createStrategy());

serializeUser((user, done) => {
  done(null, user);
});

deserializeUser((obj, done) => {
  done(null, obj);
});

// GoogleStrategy
use(
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

        const user = await findOne({
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

        const newUser = await create({
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
use(
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

        const user = await findOne({
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

        const newUser = await create({
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

export default passport;
