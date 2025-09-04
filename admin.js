import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware inside route (no extra file)
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// Admin dashboard route
router.get("/dashboard", authMiddleware, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied" });
  }
  res.json({ msg: "Welcome Admin, this is your dashboard" });
});

export default router;
