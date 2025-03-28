//  /app/models/churchMember.model.ts


import mongoose, { Schema, Document } from "mongoose";
import { userFields } from "./userFields";

export interface IChurchMember extends Document {
  role: "member";
  socialId?: string;
  messages: mongoose.Types.ObjectId[]; // ✅ Array of message IDs
}

const ChurchMemberSchema = new Schema<IChurchMember>(
  {
    ...userFields,
    role: { type: String, enum: ["member"], default: "member", required: true },
    socialId: { type: String, default: "" },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }], // ✅ Reference to Message model
  },
  { collection: "churchmembers" }
);

const ChurchMember =
  mongoose.models.ChurchMember ||
  mongoose.model<IChurchMember>("ChurchMember", ChurchMemberSchema);

export default ChurchMember;
