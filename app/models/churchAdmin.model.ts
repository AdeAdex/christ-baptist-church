// /app/models/churchAdmin.model.ts

import mongoose, { Schema } from "mongoose";
import { IChurchMember } from "./churchMember.model";

export interface IChurchAdmin
  extends Omit<IChurchMember, "role" | "ministry" | "membershipStatus"> {
  role: "admin"; // Enforce only "admin"
  permissions?: string[]; // Admin-specific permissions
}

// ✅ Define schema manually to avoid conflicts
const ChurchAdminSchema = new Schema<IChurchAdmin>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ["admin"], default: "admin", required: true }, // ✅ Enforce only "admin"
    address: { type: Schema.Types.Mixed }, // Assuming address structure exists
    socialMedia: { type: Schema.Types.Mixed }, // Assuming social media structure
    emergencyContact: { type: Schema.Types.Mixed }, // Assuming emergency contact structure
    permissions: [{ type: String }], // Admin-specific permissions
    createdAt: { type: Date, default: Date.now, immutable: true },
  },
  { collection: "churchadmins" }
);


const ChurchAdmin =
  mongoose.models.ChurchAdmin ||
  mongoose.model<IChurchAdmin>("ChurchAdmin", ChurchAdminSchema);

export default ChurchAdmin;
