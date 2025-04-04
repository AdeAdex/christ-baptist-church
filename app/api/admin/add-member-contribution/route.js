//  /app/api/admin/add-member-contribution/route.js


import { connectToDb } from "@/app/utils/database";
import Contribution from "@/app/models/contribution.model";
import ContributionSummary from "@/app/models/contributionSummary.model";
import ChurchMember from "@/app/models/churchMember.model";
import ChurchAdmin from "@/app/models/churchAdmin.model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectToDb();

    const { memberId, amount, week, month, year, type, status, paymentMethod, description, createdBy } = await req.json();

    if (!memberId || !amount || !week || !month || !year || !adminId || !type || !status || !paymentMethod || !createdBy) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Find member and admin
    let member = await ChurchMember.findById(memberId);
    if (!member) {
      member = await ChurchAdmin.findById(memberId);  // Check if it's a ChurchAdmin
      if (!member) {
        return NextResponse.json(
          { message: "Member or Admin not found" },
          { status: 404 }
        );
      }
    }

    const admin = await ChurchAdmin.findById(createdBy);
    if (!admin) {
      return NextResponse.json(
        { message: "Admin not found" },
        { status: 404 }
      );
    }

    // Create the contribution
    const contribution = new Contribution({
      member: member._id,
      amount,
      week,
      month,
      year,
      createdBy: admin._id,
      type,
      status,
      paymentMethod,
      description,
    });

    await contribution.save();

    // Update or create the ContributionSummary
    let summary = await ContributionSummary.findOne({ member: member._id, month, year });
    if (summary) {
      summary.totalAmount += amount;  // Increment the total amount for that month/year
      summary.totalMonthlyContribution += amount;  // Add to the total monthly contribution
    } else {
      summary = new ContributionSummary({
        member: member._id,
        month,
        year,
        totalAmount: amount,
        totalMonthlyContribution: amount,  // Initialize with the current contribution amount
      });
    }

    await summary.save();

    return NextResponse.json(
      { message: "Contribution added successfully", contribution },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contribution Error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
};
