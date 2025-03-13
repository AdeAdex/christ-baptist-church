import { cookies } from "next/headers";

export async function POST() {
  "use server";

  const cookieStore = await cookies();
  cookieStore.delete("authToken"); // ✅ Directly delete the cookie

  return Response.json({ message: "Logged out successfully" }, { status: 200 });
}
