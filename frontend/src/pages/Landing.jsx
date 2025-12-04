import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../context/ChatContext";
import Chatbot from "../components/Chatbot";

const prompts = [
  "Best career options after Class 10",
  "How to choose a stream after Class 10",
  "Top courses after Class 10",
  "Best Software Course after Class 10",
  "Best Sports Career after Class 10"
];

export default function Landing() {
  
  const navigate = useNavigate();
  const { openChatWithPrompt } = useChat();

  // Safely read localStorage
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null; // Prevent flashing before redirect

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex flex-col items-center p-6">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-8 mt-10 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-3">
          Welcome, {user?.name} 🎓
        </h2>
        <p className="text-gray-600 mb-6 text-lg">
          Explore these prompts to get personalized career guidance:
        </p>

        <ul className="space-y-4">
          {prompts.map((p, i) => (
            <li
              key={i}
              className="cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-3 px-5 rounded-lg shadow-sm transition transform hover:scale-105"
              onClick={() => openChatWithPrompt(p)}
            >
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
}
