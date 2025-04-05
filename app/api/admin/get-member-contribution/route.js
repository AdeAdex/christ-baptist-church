// /app/api/admin/get-member-contribution/route.js

import { connectToDb } from "@/app/utils/database";
import Contribution from "@/app/models/contribution.model";
import ChurchMember from "@/app/models/churchMember.model";
import ChurchAdmin from "@/app/models/churchAdmin.model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectToDb();

    const body = await req.json();
    const { memberId } = body;


    if (!memberId) {
      return NextResponse.json(
        { message: "Your ID is missing. Please ensure you're logged in" },
        { status: 400 }
      );
    }

    let member = await ChurchMember.findById(memberId);
    if (!member) {
      member = await ChurchAdmin.findById(memberId);
      if (!member) {
        return NextResponse.json(
          { message: "No matching member or admin found with the provided Member ID." },
          { status: 404 }
        );
      }
    }

    const contributions = await Contribution.find({ member: member._id })
      .sort({ contributedAt: -1 })
      .populate("createdBy", "firstName lastName") // Change from 'admin' to 'createdBy'
      .exec();

    return NextResponse.json(
      {
        message: "Contributions fetched successfully.",
        contributions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching contribution history:", error);
    return NextResponse.json(
      {
        message: "Server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
