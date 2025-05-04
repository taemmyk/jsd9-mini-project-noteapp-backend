import express from "express";
import NoteRoutes from "./routes/notes.js";
import { getNoteReport } from "./controllers/reportsController.js"

const router = express.Router();

export default () => {
  router.use("/notes", NoteRoutes);
  router.get("/report/notes", getNoteReport)
  return router;
};
