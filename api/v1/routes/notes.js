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
router.get("/tags", authUser, getAllMyTags);
router.get("/:id", authUser, getNotesByMe);
router.post("/", authUser, createNewNote);
router.put("/:id", authUser, updateNoteById);
router.put("/update-pin/:id", authUser, togglePinById);
router.put("/update-public/:id", authUser, togglePublicById);
router.delete("/:id", authUser, deleteNoteById);
router.get("/tag/:tag", authUser, getNotesByMeTagFiltered);

export default router;
