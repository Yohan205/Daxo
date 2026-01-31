const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const passportLocalMongoose = require("passport-local-mongoose");

const Users = new mongoose.Schema({
  googleId: { type: String, default: "" },
  discordId: { type: String, default: "" },
  user: { type: "string" },
  photo: { type: "string" },
  email: { type: "string" },
});

// HASH & SALT
Users.plugin(passportLocalMongoose);
Users.plugin(findOrCreate);

module.exports = mongoose.model("users", Users);
