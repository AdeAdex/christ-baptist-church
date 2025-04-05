// /app/models/contribution.model.ts


import mongoose, { Schema, Document } from "mongoose";

export interface IContribution extends Document {
  member: mongoose.Types.ObjectId; // ChurchMember ID
  amount: number;
  week: number; // 1 to 5 (based on Sundays in the month)
  month: string; // e.g., "April"
  year: number;  // e.g., 2025
  createdAt: Date;
  type: string;  // New field for the type/title of the contribution
  status: string;  // Contribution status (e.g., "Pending", "Completed", etc.)
  paymentMethod: string;  // Payment method (e.g., "Cash", "Bank Transfer")
  description: string;  // Optional description for the contribution
  createdBy: mongoose.Types.ObjectId;  // Who created the contribution (e.g., "Admin", "System")
}

const ContributionSchema = new Schema<IContribution>(
  {
    member: { type: Schema.Types.ObjectId, ref: "ChurchMember", required: true },
    amount: { type: Number, required: true },
    week: { type: Number, required: true, min: 1, max: 5 },
    month: { type: String, required: true },
    year: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    type: { type: String, required: true }, // Add type
    status: { type: String, required: true, default: "Pending" }, // Add status
    paymentMethod: { type: String, required: true },  // Add payment method
    description: { type: String, default: "" },  // Optional description
    createdBy: { type: Schema.Types.ObjectId, ref: "ChurchAdmin", required: true },    // Add who created the contribution
  },
  { timestamps: true }
);

const Contribution =
  mongoose.models.Contribution ||
  mongoose.model<IContribution>("Contribution", ContributionSchema);

export default Contribution;
