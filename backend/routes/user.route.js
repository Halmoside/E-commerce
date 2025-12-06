import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/users/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json({ message: "Email already in use" });

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashed });
  res.status(201).json({ user: { _id: user._id, name: user.name, email: user.email } });
});

// POST /api/users/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

// GET /api/users/current
router.get("/current", protect, async (req, res) => {
  res.json({ user: req.user });
});

export default router;
