//  /app/models/churchAdmin.model.ts


import mongoose, { Schema, Document } from "mongoose";
import { userFields } from "./userFields";

export interface IChurchAdmin extends Document {
  role: "admin";
  permissions?: string[];
  messages: mongoose.Types.ObjectId[]; // ✅ Array of message IDs
}

const ChurchAdminSchema = new Schema<IChurchAdmin>(
  {
    ...userFields,
    role: { type: String, enum: ["admin"], default: "admin", required: true },
    permissions: [{ type: String }],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }], // ✅ Reference to Message model
  },
  { collection: "churchadmins", timestamps: true }
);

const ChurchAdmin =
  mongoose.models.ChurchAdmin ||
  mongoose.model<IChurchAdmin>("ChurchAdmin", ChurchAdminSchema);

export default ChurchAdmin;
