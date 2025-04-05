// /app/admin/get-public-activities/route.js

import { NextResponse } from "next/server";
import { connectToDb } from "@/app/utils/database";
import Activity from "@/app/models/activity.model";
import Ministry from "@/app/models/ministry.model";

export const GET = async (req) => {
  try {
    await connectToDb();
    const { searchParams } = req.nextUrl;
    const ministry = searchParams.get("ministry");

    // If the ministry is provided, filter activities by ministry and visibility (public)
    const filter = ministry 
      ? { ministry, visibility: "public" } 
      : { visibility: "public" };

    // Fetch activities based on the filter
    const activities = await Activity.find(filter).sort({ createdAt: -1 });

    // Fetch ministries in one query for better performance
    const ministries = await Ministry.find({}, "_id name");

    // Create a map of ministryId -> ministry name
    const ministryMap = new Map(ministries.map((ministry) => [ministry._id.toString(), ministry.name]));

    // Attach ministry name to each activity
    const updatedActivities = activities.map((activity) => ({
      ...activity._doc,
      ministryName: ministryMap.get(activity.ministry.toString()) || "N/A",
    }));

    return NextResponse.json(
      { message: "Public activities fetched successfully", activities: updatedActivities },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
};
