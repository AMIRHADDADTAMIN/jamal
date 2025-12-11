import mongoose, { Schema, Document } from "mongoose";

export type ServiceCategory =
  | "oil_change"
  | "mobile_carwash"
  | "ev_charging"
  | "diagnostics"
  | "tesla_service"
  | "tuning";

export interface IServiceOrder extends Document {
  userId: Schema.Types.ObjectId;
  vendorId?: Schema.Types.ObjectId;
  carId?: Schema.Types.ObjectId;
  category: ServiceCategory;
  details?: any;
  price?: number;
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

const ServiceOrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    vendorId: { type: Schema.Types.ObjectId, ref: "User" },
    carId: { type: Schema.Types.ObjectId, ref: "Car" },
    category: { type: String, enum: ["oil_change", "mobile_carwash", "ev_charging", "diagnostics", "tesla_service", "tuning"], required: true },
    details: { type: Schema.Types.Mixed },
    price: Number,
    status: { type: String, enum: ["pending", "accepted", "in_progress", "completed", "cancelled"], default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.models.ServiceOrder || mongoose.model<IServiceOrder>("ServiceOrder", ServiceOrderSchema);