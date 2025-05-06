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

    // res.status(200).json({ error: false, message: "Logged in successfully" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ error: false, message: "Logged in successfully", token });

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
      maxAge: 60 * 60 * 1000, // 1hr
    });

    res.status(200).json({
      error: false,
      message: "Logged in successfully",
      user: { _id: user_id, username: user.username },
    });
  } catch (err) {
    next(err);
  }
};

//? sign out
export const logUserOut = async (req, res, next) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.status(200).json({ error: false, message: "Logged out successfully" });
};

//? verify token
export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: true, message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      error: false,
      userId: decoded.user.id,
      message: "Token is valid",
    });
  } catch (err) {
    next(err);
  }
};

//? get profile
export const getProfile = async (req, res, next) => {
  const user = await User.findById(req.user.user._id).select("-password");
  if (!user) {
    return res.status(404).json({ error: true, message: "User not found" });
  }

  res.status(200).json({ error: false, user });
};
