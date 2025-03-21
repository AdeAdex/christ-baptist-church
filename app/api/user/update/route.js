import { connectToDb } from "@/app/utils/database";
import ChurchUser from "@/app/models/churchMember.model";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const PATCH = async (req) => {
  try {
    const formData = await req.formData();
    const userId = formData.get("userId");
    const base64Image = formData.get("profilePicture"); // Base64-encoded image
    const updates = {};

    if (!userId) {
      return NextResponse.json(
        { message: "Missing user ID. Please provide a valid user ID to proceed." },
        { status: 400 }
      );
    }
    

    await connectToDb();

    const existingUser = await ChurchUser.findById(userId);
    if (!existingUser) {
      return NextResponse.json(
        { message: "No user found with the provided ID. Please check and try again." },
        { status: 404 }
      );
    }
    

    // Handle Cloudinary upload if a Base64 image is provided
    if (base64Image) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(base64Image, {
          folder: "church_members", 
        });

        updates.profilePicture = uploadResponse.secure_url;
      } catch (error) {
        return NextResponse.json(
          {
            message: "Error uploading image",
            error: error.message,
            cloudinaryError: error,
          },
          { status: 500 }
        );
      }
    }

    // Extract other fields dynamically
    for (const [key, value] of formData.entries()) {
      if (key !== "userId" && key !== "profilePicture") {
        try {
          updates[key] = JSON.parse(value);
        } catch {
          updates[key] = value;
        }
      }
    }

    const updatedUser = await ChurchUser.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        updatedUser,
        message: "Profile updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unexpected error occurred",
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
};
