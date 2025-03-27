import { NextResponse } from "next/server";
import ChurchMember from "@/app/models/churchMember.model";
import ChurchAdmin from "@/app/models/churchAdmin.model";
import { connectToDb } from "@/app/utils/database";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export const POST = async (req) => {
  try {
    await connectToDb();

    const sessionToken = req.cookies.get("authToken");

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, error: "Session token not found" },
        { status: 401 }
      );
    }

    const token = sessionToken.value;

    try {
      const { payload } = await jwtVerify(token, secretKey);
      if (!payload?.email) {
        return NextResponse.json(
          { success: false, error: "Invalid session token" },
          { status: 401 }
        );
      }

      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        return NextResponse.json(
          { success: false, error: "Session token has expired" },
          { status: 401 }
        );
      }

      let user = await ChurchAdmin.findOne({ email: payload.email }).select(
        "-password -resetPasswordToken -socialId"
      );

      let role = "member"; // Default to member

      if (!user) {
        user = await ChurchMember.findOne({ email: payload.email }).select(
          "-password -resetPasswordToken -socialId"
        );

        if (!user) {
          return NextResponse.json(
            { success: false, error: "User not found" },
            { status: 404 }
          );
        }
      } else {
        role = "admin"; // If found in `ChurchAdmin`, set role to admin
      }

      return NextResponse.json(
        { success: true, user, role }, // Send role to frontend
        { status: 200 }
      );
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return NextResponse.json(
        { success: false, error: "Invalid session token" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
