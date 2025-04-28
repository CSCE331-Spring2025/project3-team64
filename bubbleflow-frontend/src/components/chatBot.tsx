"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { RiCloseLine, RiMessageFill } from "react-icons/ri";

//Chatbot functionality

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "You are sigma, a helpful assistant for users that are ordering off an application called Bubbleflow, which is a point of sales system for the bubble tea shop chain Sharetea. During your messages, I do not want any markdown text, just regular text."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (
      isOpen &&
      messages.length === 1 &&
      messages[0].role === "system"
    ) {
      const greeting = {
        role: "assistant",
        content:
          "Hi, I'm Sigma, Bubbleflow's AI Assistant! How can I help you today?"
      };
      setMessages((prev) => [...prev, greeting]);
    }
  }, [isOpen, messages]);

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://bubbleflow.vercel.app/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated })
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.text ?? "[no reply]" }
      ]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    sendMessage();
  }

  if (!isOpen) {
    return (
      <div
        onClick={() => setIsOpen(true)}
        className="rounded-full flex items-center justify-center w-6 h-6  bg-black text-white"
      >
        <RiMessageFill size={16} />
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-16 w-96 h-[500px] flex flex-col bg-white border border-primary rounded-lg shadow-lg">
      <div className="flex items-center justify-between p-4 bg-[#f0dece] text-primary rounded-t-lg">
        <h3 className="font-semibold">Bubbleflow Assistant</h3>
        <RiCloseLine
          className="cursor-pointer -mt-6 -mr-2"
          onClick={() => setIsOpen(false)}
          size={16}
        />
      </div>
      <div className="flex-1 overflow-y-auto p-4 text-sm space-y-3 flex flex-col no-scrollbar">
        {messages
          .filter((m) => m.role !== "system")
          .map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-72 ${
                  m.role === "user" ? "bg-[#f0dece] rounded-xl p-2 px-3 items-center justify-center" : ""
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
        {loading && (
          <div className="self-start italic text-sm text-gray-500">
            Sigma is typing…
          </div>
        )}
        {error && (
          <div className="self-start text-sm text-red-500">Error: {error}</div>
        )}
      </div>

      <form onSubmit={handleSend} className="flex items-center p-4 space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Type a message…"
          disabled={loading}
          className="rounded-xl"
        />
      </form>
    </div>
  );
}

