// import { connectToDb } from "@/app/utils/database";
// import ChurchMember from "@/app/models/churchMember.model";
// import ChurchAdmin from "@/app/models/churchAdmin.model";
// import { NextResponse } from "next/server";

// export const POST = async (req) => {
//   try {
//     const { email, otp, role: requestedRole } = await req.json();

//     if (!email || !otp || !requestedRole) {
//       return NextResponse.json(
//         { message: "Email, OTP, and role are required." },
//         { status: 400 }
//       );
//     }

//     await connectToDb();

//     // Check both collections for the user
//     const member = await ChurchMember.findOne({ email });
//     const admin = await ChurchAdmin.findOne({ email });

//     if (!member && !admin) {
//       return NextResponse.json(
//         { message: "No account found with this email address." },
//         { status: 404 }
//       );
//     }

//     // Determine the role based on where the user was found
//     const user = member || admin;
//     const actualRole = member ? "member" : "admin";

//     // 🚨 Prevent mismatched roles
//     if (requestedRole !== actualRole) {
//       return NextResponse.json(
//         { message: "Invalid role access. Please use the correct verification page." },
//         { status: 403 }
//       );
//     }

//     // 🚨 Check if email is already verified
//     if (user.isEmailVerified) {
//       return NextResponse.json(
//         { message: "Email already verified. You can log in now." },
//         { status: 400 }
//       );
//     }

//     // 🚨 Check OTP validity
//     if (user.emailVerificationOtp !== otp) {
//         return NextResponse.json(
//           { message: "The OTP you entered is incorrect. Please check your email and try again." },
//           { status: 400 }
//         );
//       }
      

//     // 🚨 Check OTP expiration
//     if (new Date() > new Date(user.emailVerificationOtpExpires)) {
//       return NextResponse.json({ message: "OTP has expired" }, { status: 400 });
//     }

//     // ✅ Mark email as verified
//     user.isEmailVerified = true;
//     user.emailVerificationOtp = null;
//     user.emailVerificationOtpExpires = null;
//     await user.save();

//     return NextResponse.json(
//       { message: "Email verified successfully! You can now log in." },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("❌ Email Verification Error:", error.message);
//     return NextResponse.json(
//       { message: "An unexpected error occurred. Please try again later." },
//       { status: 500 }
//     );
//   }
// };





import { connectToDb } from "@/app/utils/database";
import ChurchMember from "@/app/models/churchMember.model";
import ChurchAdmin from "@/app/models/churchAdmin.model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { email, otp, role: requestedRole } = await req.json();

    if (!email || !otp || !requestedRole) {
      return NextResponse.json(
        { error: "Email, OTP, and role are required." },
        { status: 400 }
      );
    }

    await connectToDb();

    // Check both collections for the user
    const member = await ChurchMember.findOne({ email });
    const admin = await ChurchAdmin.findOne({ email });

    if (!member && !admin) {
      return NextResponse.json(
        { error: "No account found with this email address." },
        { status: 404 }
      );
    }

    // Determine the role based on where the user was found
    const user = member || admin;
    const actualRole = member ? "member" : "admin";

    // 🚨 Prevent mismatched roles
    if (requestedRole !== actualRole) {
      return NextResponse.json(
        { error: "Invalid role access. Please use the correct verification page." },
        { status: 403 }
      );
    }

    // 🚨 Check if email is already verified
    if (user.isEmailVerified) {
      return NextResponse.json(
        { error: "Email already verified. You can log in now." },
        { status: 400 }
      );
    }

    // 🚨 Check OTP validity
    if (user.emailVerificationOtp !== otp) {
      return NextResponse.json(
        { error: "The OTP you entered is incorrect. Please check your email and try again." },
        { status: 400 }
      );
    }

    // 🚨 Check OTP expiration
    if (new Date() > new Date(user.emailVerificationOtpExpires)) {
      return NextResponse.json(
        { error: "OTP has expired." },
        { status: 400 }
      );
    }

    // ✅ Mark email as verified
    user.isEmailVerified = true;
    user.emailVerificationOtp = null;
    user.emailVerificationOtpExpires = null;
    await user.save();

    return NextResponse.json(
      { success: true, message: "Email verified successfully! You can now log in." },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Email Verification Error:", error.message);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
};
