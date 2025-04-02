//  /app/models/ministry.model.ts


import mongoose, { Schema, Document } from "mongoose";

export interface IMinistry extends Document {
  name: string;
  createdAt: Date;
}

const MinistrySchema = new Schema<IMinistry>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "ministries" }
);

const Ministry =
  mongoose.models.Ministry || mongoose.model<IMinistry>("Ministry", MinistrySchema);

export default Ministry;
