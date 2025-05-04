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

//? edit a note by a specific id
export const updateNote = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, userId } = req.body;
  try {
    if (!title || !content || !userId) {
      return res.status(400).json({
        error: true,
        message: "Title, content and user ID are required",
      });
    }

    const targetNote = await Note.findById(id);
    if (!targetNote) {
      return res.status(404).json({
        error: true,
        message: "Note not found",
      });
    }

    const updateNoteResult = await Note.updateOne(
      { _id: id },
      { title, content, userId, updatedAt: new Date().getTime() }
    );

    if (updateNoteResult.modifiedCount > 0) {
      const updatedNote = await Note.findById(id);
      res.status(200).json(updatedNote);
    } else {
      res.status(200).json({ message: "No changes made to the note" });
    }
  } catch (err) {
    next(err);
  }
};
