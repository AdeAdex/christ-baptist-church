//  /app/api/admin/add-member-contribution/route.js

import { connectToDb } from "@/app/utils/database";
import Contribution from "@/app/models/contribution.model";
import ChurchMember from "@/app/models/churchMember.model";
import ChurchAdmin from "@/app/models/churchAdmin.model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectToDb();

    const { memberId, amount, week, month, year } = await req.json();

    console.log("memberId", memberId);

    if (!memberId || !amount || !week || !month || !year) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if memberId belongs to a ChurchMember or ChurchAdmin
    let member = await ChurchMember.findById(memberId);
    if (!member) {
      member = await ChurchAdmin.findById(memberId); // Check if it's a ChurchAdmin
      if (!member) {
        return NextResponse.json(
          { message: "Member or Admin not found" },
          { status: 404 }
        );
      }
    }

    // Check if the user has made a contribution today
    if (member.hasMadeContributionToday) {
      return NextResponse.json(
        { message: "Contribution already made for today" },
        { status: 400 }
      );
    }

    // Create the contribution with the correct member ID
    const contribution = new Contribution({
      member: member._id, // Use `member._id` whether it's a member or admin
      amount,
      week,
      month,
      year,
    });

    await contribution.save();

    member.hasMadeContributionToday = true;
    member.lastContributionDate = new Date();
    await member.save();

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
