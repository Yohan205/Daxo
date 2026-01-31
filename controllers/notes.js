const Note = require("../settings/models/note");
const { statusAuth } = require("../settings/checkAuth");
const { dataUser } = require("./utilities");

// Lista paginada de notas por correo del usuario
exports.listForUser = async (req, res) => {
  const email = req.user && req.user.email;
  const page = Math.max(1, parseInt(req.query.page || "1"));
  const limit = Math.max(1, Math.min(50, parseInt(req.query.limit || "10")));

  const query = { userEmail: email };
  const total = await Note.countDocuments(query);
  const pages = Math.ceil(total / limit) || 1;
  const skip = (page - 1) * limit;

  const notes = await Note.find(query)
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < pages ? page + 1 : null;

  res.render("notes-list", {
    title: "Mis notas",
    user: req.user,
    notes,
    pagination: { page, pages, limit, total, prevPage, nextPage },
    statusAuth: statusAuth(req),
    userData: statusAuth(req) ? await dataUser(req) : null,
  });
};

exports.getNote = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  if (!note) return res.status(404).send("Not found");
  if (note.userEmail !== req.user.email)
    return res.status(403).send("Forbidden");
  res.render("notes-edit", { note, user: req.user });
};

exports.createNote = async (req, res) => {
  const email = req.user && req.user.email;
  const { title, content, guildID } = req.body;
  await Note.create({
    userEmail: email,
    title: title || "",
    content: content || "",
    //guildID: guildID || null,
  });
  res.redirect("/notes");
};

exports.updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).send("Not found");
  if (note.userEmail !== req.user.email)
    return res.status(403).send("Forbidden");
  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;
  await note.save();
  res.redirect("/notes");
};

exports.deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).send("Not found");
  if (note.userEmail !== req.user.email)
    return res.status(403).send("Forbidden");
  await note.remove();
  res.redirect("/notes");
};
