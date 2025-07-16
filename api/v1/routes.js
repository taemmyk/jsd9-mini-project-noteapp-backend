import express from "express";
import NoteRoutes from "./routes/notes.js";
import { getNoteReport } from "./controllers/reportsController.js";
import { searchNote } from "./controllers/notesController.js";
import { createNewUser, logUserIn, logUserOut, checkAuth } from "./controllers/userController.js";
import { authUser } from "../../middlewares/auth.js";

const router = express.Router();

export default () => {
  router.use("/notes", NoteRoutes);
  router.post("/reports", authUser, getNoteReport);
  router.post("/search", authUser, searchNote);
  router.post("/register", createNewUser);
  router.post("/login", logUserIn);
  router.post("/logout", logUserOut);
  router.get("/check-auth", checkAuth);
  return router;
};
