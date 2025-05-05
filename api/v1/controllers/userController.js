import { User } from "../../../models/User.js";
import bcrypt from "bcrypt";

//? register a new user
export const createNewUser = async (req, res, next) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    return res
      .status(400)
      .json({ error: true, message: "All fields are required" });
  }
  try {
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      return res
        .status(409)
        .json({ error: true, message: "This email is already in use" });
    }
    const user = new User({ name, username, password });
    await user.save();
    res
      .status(201)
      .json({ error: false, message: "User created successfully", user });
  } catch (err) {
    next(err);
  }
};

//? sign in
export const logUserIn = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: true, message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid credentials" });
    }

    res.status(200).json({ error: false, message: "Logged in successfully" });
  } catch (err) {
    next(err);
  }
};

//TODO: sign out
export const logUserOut = async (req, res, next) => {};
