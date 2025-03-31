import { NextResponse } from "next/server";
import { connectToDb } from "@/app/utils/database";
import ChurchMember from "@/app/models/churchMember.model";
import ChurchAdmin from "@/app/models/churchAdmin.model";

export const PATCH = async (req) => {
  try {
    await connectToDb();
    const { adminId, targetUserId, updates } = await req.json();

    if (!adminId || !targetUserId || !updates) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    let user = await ChurchMember.findById(targetUserId);
    let isAdmin = false;

    if (!user) {
      user = await ChurchAdmin.findById(targetUserId);
      isAdmin = true;
    }

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    console.log("User before update:", user);

    // Check if role is changing
    if (updates.role && updates.role !== user.role) {
      console.log(`Changing role from ${user.role} to ${updates.role}...`);

      // Prepare new user data with all updated fields
      const newUserData = { ...user.toObject(), ...updates };

      delete newUserData._id; // Remove _id to avoid conflicts

      // Delete from old collection
      if (isAdmin) {
        await ChurchAdmin.findByIdAndDelete(targetUserId);
      } else {
        await ChurchMember.findByIdAndDelete(targetUserId);
      }

      // Create new user in the correct collection
      let newUser;
      if (updates.role === "admin") {
        newUser = await ChurchAdmin.create({
          ...newUserData,
          position: updates.position || 4, // Assign position if admin
        });
      } else {
        newUser = await ChurchMember.create(newUserData);
      }

      return NextResponse.json(
        { message: "User role changed and updated successfully", updatedUser: newUser },
        { status: 200 }
      );
    }

    // Otherwise, just update fields normally
    Object.assign(user, updates);
    await user.save();

    return NextResponse.json(
      { message: "User updated successfully", updatedUser: user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
};


