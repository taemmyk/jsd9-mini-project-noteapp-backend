import express from "express";
import NoteRoutes from "./routes/notes.js";
import { getNoteReport } from "./controllers/reportsController.js";
import { searchNote } from "./controllers/notesController.js";
import { createNewUser, logUserIn, logUserOut } from "./controllers/userController.js";

const router = express.Router();

export default () => {
  router.use("/notes", NoteRoutes);
  router.post("/reports", getNoteReport);
  router.post("/search", searchNote);
  router.post("/register", createNewUser);
  router.post("/login", logUserIn);
  router.post("/logout", logUserOut);
  return router;
};
