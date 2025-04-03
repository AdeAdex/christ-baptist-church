//  /app/admin/get-ministry-activities/route.js

import { NextResponse } from "next/server";
import { connectToDb } from "@/app/utils/database";
import Activity from "@/app/models/activity.model";
import Ministry from "@/app/models/ministry.model"; // Import the Ministry model

export const GET = async () => {
  try {
    await connectToDb();

    // Fetch all activities, sorted by creation date
    const activities = await Activity.find().sort({ createdAt: -1 });

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
      { message: "Activities fetched successfully", activities: updatedActivities },
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
