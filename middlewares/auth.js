import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const token = req.cookies?.accessToken;
  // console.log("🔐 Checking token:", token);

  if (!token) {
    // console.log("❌ No token provided in cookies.");
    return res.status(401).json({ error: true, message: "Access denied. No token." });
  }

  try {
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("✅ Token verified:", decoded_token);

    req.user = { user: { _id: decoded_token.userId } };
    next();
  } catch (err) {
    const isExpired = err.name === "TokenExpiredError";
    // console.log("❌ Token verification failed:", err.message);

    res.status(401).json({
      error: true,
      code: isExpired ? "TOKEN_EXPIRED" : "INVALID_TOKEN",
      message: isExpired
        ? "Token has expired, please log in again."
        : "Invalid token.",
    });
  }
};