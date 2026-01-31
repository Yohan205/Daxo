const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true }, // correo del usuario (vinculación principal)
    userID: { type: String }, // opcional, mantener si en el futuro se quiere por id
    title: { type: String, default: "" },
    content: { type: String, default: "" },
    visibility: {
      type: String,
      enum: ["private", "public"],
      default: "private",
    },
    //guildID: { type: String, default: null }, // opcional, si la nota pertenece a un servidor
  },
  { timestamps: true },
);

module.exports = mongoose.model("Note", NoteSchema);
