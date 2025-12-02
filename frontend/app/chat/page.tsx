"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/common/NavBar";
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

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const currentChat = conversations.find((c) => c.id === currentId);

  // Load conversations
  useEffect(() => {
    const saved = localStorage.getItem("conversations");
    if (saved) {
      const parsed = JSON.parse(saved);
      setConversations(parsed);
      if (parsed.length > 0) setCurrentId(parsed[0].id);
    }
  }, []);

  // Save conversations
  useEffect(() => {
    localStorage.setItem("conversations", JSON.stringify(conversations));
  }, [conversations]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages, loading]);

  // Create new conversation
  const createConversation = () => {
    const newConv: Conversation = {
      id: uuidv4(),
      title: "New Chat",
      messages: [],
    };
    setConversations((prev) => [newConv, ...prev]);
    setCurrentId(newConv.id);
  };

  // Delete conversation
  const deleteConversation = (id: string) => {
    const filtered = conversations.filter((c) => c.id !== id);
    setConversations(filtered);

    if (filtered.length > 0) setCurrentId(filtered[0].id);
    else {
      setCurrentId(null);
      createConversation();
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!message.trim() || !currentId) return;

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

      let displayed = "";
      let i = 0;

      // Initial empty bot message
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

  // Send on Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border p-4 bg-card flex flex-col gap-4">
          <Button
            onClick={createConversation}
            className="w-full bg-primary text-primary-foreground"
          >
            + New Chat
          </Button>

          <div className="flex flex-col gap-2 overflow-y-auto h-[75vh]">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setCurrentId(conv.id)}
                className={`p-3 rounded-lg cursor-pointer transition 
                ${
                  currentId === conv.id
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground"
                }
                hover:bg-accent`}
              >
                <div className="font-semibold">{conv.title}</div>
                <div className="opacity-70 text-sm line-clamp-1">
                  {conv.messages[0]?.text || "No messages yet"}
                </div>
              </div>
            ))}
          </div>

          {currentId && (
            <Button variant="destructive" onClick={() => deleteConversation(currentId)}>
              Delete Chat
            </Button>
          )}
        </aside>

        {/* Main chat area */}
        <main className="flex-1 flex flex-col items-center p-6">
          <h1 className="text-3xl font-bold mb-4">💬 AI Chatbot</h1>

          <div className="w-full max-w-3xl bg-card border border-border rounded-xl p-5 h-[550px] overflow-y-auto shadow">
            {currentChat?.messages.map((m, i) => (
              <div
                key={i}
                className={`flex mb-4 ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-start gap-3 max-w-[80%]">
                  {m.role === "bot" && (
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      🤖
                    </div>
                  )}

                  {m.role === "user" && (
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      🧑
                    </div>
                  )}

                  <div
                    className={`
                      p-3 rounded-2xl shadow text-sm whitespace-pre-wrap leading-relaxed
                      ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-muted text-foreground rounded-tl-none"
                      }
                    `}
                  >
                    {m.text}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-muted-foreground italic animate-pulse pl-2">
                Bot is typing…
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="w-full max-w-3xl mt-4 flex items-center gap-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              placeholder="Type your message…"
              className="flex-1 p-3 rounded-lg bg-card border border-border resize-none focus:border-primary outline-none"
            />

            <Button
              onClick={sendMessage}
              className="px-6 py-4 bg-primary text-primary-foreground"
            >
              ➤
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
