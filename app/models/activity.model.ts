//  /app/models/activity.model.ts

import mongoose, { Schema, Document } from "mongoose";

export interface IActivity extends Document {
  title: string;
  subtitle: string;
  image: string;
  ministry: mongoose.Types.ObjectId;
  adminId: mongoose.Types.ObjectId;
  visibility: "public" | "private";  // Explicitly defining allowed values
  createdAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    image: { type: String },
    ministry: { type: mongoose.Schema.Types.ObjectId, ref: 'Ministry', required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChurchAdmin', required: true },
    visibility: { type: String, enum: ["public", "private"], required: true, default: "private" },
    createdAt: { type: Date, default: Date.now }
  },
  { collection: "activities" }
);

const Activity = mongoose.models.Activity || mongoose.model<IActivity>("Activity", ActivitySchema);

export default Activity;
