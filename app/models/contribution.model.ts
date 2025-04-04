// /app/models/contribution.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IContribution extends Document {
  member: mongoose.Types.ObjectId; // ChurchMember ID
  amount: number;
  week: number; // 1 to 5 (based on Sundays in the month)
  month: string; // e.g., "April"
  year: number;  // e.g., 2025
  contributedAt: Date;
}

const ContributionSchema = new Schema<IContribution>(
  {
    member: { type: Schema.Types.ObjectId, ref: "ChurchMember", required: true },
    amount: { type: Number, required: true },
    week: { type: Number, required: true, min: 1, max: 5 },
    month: { type: String, required: true }, // Can later change to enum for fixed month names
    year: { type: Number, required: true },
    contributedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Contribution =
  mongoose.models.Contribution ||
  mongoose.model<IContribution>("Contribution", ContributionSchema);

export default Contribution;
