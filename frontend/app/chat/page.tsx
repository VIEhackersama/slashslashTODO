"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setChat((prev) => [...prev, { role: "user", text: message }]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      setChat((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { role: "bot", text: "❌ Không thể kết nối đến server!" },
      ]);
    }

    setMessage("");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">💬 Chatbot</h1>

      {/* CHAT BOX */}
      <div className="w-full max-w-2xl bg-neutral-800 rounded-lg p-4 h-[500px] overflow-y-auto shadow-lg border border-neutral-700">
        {chat.map((c, i) => (
          <div
            key={i}
            className={`my-3 p-3 rounded-xl max-w-[80%] ${
              c.role === "bot"
                ? "bg-blue-600 text-white self-start"
                : "bg-neutral-700 text-white self-end ml-auto"
            }`}
          >
            <b>{c.role === "bot" ? "🤖 Bot" : "🧑 Bạn"}:</b> {c.text}
          </div>
        ))}

        {loading && (
          <div className="text-gray-400 italic">Bot đang trả lời...</div>
        )}
      </div>

      {/* INPUT + BUTTON */}
      <div className="w-full max-w-2xl flex mt-4 gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
        />

        <Button
          onClick={sendMessage}
          className="px-6 bg-blue-600 hover:bg-blue-700"
        >
          Gửi
        </Button>
      </div>
    </div>
  );
}
