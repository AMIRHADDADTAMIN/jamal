import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/automat";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached: { conn: typeof mongoose | null } = { conn: null };

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  const opts = {
    bufferCommands: false
  };

  const conn = await mongoose.connect(MONGODB_URI, opts);
  cached.conn = conn;
  return conn;
}