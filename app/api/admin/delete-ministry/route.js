// /app/pages/api/admin/delete-ministry/route.js

import { NextResponse } from "next/server";
import { connectToDb } from "@/app/utils/database";
import Ministry from "@/app/models/ministry.model"; // Assuming you have a Ministry model

export const DELETE = async (req) => {
  try {
    // Get the ministry ID from the query parameters
    const { searchParams } = new URL(req.url); // Extract query parameters
    const id = searchParams.get('id'); // Get 'id' parameter

    if (!id) {
      return NextResponse.json(
        { message: "Ministry ID is required" },
        { status: 400 }
      );
    }

    await connectToDb();

    // Find and delete the ministry by ID
    const deletedMinistry = await Ministry.findByIdAndDelete(id);

    if (!deletedMinistry) {
      return NextResponse.json(
        { message: "Ministry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Ministry deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
};
