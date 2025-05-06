import { Note } from "../../../models/Note.js";

//? get all notes
export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json({ error: false, notes });
  } catch (err) {
    next(err);
  }
};

//? create a new note
export const createNewNote = async (req, res, next) => {
  const { title, content, tags = [], isPinned = false, userId } = req.body;
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
      tags,
      isPinned,
      userId,
    });
    res.status(201).json({ error: false, note });
  } catch (err) {
    next(err);
  }
};

//? edit a note by a specific id
export const updateNote = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, tags = [], isPinned = false } = req.body;
  try {
    if (!title || !content) {
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
      { title, content, tags, isPinned, updatedAt: new Date().getTime() }
    );

    if (updateNoteResult.modifiedCount > 0) {
      const updatedNote = await Note.findById(id);
      res.status(200).json({
        error: false,
        message: "Note updated successfully",
        updatedNote,
      });
    } else {
      res
        .status(200)
        .json({ error: false, message: "No changes made to the note" });
    }
  } catch (err) {
    next(err);
  }
};

//? update a note's pin
export const togglePin = async (req, res, next) => {
  const { id } = req.params;
  const { isPinned } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ error: true, message: "Note Id is required" });
  }

  try {
    const targetNote = await Note.findById(id);
    if (!targetNote) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    const updatedPin = !targetNote.isPinned;
    const updateNoteResult = await Note.updateOne(
      { _id: id },
      { isPinned: updatedPin, updatedAt: new Date().getTime() }
    );

    if (updateNoteResult.modifiedCount > 0) {
      const updatedNote = await Note.findById(id);
      res.status(200).json({
        error: false,
        message: "Note updated successfully",
        updatedNote,
      });
    } else {
      res
        .status(200)
        .json({ error: false, message: "No changes made to the note" });
    }
  } catch (err) {
    next(err);
  }
};

//? update a note's visibility
export const togglePublic = async (req, res, next) => {
  const { id } = req.params;
  const { isPublic } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ error: true, message: "Note Id is required" });
  }

  try {
    const targetNote = await Note.findById(id);
    if (!targetNote) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    const updatedPublic = !targetNote.isPublic;
    const updateNoteResult = await Note.updateOne(
      { _id: id },
      { isPublic: updatedPublic, updatedAt: new Date().getTime() }
    );

    if (updateNoteResult.modifiedCount > 0) {
      const updatedNote = await Note.findById(id);
      res.status(200).json({
        error: false,
        message: "Note updated successfully",
        updatedNote,
      });
    } else {
      res
        .status(200)
        .json({ error: false, message: "No changes made to the note" });
    }
  } catch (err) {
    next(err);
  }
};

//? delete a note by a specific id
export const deleteNote = async (req, res, next) => {
  const { id } = req.params;
  try {
    const targetNote = await Note.findById(id);
    if (!targetNote) {
      return res.status(404).json({
        error: true,
        message: "Note not found",
      });
    }

    const deleteResult = await Note.deleteOne({ _id: id });
    if (deleteResult.deletedCount > 0) {
      res
        .status(204)
        .json({ error: false, message: "Delete note successfully" });
    } else {
      res.status(404).json({ error: true, message: "Note not found" });
    }
  } catch (err) {
    next(err);
  }
};

//? search note
export const searchNote = async (req, res, next) => {
  const { query, startDate, endDate } = req.body;
  const filters = {};
  if (!query) {
    return res.status(400).json({ error: true, message: "Query is required" });
  }
  try {
    filters.$or = [
      { title: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } },
    ];

    if (startDate && endDate) {
      filters.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    } else if (startDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
      };
    } else if (endDate) {
      filters.createdAt = { $lte: new Date(endDate) };
    }

    const searchResults = await Note.find(filters).sort({ createdAt: -1 });
    const dataObj = searchResults.map((note) => ({
      id: note._id,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    }));
    res.status(200).json({ error: false, dataObj });
  } catch (err) {
    next(err);
  }
};
