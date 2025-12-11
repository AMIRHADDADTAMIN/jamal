import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "CHANGE_ME";

export type JWTPayload = {
  sub: string;
  role: string;
  iat?: number;
  exp?: number;
};

export function signToken(payload: JWTPayload, expiresIn = "7d") {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (err) {
    return null;
  }
}