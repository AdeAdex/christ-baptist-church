//  /app/api/admin/get-all-ministries/route.js

import { NextResponse } from "next/server";
import { connectToDb } from "@/app/utils/database";
import Ministry from "@/app/models/ministry.model"; 


export const GET = async () => {
  try {
    await connectToDb();

    // Fetch ministries from the Ministry model
    const ministries = await Ministry.find().sort({ createdAt: -1 });

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
