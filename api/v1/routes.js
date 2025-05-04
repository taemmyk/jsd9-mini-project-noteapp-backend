import express from "express";
import NoteRoutes from "./routes/notes.js";

const router = express.Router();

export default () => {
  router.use("/notes", NoteRoutes);
  return router;
};
