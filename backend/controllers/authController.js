import User from "../models/User.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken } from "../config/token.js";

// ---------------- Registration ----------------
export const registration = async (req, res) => {
  try {
    const { name, email, password, class: userClass, age, interests } = req.body;

    // Check if user exists
    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json({ message: "User already exists" });

    // Validate email
    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Enter a valid Email" });

    // Validate password
    if (password.length < 8)
      return res.status(400).json({ message: "Password must be at least 8 characters" });

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      class: userClass || "",
      age: age || "",
      interests: interests || [],
    });

    // Generate token
    const token = genToken(user._id);

    // Send cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true on HTTPS
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      message: "Registration successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        class: user.class,
        age: user.age,
        interests: user.interests,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

// ---------------- Login ----------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // Generate token
    const token = genToken(user._id);

    // Send cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true on HTTPS
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        class: user.class,
        age: user.age,
        interests: user.interests,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

// ---------------- Logout ----------------
export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

// ---------------- Get Current User ----------------
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });

    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      class: req.user.class,
      age: req.user.age,
      interests: req.user.interests,
    });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};
