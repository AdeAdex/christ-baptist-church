import { connectToDb } from "@/app/utils/database";
import ChurchAdmin from "@/app/models/churchAdmin.model";
import ChurchMember from "@/app/models/churchMember.model";
import { v2 as cloudinary } from "cloudinary";
import { sendBroadcastEmail } from "@/app/utils/emailUtils";
import { NextResponse } from "next/server";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req) => {
  try {
    const { subject, message, image, video } = await req.json(); 

    if (!subject || !message) {
      return NextResponse.json(
        { error: "Subject and message are required." },
        { status: 400 }
      );
    }

    await connectToDb();

    const admins = await ChurchAdmin.find({}, "email");
    const members = await ChurchMember.find({}, "email");

    const allUsers = [...admins, ...members];

    // Handle media uploads
    let imageUrl = "";
    let videoUrl = "";

    // Upload image if present
    if (image) {
      const uploadImageResponse = await cloudinary.uploader.upload(image, {
        folder: "broadcast_images",
      });
      imageUrl = uploadImageResponse.secure_url;
    }

    // Upload video if present (same as image, handle base64)
    if (video) {
      const uploadVideoResponse = await cloudinary.uploader.upload(video, {
        resource_type: "video",
        folder: "broadcast_videos",
      });
      videoUrl = uploadVideoResponse.secure_url;
    }

    // Send emails in parallel with the media URLs if available
    const emailPromises = allUsers.map(({ email }) =>
      sendBroadcastEmail(email, subject, message, imageUrl, videoUrl)
    );

    await Promise.all(emailPromises);

    return NextResponse.json(
      { message: "Broadcast email sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Broadcast email error:", error.message);
    return NextResponse.json(
      { error: "Failed to send broadcast email." },
      { status: 500 }
    );
  }
};
