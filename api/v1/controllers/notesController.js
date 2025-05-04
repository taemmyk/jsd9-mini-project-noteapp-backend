import { Note } from "../../../models/Note.js";

//? get all notes
export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
};

//? create a new note
export const createNewNote = async (req, res, next) => {
  const { title, content, userId } = req.body;
  try {
    if (!title || !content || !userId) {
      return res.status(400).json({
        error: true,
        message: "Title, content and user ID are required",
      });
    }

    const note = await Note.create({
      title,
      content,
      userId,
    });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};
