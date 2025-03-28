import { NextResponse } from "next/server";
import { connectToDb } from "@/app/utils/database";
import ChurchMember from "@/app/models/churchMember.model";
import ChurchAdmin from "@/app/models/churchAdmin.model";
import { hashPassword, comparePassword } from "@/app/utils/bcrypt";
import { sendPasswordChangeEmail } from "@/app/utils/emailUtils";

export const POST = async (req) => {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { token, password, role } = await req.json();

    // console.log("Received Token:", token);
    // console.log("Received Password:", password);
    // console.log("Received Role:", role);

    if (!token || !password || !role) {
      return NextResponse.json(
        { error: "Token, password, and role are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    await connectToDb();

    // Validate role and find the user
    let user;
    if (role === "member") {
      user = await ChurchMember.findOne({ resetPasswordToken: token });
    } else if (role === "admin") {
      user = await ChurchAdmin.findOne({ resetPasswordToken: token });
    } else {
      console.log("Invalid role provided:", role);
      return NextResponse.json({ error: "Invalid role. Access denied." }, { status: 403 });
    }
   

    if (!user) {
      console.log("Invalid token or user not found");
      return NextResponse.json(
        { error: "Invalid token or user not found" },
        { status: 404 }
      );
    }

    // ✅ Check if email is verified before proceeding
    if (!user.isEmailVerified) {
      return NextResponse.json(
        { error: "Your email is not verified. Please check your inbox to verify your email." },
        { status: 403 }
      );
    }

        // Prevent resetting to the same password
    const isSamePassword = await comparePassword(password, user.password);
    if (isSamePassword) {
      console.log("New password matches existing password");
      return NextResponse.json(
        { error: "New password cannot be the same as the existing password" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await hashPassword(password);

    // Update password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    // Send confirmation email
    await sendPasswordChangeEmail(user.email, user.firstName);

    // console.log("Password reset successfully for:", user.email);
    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting password:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
