import mongoose, { Schema, Document } from "mongoose";

export type BookingType = "rental" | "service" | "tow";

export interface IBooking extends Document {
  userId: Schema.Types.ObjectId;
  carId?: Schema.Types.ObjectId;
  type: BookingType;
  vendorId?: Schema.Types.ObjectId;
  startAt?: Date;
  endAt?: Date;
  location?: {
    lat?: number;
    lng?: number;
    address?: string;
  };
  price?: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt?: Date;
  updatedAt?: Date;
}

const BookingSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    carId: { type: Schema.Types.ObjectId, ref: "Car" },
    type: { type: String, enum: ["rental", "service", "tow"], required: true },
    vendorId: { type: Schema.Types.ObjectId, ref: "User" },
    startAt: Date,
    endAt: Date,
    location: {
      lat: Number,
      lng: Number,
      address: String
    },
    price: Number,
    status: { type: String, enum: ["pending", "confirmed", "cancelled", "completed"], default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);