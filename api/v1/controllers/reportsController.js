import { Note } from "../../../models/Note.js";

//? ❌ get note report from a specific id by date range
export const getNoteReport = async (req, res, next) => {
  const userId = req.user.user._id;
  try {
    const allNotes = await Note.find({ userId }).sort({ createdAt: 1 });
    if (!allNotes || allNotes.length === 0) {
      return res.status(200).json({
        totalNote: 0,
        oldestNote: null,
        latestNote: null,
        date: [],
      });
    }
    const totalNote = allNotes.length;
    const oldestNote = allNotes[0].createdAt;
    const latestNote = allNotes[allNotes.length - 1].createdAt;

    const dataObj = allNotes.map((note) => {
      return {
        id: note._id,
        title: note.title,
        content: note.content,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      };
    });

    res
      .status(200)
      .json({ error: false, totalNote, oldestNote, latestNote, data: dataObj });
  } catch (err) {
    next(err);
  }
};