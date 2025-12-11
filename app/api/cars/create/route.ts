import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Car from "../../../../models/Car";
import { ROLES } from "../../../../lib/roles";
import { request as nodeFetch } from "undici";
import { verifyToken } from "../../../../lib/auth";

/**
 * Create a car listing.
 * If ai flag, call AI pricing microservice to suggest a price (internal endpoint).
 */
export async function POST(request: Request) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  const payload = token ? verifyToken(token) : null;
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { brand, model, year, km, location, price, images, ev } = body;

  if (!brand || !model || !year || !price) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await connectDB();

  // Basic role check: sellers and dealers can create listings
  if (![ROLES.SELLER, ROLES.DEALER, ROLES.ADMIN, ROLES.SUPER_ADMIN].includes(payload.role as any)) {
    return NextResponse.json({ error: "Insufficient role" }, { status: 403 });
  }

  // Call internal AI pricing endpoint for suggestion (best-effort)
  let aiPrice: number | undefined = undefined;
  try {
    const aiRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/ai/pricing`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand, model, km, region: location?.city })
    });
    const aiJson = await aiRes.json();
    aiPrice = aiJson.price;
  } catch (e) {
    console.warn("AI pricing failed", e);
  }

  const car = new Car({
    brand,
    model,
    year,
    km,
    location,
    price,
    aiPrice: aiPrice || price,
    images: images || [],
    sellerId: payload.sub,
    status: "active",
    ev
  });

  await car.save();

  return NextResponse.json({ car });
}