import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Automotive Chatbot — accepts user messages & returns assistant reply.
 * Supports: recommend cars, predict service costs, EV battery analysis, Tesla-specific advice.
 */
export async function POST(request: Request) {
  const { messages } = await request.json(); // messages: [{role:'user', content:''}]
  if (!messages) return NextResponse.json({ error: "Missing messages" }, { status: 400 });

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 600
    });

    const content = completion.choices?.[0]?.message?.content || "Sorry, I couldn't respond.";
    return NextResponse.json({ reply: content });
  } catch (err) {
    console.error("Advisor AI error", err);
    return NextResponse.json({ reply: "AI service unavailable" }, { status: 503 });
  }
}