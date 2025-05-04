import express from "express";
import mongoose from "mongoose";
import { getAllNotes } from "../controllers/notesController.js";
import { Note } from "../../../models/Note.js";

const router = express.Router();

router.get("/", getAllNotes);

export default router;
