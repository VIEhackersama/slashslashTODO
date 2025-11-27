"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "bot";
  text: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const currentChat = conversations.find((c) => c.id === currentId);

  // Load lịch sử từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem("conversations");
    if (saved) {
      const parsed = JSON.parse(saved);
      setConversations(parsed);
      if (parsed.length > 0) setCurrentId(parsed[0].id);
    }
  }, []);

  // Lưu vào localStorage
  useEffect(() => {
    localStorage.setItem("conversations", JSON.stringify(conversations));
  }, [conversations]);

  // Scroll cuối
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages, loading]);

  // Tạo cuộc trò chuyện mới
  const createConversation = () => {
    const newConv: Conversation = {
      id: crypto.randomUUID(),
      title: "Cuộc trò chuyện mới",
      messages: [],
    };
    setConversations((prev) => [newConv, ...prev]);
    setCurrentId(newConv.id);
  };

  // Xóa cuộc hội thoại
  const deleteConversation = (id: string) => {
    const filtered = conversations.filter((c) => c.id !== id);
    setConversations(filtered);
    if (filtered.length > 0) setCurrentId(filtered[0].id);
    else {
      setCurrentId(null);
      createConversation();
    }
  };

  // Gửi tin nhắn
  const sendMessage = async () => {
    if (!message.trim() || !currentId) return;

    // Thêm user message
    setConversations((prev) =>
      prev.map((c) =>
        c.id === currentId
          ? {
              ...c,
              messages: [...c.messages, { role: "user", text: message }],
              title: c.messages.length === 0 ? message.slice(0, 20) : c.title,
            }
          : c
      )
    );

    const userMsg = message;
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();
      const botReply = data.reply;

      // Hiệu ứng streaming text
      let displayed = "";
      let i = 0;

      // Tạo bot message rỗng trước
      setConversations((prev) =>
        prev.map((c) =>
          c.id === currentId
            ? { ...c, messages: [...c.messages, { role: "bot", text: "" }] }
            : c
        )
      );

      const interval = setInterval(() => {
        if (i < botReply.length) {
          displayed += botReply[i];
          i++;

          setConversations((prev) =>
            prev.map((c) =>
              c.id === currentId
                ? {
                    ...c,
                    messages: [
                      ...c.messages.slice(0, c.messages.length - 1),
                      { role: "bot", text: displayed },
                    ],
                  }
                : c
            )
          );
        } else {
          clearInterval(interval);
        }
      }, 10);
    } catch {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === currentId
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  { role: "bot", text: "❌ Lỗi kết nối server!" },
                ],
              }
            : c
        )
      );
    }

    setLoading(false);
  };

  // Enter để gửi
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-950 text-white">

      {/* SIDEBAR */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 p-4 flex flex-col gap-4">

        <Button onClick={createConversation} className="w-full bg-blue-600 hover:bg-blue-700">
          + Cuộc trò chuyện mới
        </Button>

        <div className="flex flex-col gap-2 overflow-y-auto h-[80vh]">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setCurrentId(conv.id)}
              className={`
                p-3 rounded-lg cursor-pointer transition 
                ${currentId === conv.id ? "bg-neutral-700" : "bg-neutral-800"}
                hover:bg-neutral-700
              `}
            >
              <div className="font-semibold">{conv.title || "Không tên"}</div>
              <div className="opacity-60 text-sm line-clamp-1">
                {conv.messages[0]?.text || "Chưa có tin nhắn"}
              </div>
            </div>
          ))}
        </div>

        {currentId && (
          <Button
            variant="destructive"
            onClick={() => deleteConversation(currentId)}
          >
            Xóa cuộc trò chuyện
          </Button>
        )}
      </aside>

      {/* MAIN CHAT AREA */}
      <main className="flex-1 flex flex-col items-center p-6">

        <h1 className="text-3xl font-bold mb-4">💬 Chat AI</h1>

        <div className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-xl p-5 h-[550px] overflow-y-auto shadow-xl">
          {currentChat?.messages.map((m, i) => (
            <div key={i} className={`flex mb-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="flex items-start gap-3 max-w-[80%]">
                
                {m.role === "bot" && (
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
                    🤖
                  </div>
                )}

                {m.role === "user" && (
                  <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center shadow-lg">
                    🧑
                  </div>
                )}

                <div
                  className={`
                    p-3 rounded-2xl shadow-xl text-sm whitespace-pre-wrap leading-relaxed
                    ${m.role === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-neutral-800 text-blue-100 rounded-tl-none"}
                  `}
                >
                  {m.text}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-gray-500 italic animate-pulse pl-2">
              Bot đang trả lời…
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* INPUT */}
        <div className="w-full max-w-3xl mt-4 flex items-center gap-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder="Nhập tin nhắn…"
            className="flex-1 p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white resize-none focus:border-blue-500 outline-none"
          />

          <Button onClick={sendMessage} className="px-6 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg">
            ➤
          </Button>
        </div>
      </main>
    </div>
  );
}
