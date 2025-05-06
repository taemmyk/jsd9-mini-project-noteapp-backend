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

//? ❌ protected route
router.get("/:id", authUser, getNotesByMe);
router.post("/", authUser, createNewNote);
router.put("/:id", authUser, updateNoteById);
router.put("/update-pin/:id", authUser, togglePinById);
router.put("/update-public/:id", authUser, togglePublicById);
router.delete("/:id", authUser, deleteNoteById);

export default router;
