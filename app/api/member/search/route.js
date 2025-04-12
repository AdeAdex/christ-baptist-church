// /app/api/member/search/route.ts
import { connectToDb } from "@/app/utils/database";
import ChurchMember from "@/app/models/churchMember.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ members: [] }, { status: 200 });
  }

  try {
    await connectToDb();

    const members = await ChurchMember.find({
      userName: { $regex: new RegExp(username, "i") }, // case-insensitive match
    }).select("_id userName");

    return NextResponse.json({ members }, { status: 200 });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
