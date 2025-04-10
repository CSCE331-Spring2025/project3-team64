"use client";
import { GoogleTranslate } from "@/components/GoogleTranslate";

export default function ExamplePage() {
  return (
    <div className="p-6">
      <p>This is a sample paragraph to verify translation works.</p>
      <GoogleTranslate />
    </div>
  );
}