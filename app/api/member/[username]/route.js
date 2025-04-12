//  /app/api/member/[username]/route.js



import { NextResponse } from "next/server";
import { connectToDb } from "@/app/utils/database";
import ChurchMember from "@/app/models/churchMember.model";

// GET method for fetching a member by username
export async function GET(_req, { params }) {
  try {
    // Await the params to get the resolved username
    const username = (await params).username;

    if (!username) {
      return NextResponse.json({ message: "Username is required" }, { status: 400 });
    }

    await connectToDb();

    const member = await ChurchMember.findOne({ userName: username }).select(
      "-password -resetPasswordToken -emailVerificationOtp"
    );

    if (!member) {
      return NextResponse.json({ message: "Member not found" }, { status: 404 });
    }

    return NextResponse.json({ member }, { status: 200 });
  } catch (error) {
    console.error("Error fetching member:", error.message);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
