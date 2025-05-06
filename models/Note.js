import { Schema, model } from "mongoose";

export const NoteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  isPinned: { type: Boolean, default: false },
  isPublic: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date().getTime() },
  updatedAt: { type: Date, default: new Date().getTime() },
});

export const Note = model("Note", NoteSchema);
