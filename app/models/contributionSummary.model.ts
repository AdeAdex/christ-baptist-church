// /app/models/contributionSummary.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IContributionSummary extends Document {
  member: mongoose.Types.ObjectId;
  month: string;
  year: number;
  totalAmount: number;
}

const ContributionSummarySchema = new Schema<IContributionSummary>(
  {
    member: { type: Schema.Types.ObjectId, ref: "ChurchMember", required: true },
    month: { type: String, required: true },
    year: { type: Number, required: true },
    totalAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ContributionSummary =
  mongoose.models.ContributionSummary ||
  mongoose.model<IContributionSummary>("ContributionSummary", ContributionSummarySchema);

export default ContributionSummary;
