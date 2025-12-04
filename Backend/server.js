import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import path from "path";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 8080;
const app = express();
const _dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/chatbot", chatbotRoutes);

// Serve frontend
app.use(express.static(path.join(_dirname, "frontend", "dist")));

app.use((req, res) => {
  res.sendFile(path.join(_dirname, "frontend", "dist", "index.html"));
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
