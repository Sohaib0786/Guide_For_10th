import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const askChatbot = async (req, res) => {

  try {
    const { message } = req.body;

    const allowedKeywords = [
      "career",
      "job",
      "stream",
      "class 10",
      "subject",
      "options",
      "guidance",
      "after 10th",
    ];

    const isCareerRelated = allowedKeywords.some((word) =>
      message.toLowerCase().includes(word)
    );

    if (!isCareerRelated) {
      return res.json({
        reply:
          "I'm sorry, I can only help with career-related questions for Class 10 students.",
      });
    }

    // ✅ Use correct stable model name
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a helpful and friendly career counselor for Class 10 students in India. 
    Be positive, clear, and concise.
    Question: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("Gemini Chatbot error:", error);
    res.status(500).json({
      error: "Gemini chatbot error",
      details: error.message,
    });
  }
};
