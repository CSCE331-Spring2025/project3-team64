import { NextResponse } from "next/server";
import OpenAI from "openai";
import { NextRequest } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
    });
    
    if (!completion.choices || completion.choices.length === 0) {
      return NextResponse.json({ error: "No completion choices returned" }, { status: 500 });
    }
    
    return NextResponse.json({
      text: completion.choices[0].message.content?.trim() || "",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "OpenAI request failed." }, { status: 500 });
  }
}