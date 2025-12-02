"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
interface Message {
  role: "user" | "bot";
  text: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

import { Navbar } from "@/components/common/NavBar";
import { Footer } from "@/components/common/Footer";

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
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages, loading]);

  // Tạo cuộc trò chuyện mới
  const createConversation = () => {
    const newConv: Conversation = {
      id: uuidv4(),
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
    <div className="min-h-screen dark:bg-neutral-950 flex flex-col transition-colors relative">
      {/* Background Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 z-10 flex gap-6 h-[calc(100vh-8rem)]">
        {/* SIDEBAR */}
        <aside className="w-64 bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-4 backdrop-blur-sm hidden md:flex">
          <Button
            onClick={createConversation}
            className="w-full bg-primary hover:bg-primary/90"
          >
            + New Chat
          </Button>

          <div className="flex flex-col gap-2 overflow-y-auto flex-1 pr-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setCurrentId(conv.id)}
                className={`
                  p-3 rounded-lg cursor-pointer transition-all border
                  ${
                    currentId === conv.id
                      ? "bg-primary/20 border-primary/50 text-white"
                      : "bg-transparent border-transparent hover:bg-white/5 text-muted-foreground hover:text-white"
                  }
                `}
              >
                <div className="font-semibold truncate">
                  {conv.title || "New Conversation"}
                </div>
                <div className="opacity-60 text-xs truncate mt-1">
                  {conv.messages[conv.messages.length - 1]?.text ||
                    "No messages"}
                </div>
              </div>
            ))}
          </div>

          {currentId && (
            <Button
              variant="destructive"
              onClick={() => deleteConversation(currentId)}
              className="w-full opacity-80 hover:opacity-100"
            >
              Delete Chat
            </Button>
          )}
        </aside>

        {/* MAIN CHAT AREA */}
        <section className="flex-1 flex flex-col bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm shadow-2xl">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20">
            <h1 className="text-xl font-bold flex items-center gap-2 text-white">
              <span>💬</span> AI Assistant
            </h1>
            <div className="md:hidden">
              {/* Mobile menu trigger could go here */}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {currentChat?.messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                <div className="text-6xl mb-4">👋</div>
                <p>Start a conversation...</p>
              </div>
            )}
            {currentChat?.messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-start gap-3 max-w-[85%]">
                  {m.role === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg text-xs shrink-0">
                      AI
                    </div>
                  )}

                  <div
                    className={`
                      p-3 rounded-2xl shadow-lg text-sm whitespace-pre-wrap leading-relaxed
                      ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-white/10 text-gray-100 rounded-tl-none border border-white/5"
                      }
                    `}
                  >
                    {m.text}
                  </div>

                  {m.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center shadow-lg text-xs shrink-0">
                      You
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full text-xs text-muted-foreground animate-pulse">
                  <span>AI is typing...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* INPUT */}
          <div className="p-4 bg-black/20 border-t border-white/10">
            <div className="flex items-end gap-2 bg-neutral-900/50 border border-white/10 rounded-xl p-2 focus-within:border-primary/50 transition-colors">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Type your message..."
                className="flex-1 bg-transparent border-none text-white resize-none focus:ring-0 max-h-32 py-3 px-2 scrollbar-hide"
                style={{ minHeight: "44px" }}
              />

              <Button
                onClick={sendMessage}
                size="icon"
                className="h-10 w-10 rounded-lg bg-primary hover:bg-primary/90 shrink-0 mb-0.5"
                disabled={!message.trim() || loading}
              >
                ➤
              </Button>
            </div>
            <div className="text-center mt-2">
              <p className="text-[10px] text-muted-foreground">
                AI can make mistakes. Consider checking important information.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
