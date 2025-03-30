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
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Check if the admin exists and has the required position
    const admin = await ChurchAdmin.findById(adminId);
    if (!admin || ![1, 2, 3].includes(admin.position)) {
      return NextResponse.json(
        { message: "Unauthorized. Only top 3 admins can update these fields." },
        { status: 403 }
      );
    }

    // Allowed fields for updates
    const allowedFields = [
      "baptismDate",
      "confirmationDate",
      "ministry",
      "membershipStartDate",
      "membershipStatus",
      "permissionStatus",
      "permissionLevel",
      "hasPermission",
      "role",
    ];

    // Validate that only allowed fields are being updated
    const filteredUpdates = {};
    Object.keys(updates).forEach((key) => {
      if (allowedFields.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    });

    if (Object.keys(filteredUpdates).length === 0) {
      return NextResponse.json(
        { message: "No valid fields provided for update." },
        { status: 400 }
      );
    }

    // Check if the target user exists (either as a member or admin)
    let targetUser = await ChurchMember.findById(targetUserId);
    let isAdmin = false;

    if (!targetUser) {
      targetUser = await ChurchAdmin.findById(targetUserId);
      isAdmin = true;
    }

    if (!targetUser) {
      return NextResponse.json(
        { message: "Target user not found." },
        { status: 404 }
      );
    }

    // Update the user
    const updatedUser = isAdmin
      ? await ChurchAdmin.findByIdAndUpdate(targetUserId, { $set: filteredUpdates }, { new: true, runValidators: true })
      : await ChurchMember.findByIdAndUpdate(targetUserId, { $set: filteredUpdates }, { new: true, runValidators: true });

    return NextResponse.json(
      { message: "User updated successfully", updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
};
