import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";
import { signToken } from "../../../../lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  await connectDB();
  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  if (!user.password) return NextResponse.json({ error: "Password not set" }, { status: 403 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signToken({ sub: user._id.toString(), role: user.role });
  return NextResponse.json({ token, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
}