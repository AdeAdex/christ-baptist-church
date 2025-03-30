// app/actions/getAuthToken.ts
"use server";

import { cookies } from "next/headers";

export async function getAuthToken() {
  const cookieStore = await cookies(); // ✅ Await the cookies() function
  return cookieStore.get("authToken")?.value || null;
}
