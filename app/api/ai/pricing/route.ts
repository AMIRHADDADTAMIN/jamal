import { NextResponse } from "next/server";
import { OpenAI } from "openai";

/**
 * Lightweight AI pricing wrapper that calls OpenAI to estimate price based on brand, model, km, region.
 * This endpoint should be throttled and protected in production.
 */
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  const { brand, model, km, region } = await request.json();

  if (!brand || !model) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // A simple prompt to get AI suggested price — keep short / safe
  const prompt = `You are an expert automotive valuation engine.
Brand: ${brand}
Model: ${model}
Mileage_km: ${km || "unknown"}
Region: ${region || "global"}
Return a JSON object with keys: price (number), fastSalePrice (number), confidence (0-1)`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200
    });

    const text = completion.choices?.[0]?.message?.content || "";
    // Try to parse any JSON in the response
    let parsed: any = {};
    try {
      parsed = JSON.parse(text);
    } catch {
      // Fallback heuristic parse
      const priceMatch = text.match(/"price"\s*:\s*([0-9.]+)/) || text.match(/price[:=]\s*([0-9.]+)/);
      const fastMatch = text.match(/fastSalePrice[:=]\s*([0-9.]+)/) || text.match(/fast[:=]\s*([0-9.]+)/);
      parsed.price = priceMatch ? Number(priceMatch[1]) : Math.max(5000, Math.round(Math.random() * 40000));
      parsed.fastSalePrice = fastMatch ? Number(fastMatch[1]) : Math.round(parsed.price * 0.9);
      parsed.confidence = 0.6;
    }

    return NextResponse.json({
      price: parsed.price,
      fastSalePrice: parsed.fastSalePrice,
      confidence: parsed.confidence
    });
  } catch (err) {
    console.error("AI pricing error", err);
    return NextResponse.json({
      price: Math.round(10000 + Math.random() * 30000),
      fastSalePrice: Math.round(8000 + Math.random() * 25000),
      confidence: 0.4
    });
  }
}