"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RiCloseLine } from "react-icons/ri";
import { RiMessageFill } from "react-icons/ri";
import { useState } from "react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="rounded-full w-6 h-6 p-0 shadow-lg bg-black"
      >
        <RiMessageFill/>
      </Button>
    )
  }
  return (
    <main className="flex flex-col items-center px-16">
      <div className= "fixed bottom-4 right-4 bg-white rounded-lg flex flex-col transition-all duration-300 ease-in-out w-96 h-[500px] max-h-[80vh] border border-[#6F403A]">
        <div className="flex items-center justify-between p-4 bg-[#f0dece] text-[#6F403A] rounded-t-lg font-semibold text-lg">
          <p>Bubbleflow Assistant</p>
          <div className=" -mt-6 -mr-2">
            <RiCloseLine onClick={() => setIsOpen(false)}/>
          </div>
        </div>
      </div>
    </main>
  );
}