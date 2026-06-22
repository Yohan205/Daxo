import mongoose from "mongoose";
import findOrCreate from "mongoose-findorcreate";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  googleId: { type: String, default: "" },
  discordId: { type: String, default: "" },
  user: { type: String },
  photo: { type: String },
  email: { type: String },
});

// Plugins
UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

// Exportación por defecto del modelo
const User = mongoose.model("users", UserSchema);
export default User;
