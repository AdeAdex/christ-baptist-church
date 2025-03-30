//  /app/models/churchAdmin.model.ts


import mongoose, { Schema, Document } from "mongoose";
import { userFields } from "./userFields";

export interface IChurchAdmin extends Document {
  role: "admin";
  messages: mongoose.Types.ObjectId[];
  position: number; 
}

const ChurchAdminSchema = new Schema<IChurchAdmin>(
  {
    ...userFields,
    role: { type: String, enum: ["admin"], default: "admin", required: true },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    position: { type: Number, required: true }, // Ensure every admin has a position
  },
  { collection: "churchadmins", timestamps: true }
);

const ChurchAdmin =
  mongoose.models.ChurchAdmin ||
  mongoose.model<IChurchAdmin>("ChurchAdmin", ChurchAdminSchema);

export default ChurchAdmin;
