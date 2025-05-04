import express from "express";
import mongoose from "mongoose";
import { getAllNotes, createNewNote, updateNote } from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createNewNote);
router.put("/:id", updateNote);

export default router;
