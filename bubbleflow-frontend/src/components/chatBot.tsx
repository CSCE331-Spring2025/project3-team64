"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RiCloseLine, RiMessageFill } from "react-icons/ri";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "system", content: "You are sigma, a helpful assistant for users that are ordering off an application called Bubbleflow, which is a point of sales system for sharetea. I want you to be imformative about Sharetea's menu  offerings and be able to help costomers with the order placing process. When the conversation starts, you should post a message saying Hi, I\&apos;m Sigma, Bubbleflow\&apos;s AI Assistant! How can i help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: data.text ?? "[no reply]" },
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
      <Button
        onClick={() => setIsOpen(true)}
        className="rounded-full w-6 h-6 p-0 shadow-lg bg-black text-white"
      >
        <RiMessageFill size={24} />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-16 w-96 h-[500px] flex flex-col bg-white border rounded-lg shadow-lg">
      <div className="flex items-center justify-between p-4 bg-[#f0dece] text-[#6F403A] rounded-t-lg">
        <h3 className="font-semibold">Bubbleflow Assistant</h3>
        <RiCloseLine
          className="cursor-pointer"
          onClick={() => setIsOpen(false)}
          size={20}
        />
      </div>
      <div className="flex-1 overflow-y-auto p-4 text-sm space-y-3 flex flex-col">
        {messages
          .filter(m => m.role !== "system")
          .map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-72 rounded-xl ${
                  m.role === "user" ? "bg-[#f0dece] p-2 items-center" : ""
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
        {loading && (
          <div className="self-start italic text-sm text-gray-500">
            Assistant is typing…
          </div>
        )}
        {error && (
          <div className="self-start text-sm text-red-500">Error: {error}</div>
        )}
      </div>
      <form onSubmit={handleSend} className="flex items-center p-4 space-x-2">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
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

