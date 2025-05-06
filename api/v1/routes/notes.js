import express from "express";
import {
  getAllNotes,
  getPublicNotesById,
  getNotesByMe,
  createNewNote,
  updateNoteById,
  togglePinById,
  togglePublicById,
  deleteNoteById,
} from "../controllers/notesController.js";
import { authUser } from "../../../middlewares/auth.js";

const router = express.Router();

//? public route
router.get("/public", getAllNotes);
router.get("/public/:id", getPublicNotesById);

//? protected route
router.get("/:id", getNotesByMe);
router.post("/", createNewNote);
router.put("/:id", updateNoteById);
router.put("/update-pin/:id", togglePinById);
router.put("/update-public/:id", togglePublicById);
router.delete("/:id", deleteNoteById);

export default router;
