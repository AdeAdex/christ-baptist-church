// /app/models/contributionSummary.model.ts


import mongoose, { Schema, Document } from "mongoose";

export interface IContributionSummary extends Document {
  member: mongoose.Types.ObjectId; // ChurchMember ID
  month: string;
  year: number;
  totalAmount: number;
  totalMonthlyContribution: number;  // New field for total monthly contribution
}

const ContributionSummarySchema = new Schema<IContributionSummary>(
  {
    member: { type: Schema.Types.ObjectId, ref: "ChurchMember", required: true },
    month: { type: String, required: true },
    year: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    totalMonthlyContribution: { type: Number, required: true, default: 0 },  // Add totalMonthlyContribution
  },
  { timestamps: true }
);

const ContributionSummary =
  mongoose.models.ContributionSummary ||
  mongoose.model<IContributionSummary>("ContributionSummary", ContributionSummarySchema);

export default ContributionSummary;
