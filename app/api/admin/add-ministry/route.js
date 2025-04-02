import { NextResponse } from "next/server";
import { connectToDb } from "@/app/utils/database";
import Ministry from "@/app/models/ministry.model"; // Assuming you have a Ministry model

export const POST = async (req) => {
  try {
    await connectToDb();

    // Parse the incoming request body
    const { name } = await req.json();

    // Validate ministry name
    if (!name) {
      return NextResponse.json(
        { message: "Ministry name is required" },
        { status: 400 }
      );
    }

    // Create and save new ministry
    const newMinistry = new Ministry({ name });
    await newMinistry.save();

    return NextResponse.json(
      {
        message: "Ministry added successfully",
        newMinistry,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
};
