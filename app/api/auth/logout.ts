import { cookies } from "next/headers";

// export async function POST() {
//   "use server"; // ✅ Ensure this runs on the server

//   const cookieStore = await cookies(); // ✅ Use `await`

//   cookieStore.set("authToken", "", {
//     httpOnly: true,
//     expires: new Date(0), // ✅ Expire immediately
//     path: "/",
//   });

//   return Response.json({ message: "Logged out successfully" }, { status: 200 });
// }

export async function POST() {
  "use server";

  const cookieStore = await cookies();
  cookieStore.delete("authToken"); // ✅ Directly delete the cookie

  return Response.json({ message: "Logged out successfully" }, { status: 200 });
}
