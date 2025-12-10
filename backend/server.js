import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "https://guide-for-10th.vercel.app/",
    credentials: true,
  })
);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/chatbot", chatbotRoutes);



// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
