import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Button } from "./ui/button";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const fetchGeminiResponse = async (userMessage: string) => {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    if (!API_KEY) {
      console.error("API Key is missing!");
      return;
    }

    setIsTyping(true);

    try {
      console.log("Sending request to Gemini API...");

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        { contents: [{ parts: [{ text: userMessage }] }] },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      console.log("Response from API:", response.data);

      const botReply =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from AI";

      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error fetching response:",
          error.response?.data || error.message
        );
      } else {
        console.error("Error fetching response:", error);
      }
      setMessages((prev) => [
        ...prev,
        { text: "Error fetching response", sender: "bot" },
      ]);
    }

    setIsTyping(false);
  };

  const handleSendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, sender: "user" }]);
    fetchGeminiResponse(input);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-80 h-96 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-4 flex flex-col border border-gray-300 dark:border-gray-700 mb-1.5"
          >
            <div className="flex justify-between items-center border-gray-300 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Zayka<span className="text-orange-600">Hub</span> AI Chatbot
              </h2>
              <Button
                onClick={() => setIsOpen(false)}
                className="text-white dark:text-black hover:text-red-500 dark:hover:text-red-500"
              >
                <X size={20} />
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 pb-0.5 border-b-2">
              Designed by Rahul Raj
            </p>
            <div className="flex-1 overflow-y-auto text-gray-900 dark:text-white p-2 space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white self-end"
                      : "bg-gray-200 dark:bg-gray-800 text-black dark:text-white self-start"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="text-gray-500 dark:text-gray-400">
                  AI is typing...
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Send size={18} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 flex items-center justify-center"
      >
        <MessageCircle size={28} />
      </motion.button>
    </div>
  );
};

export default Chatbot;
