import { NextResponse } from "next/server";
import ChurchUser from "@/app/models/churchMember.model";
import { connectToDb } from "@/app/utils/database";
import { verifyToken } from "@/app/utils/jwtUtils";

export const POST = async (req) => {
  try {
    await connectToDb(); // Connect to DB

    // Get the session token from cookies
//     const sessionToken = req.headers.get("cookie")?.split("authToken=")[1];
// const sessionToken = req.headers.get("Authorization")?.split("Bearer ")[1];
const sessionToken = req.cookies.get("authToken");

// console.log("sessionToken", sessionToken);



    if (!sessionToken) {
      return NextResponse.json(
        { success: false, error: "Session token not found" },
        { status: 401 }
      );
    }

    const token = sessionToken.value;

    // Verify the session token
    const decodedToken = await verifyToken(token);
    
    if (!decodedToken) {
      return NextResponse.json(
        { success: false, error: "Invalid session token" },
        { status: 401 }
      );
    }

    // Check if token is expired
    if (decodedToken.exp && decodedToken.exp < Math.floor(Date.now() / 1000)) {
      return NextResponse.json(
        { success: false, error: "Session token has expired" },
        { status: 401 }
      );
    }

    // Find user by email
    const user = await ChurchUser.findOne({ email: decodedToken.email }).select(
      "-password -resetPasswordToken -socialId"
    );

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
