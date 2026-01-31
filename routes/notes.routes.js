const { Router } = require("express");
const { checkAuth } = require("../settings/checkAuth");
const notesCtrl = require("../controllers/notes");

const router = Router();

// Listado paginado de notas del usuario
router.get("/", checkAuth, notesCtrl.listForUser);

// Crear nueva nota
router.post("/", checkAuth, notesCtrl.createNote);

// Mostrar formulario/nota para editar
router.get("/:id", checkAuth, notesCtrl.getNote);

// Actualizar nota
router.post("/:id", checkAuth, notesCtrl.updateNote);

// Eliminar nota
router.post("/:id/delete", checkAuth, notesCtrl.deleteNote);

module.exports = router;
