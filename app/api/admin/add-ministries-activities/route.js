//  /app/api/admin/add-ministries-activities/route.js



import Activity from "@/app/models/activity.model";
import ChurchAdmin from "@/app/models/churchAdmin.model";
import Ministry from "@/app/models/ministry.model";
import { connectToDb } from "@/app/utils/database";
import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

// Set up Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req) => {
  try {
    await connectToDb();

    const { title, subtitle, image, ministryId, adminId, visibility } =
      await req.json();

      // console.log("Visibility: ",  visibility)

    if (!title || !ministryId || !adminId) {
      return NextResponse.json(
        { message: "Title, ministry ID, and admin ID are required" },
        { status: 400 }
      );
    }

    // Upload the image to Cloudinary
    let cloudinaryImageUrl = "";
    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "ministry_activities", // You can specify a folder
        transformation: [{ width: 500, height: 500, crop: "limit" }], // Optional image transformation (resize, etc.)
      });
      cloudinaryImageUrl = result.secure_url; // Get the secure URL for the image
    }

    const ministry = await Ministry.findById(ministryId);
    if (!ministry) {
      return NextResponse.json(
        { message: "Ministry not found" },
        { status: 404 }
      );
    }

    const admin = await ChurchAdmin.findById(adminId);
    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }

    const newActivity = new Activity({
      title,
      subtitle,
      image: cloudinaryImageUrl, // Store Cloudinary image URL
      ministry: ministryId,
      adminId,
      visibility: visibility || "private",
    });

    await newActivity.save();

    return NextResponse.json(
      { message: "Activity added successfully", newActivity },
      { status: 201 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
};
