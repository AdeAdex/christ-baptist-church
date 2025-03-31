//  /app/api/admin/get-all-ministries/route.js

import { NextResponse } from "next/server";
import { connectToDb } from "@/app/utils/database";
import ChurchMember from "@/app/models/churchMember.model";
import ChurchAdmin from "@/app/models/churchAdmin.model";

export const GET = async () => {
  try {
    await connectToDb();

    // Fetch ministries from members and admins
    const memberMinistries = await ChurchMember.distinct("ministry");
    const adminMinistries = await ChurchAdmin.distinct("ministry");

    // Merge unique ministries
    const ministries = [...new Set([...memberMinistries, ...adminMinistries])];

    return NextResponse.json(
      {
        message: "Ministries fetched successfully",
        ministries,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
};
