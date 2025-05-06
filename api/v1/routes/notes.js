import express from "express";
import { getAllNotes, createNewNote, updateNote, togglePin, togglePublic, deleteNote } from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createNewNote);
router.put("/:id", updateNote);
router.put("/update-pin/:id", togglePin)
router.put("/update-public/:id", togglePublic)
router.delete("/:id", deleteNote);

export default router;
