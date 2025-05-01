// /app/api/auth/get-auth-token/route.js

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
   const cookieStore = await cookies(); // ✅ await this now
   const token = cookieStore.get("authToken")?.value || null;
  
   return NextResponse.json({ token });
}
