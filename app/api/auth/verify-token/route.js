import { NextResponse } from "next/server";
import { verifyToken } from "@/app/utils/jwtUtils";
import { connectToDb } from "@/app/utils/database";
import ChurchMember from "@/app/models/churchMember.model";
import ChurchAdmin from "@/app/models/churchAdmin.model";

export const POST = async (req) => {
  try {
    if (req.method !== "POST") {
      return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
    }

    const { token, role } = await req.json(); // Get role from request
    // console.log("Role", role);
    if (!token || !role) {
      return NextResponse.json({ message: "Token or role is missing" }, { status: 400 });
    }

    // Verify the token
    const decodedToken = await verifyToken(token);

    if (!decodedToken) {
      return NextResponse.json({ message: "Invalid token or Token has expired" }, { status: 400 });
    }

    // Ensure role in token matches role in request
    if (decodedToken.role !== role) {
      return NextResponse.json({ message: "Role mismatch. Access denied." }, { status: 403 });
    }

    await connectToDb();

    // Validate role and find user in the correct collection
    let user;
    if (role === "member") {
      user = await ChurchMember.findOne({ resetPasswordToken: token });
    } else if (role === "admin") {
      user = await ChurchAdmin.findOne({ resetPasswordToken: token });
    } else {
      console.error("Invalid role");
      return NextResponse.json({ message: "Invalid role" }, { status: 403 });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ username: user.userName, message: "Password reset request successful!" }, { status: 200 });
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
