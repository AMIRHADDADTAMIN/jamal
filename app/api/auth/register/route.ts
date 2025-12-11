import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";
import { ROLES } from "../../../../lib/roles";
import { signToken } from "../../../../lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password, phone, role } = body;

  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }

  const hash = password ? await bcrypt.hash(password, 10) : undefined;
  const assignedRole = Object.values(ROLES).includes(role) ? role : ROLES.USER;

  const user = new User({
    name,
    email,
    phone,
    password: hash,
    role: assignedRole
  });

  await user.save();

  const token = signToken({ sub: user._id.toString(), role: user.role });
  return NextResponse.json({ user: { id: user._id, email: user.email, name: user.name, role: user.role }, token });
}