//  /app/api/admin/add-ministries-activities/route.js



import { NextResponse } from "next/server";
import { connectToDb } from "@/app/utils/database";
import Activity from "@/app/models/activity.model";
import Ministry from "@/app/models/ministry.model";
import ChurchAdmin from "@/app/models/churchAdmin.model";

export const POST = async (req) => {
  try {
    await connectToDb();

    const { title, subtitle, image, ministryId, adminId } = await req.json();

    if (!title || !ministryId || !adminId) {
      return NextResponse.json(
        { message: "Title, ministry ID, and admin ID are required" },
        { status: 400 }
      );
    }

    // Check if ministry exists
    const ministry = await Ministry.findById(ministryId);
    if (!ministry) {
      return NextResponse.json(
        { message: "Ministry not found" },
        { status: 404 }
      );
    }

    // Check if admin exists
    const admin = await ChurchAdmin.findById(adminId);
    if (!admin) {
      return NextResponse.json(
        { message: "Admin not found" },
        { status: 404 }
      );
    }

    const newActivity = new Activity({
      title,
      subtitle,
      image,
      ministry: ministryId,
      adminId,
    });

    await newActivity.save();

    return NextResponse.json(
      { message: "Activity added successfully", newActivity },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
};
