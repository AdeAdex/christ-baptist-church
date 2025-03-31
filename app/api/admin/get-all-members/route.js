// //  /app/api/admin/get-all-member.route.js



// import { NextResponse } from "next/server";
// import { connectToDb } from "@/app/utils/database";
// import ChurchMember from "@/app/models/churchMember.model";
// import ChurchAdmin from "@/app/models/churchAdmin.model";

// export const GET = async () => {
//   try {
//     await connectToDb();

//     // Fetch members and admins
//     const members = await ChurchMember.find({});
//     const admins = await ChurchAdmin.find({});

//     // Merge and return all users
//     const allUsers = [...members, ...admins];

//     return NextResponse.json(
//       {
//         message: "All members and admins fetched successfully",
//         allMembers: allUsers,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Server error", error: error.message },
//       { status: 500 }
//     );
//   }
// };






import { NextResponse } from "next/server";
import { connectToDb } from "@/app/utils/database";
import ChurchMember from "@/app/models/churchMember.model";
import ChurchAdmin from "@/app/models/churchAdmin.model";

export const GET = async (req) => {
  try {
    await connectToDb();

    // Extract search term from query parameters
    const { search } = Object.fromEntries(new URL(req.url).searchParams);

    let query = {};

    if (search) {
      query = {
        $or: [
          { firstName: { $regex: search, $options: "i" } }, // Match first name
          { email: { $regex: search, $options: "i" } }, // Match email
          { phoneNumber: { $regex: search, $options: "i" } }, // Match phone
          { userName: { $regex: search, $options: "i" } }, // Match username
        ],
      };
    }

    // Fetch members and admins with filtering
    const members = await ChurchMember.find(query);
    const admins = await ChurchAdmin.find(query);

    // Merge filtered users
    const allUsers = [...members, ...admins];

    return NextResponse.json(
      {
        message: "Members and admins fetched successfully",
        allMembers: allUsers,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
};
