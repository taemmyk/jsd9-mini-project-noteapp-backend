import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({
      error: true,
      message: "Access denied. No token.",
    });
  }
  try {
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { user: { _id: decoded_token.userId } };
    next();
  } catch (err) {
    const isExpired = err.name === "TokenExpiredError";
    res.status(404).json({
      error: true,
      code: isExpired ? "TOKEN_EXPIRED" : "INVALID_TOKEN",
      message: isExpired
        ? "Token has expired, please login again"
        : "Invalid token",
    });
  }
};
