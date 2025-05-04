import express from "express";
import mongoose from "mongoose";
import { getAllNotes, createNewNote } from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createNewNote);

export default router;
