import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import ServiceOrder from "../../../../models/ServiceOrder";
import { verifyToken } from "../../../../lib/auth";

/**
 * Create a service order: oil_change, mobile_carwash, ev_charging, diagnostics, tesla_service, tuning
 */
export async function POST(request: Request) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  const user = token ? verifyToken(token) : null;
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { category, carId, vendorId, details, scheduleAt } = body;

  if (!category) return NextResponse.json({ error: "Missing category" }, { status: 400 });

  await connectDB();

  const order = new ServiceOrder({
    userId: user.sub,
    vendorId: vendorId,
    carId,
    category,
    details: { ...details, scheduleAt },
    status: "pending"
  });

  await order.save();

  // TODO: notify vendor via websocket / push
  return NextResponse.json({ order });
}