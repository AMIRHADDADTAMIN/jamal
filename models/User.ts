import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  walletAddress?: string;
  role: string;
  kyc?: {
    status: "pending" | "verified" | "rejected";
    data?: any;
  };
  blacklist?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String },
    walletAddress: { type: String, index: true },
    role: { type: String, default: "USER" },
    kyc: {
      status: { type: String, default: "pending" },
      data: { type: Schema.Types.Mixed }
    },
    blacklist: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);