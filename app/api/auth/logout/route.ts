import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  "use server";

  try {
    const cookieStore = await cookies();
    
    // ✅ Expire the cookie
    cookieStore.set("authToken", "", { maxAge: 0, path: "/" });

    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
  } catch (error) {
    console.error("Logout error:", error);
    
    return NextResponse.json(
      { message: "Logout failed. Please try again." },
      { status: 500 }
    );
  }
}
