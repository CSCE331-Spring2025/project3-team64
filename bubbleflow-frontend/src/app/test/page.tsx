"use client";
import { GoogleTranslate } from "@/components/GoogleTranslate";

//Test page; this can be deleted honestly
export default function ExamplePage() {
  return (
    <div className="p-6">
      <p>This is a sample paragraph to verify translation works.</p>
      <GoogleTranslate />
    </div>
  );
}