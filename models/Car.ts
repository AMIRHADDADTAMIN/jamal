import mongoose, { Schema, Document } from "mongoose";

export interface ICar extends Document {
  brand: string;
  model: string;
  year: number;
  km: number;
  location: {
    city?: string;
    lat?: number;
    lng?: number;
  };
  price: number;
  aiPrice?: number;
  images: string[];
  sellerId: Schema.Types.ObjectId;
  status: "active" | "pending" | "sold";
  ev?: {
    batteryHealth?: number;
    chargingCycles?: number;
    rangeKm?: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const CarSchema = new Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    km: { type: Number, default: 0 },
    location: {
      city: String,
      lat: Number,
      lng: Number
    },
    price: { type: Number, required: true },
    aiPrice: { type: Number },
    images: { type: [String], default: [] },
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["active", "pending", "sold"], default: "pending" },
    ev: {
      batteryHealth: Number,
      chargingCycles: Number,
      rangeKm: Number
    }
  },
  { timestamps: true }
);

export default mongoose.models.Car || mongoose.model<ICar>("Car", CarSchema);