import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Booking from "../../../../models/Booking";
import { verifyToken } from "../../../../lib/auth";

/**
 * Request a tow-truck. Returns a placeholder ETA and uses redis later for real-time tracking.
 */
export async function POST(request: Request) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  const user = token ? verifyToken(token) : null;
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { location, problemDescription } = await request.json();
  await connectDB();

  const booking = new Booking({
    userId: user.sub,
    type: "tow",
    location,
    details: { problemDescription },
    status: "pending"
  } as any);

  await booking.save();

  // Placeholder ETA & route optimization mock
  const etaMinutes = Math.max(5, Math.floor(Math.random() * 25));
  const route = {
    from: { lat: location?.lat || 0, lng: location?.lng || 0 },
    to: { lat: (location?.lat || 0) + 0.01, lng: (location?.lng || 0) + 0.01 },
    etaMinutes
  };

  return NextResponse.json({ booking, route });
}