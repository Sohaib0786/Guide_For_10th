import express from "express";
import {  login, getCurrentUser, logOut, registration } from "../controllers/authController.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registration);
router.post("/login", login);

// Protected Routes
router.get("/me", authMiddleware, getCurrentUser);
router.post("/logout", authMiddleware, logOut);

export default router;
