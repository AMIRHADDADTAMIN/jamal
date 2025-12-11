import mongoose from "mongoose";

// Default MongoDB Atlas URI provided by user.
// NOTE: For security, prefer setting process.env.MONGODB_URI instead of hardcoding credentials.
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://amirhaddadtamin_db_user:0xtmWilHeelDgdyr@cluster0.mgjq4ry.mongodb.net/?appName=Cluster0";

let cached: { conn: typeof mongoose | null } = { conn: null };

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    console.warn("Warning: MONGODB_URI is not defined. Connecting to default localhost.");
  }

  const opts = {
    bufferCommands: false
  };

  try {
    const conn = await mongoose.connect(MONGODB_URI, opts);
    cached.conn = conn;
    return conn;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    return null; // یا throw error; اگر بخوای پروژه خطا بده
  }
}
