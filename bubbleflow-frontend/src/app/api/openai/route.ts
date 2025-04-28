import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request) {
  try {
    const { messages } = await request.json();
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
    });
    return NextResponse.json({
      text: completion.choices[0].message.content.trim(),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "OpenAI request failed." }, { status: 500 });
  }
}