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
  getAllMyTags,
  getNotesByMeTagFiltered,
} from "../controllers/notesController.js";
import { authUser } from "../../../middlewares/auth.js";

const router = express.Router();

//? public route
router.get("/public", getAllNotes);
router.get("/public/:id", getPublicNotesById);

//? ❌ protected route
router.get("/:id", authUser, getNotesByMe);
router.post("/", authUser, createNewNote);
router.patch("/edit/:id", authUser, updateNoteById);
router.patch("/update-pin/:id", authUser, togglePinById);
router.patch("/update-public/:id", authUser, togglePublicById);
router.delete("/delete/:id", authUser, deleteNoteById);
router.get("/tags/me", authUser, getAllMyTags);
router.get("/tags/me/:tag", authUser, getNotesByMeTagFiltered);

export default router;
