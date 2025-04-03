//  app/api/admin/delete-ministry-activity/route.js



import { NextResponse } from "next/server";
import { connectToDb } from "@/app/utils/database";
import Activity from "@/app/models/activity.model";

export const DELETE = async (req) => {
  try {
    const { activityId } = await req.json();

    if (!activityId) {
      return NextResponse.json(
        { message: "Activity ID is required" },
        { status: 400 }
      );
    }

    await connectToDb();

    // Delete the activity by ID
    const deletedActivity = await Activity.findByIdAndDelete(activityId);

    if (!deletedActivity) {
      return NextResponse.json(
        { message: "Activity not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Activity deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting activity:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
};
