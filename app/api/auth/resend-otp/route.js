import { connectToDb } from "@/app/utils/database";
import ChurchMember from "@/app/models/churchMember.model";
import ChurchAdmin from "@/app/models/churchAdmin.model";
import { NextResponse } from "next/server";
import { generateEmailVerificationOTP } from "@/app/utils/jwtUtils";
import { sendOtpEmail } from "@/app/utils/emailUtils";


const MAX_RESEND_ATTEMPTS = parseInt(process.env.MAX_RESEND_ATTEMPTS || "5", 10);
const RESET_ATTEMPT_TIME = parseInt(process.env.RESET_ATTEMPT_TIME || (1 * 60 * 60 * 1000).toString(), 10);


export const POST = async (req) => {
  try {
    const { email, role: requestedRole } = await req.json();

    if (!email || !requestedRole) {
      return NextResponse.json(
        { error: "Email and role are required." },
        { status: 400 }
      );
    }

    await connectToDb();

    // Check for the user in both collections
    const member = await ChurchMember.findOne({ email });
    const admin = await ChurchAdmin.findOne({ email });

    if (!member && !admin) {
      return NextResponse.json(
        { error: "No account found with this email address." },
        { status: 404 }
      );
    }

    // Determine actual role
    const user = member || admin;
    const actualRole = member ? "member" : "admin";

    // Prevent mismatched role access
    if (requestedRole !== actualRole) {
      return NextResponse.json(
        { error: "Invalid role access. Please use the correct verification page." },
        { status: 403 }
      );
    }

    // Prevent resending OTP if email is already verified
    if (user.isEmailVerified) {
      return NextResponse.json(
        { error: "Email already verified. You can log in now." },
        { status: 400 }
      );
    }


    // ✅ Check if 24 hours have passed since last attempt
    const now = Date.now();
    if (user.lastResendAttempt && now - user.lastResendAttempt > RESET_ATTEMPT_TIME) {
      await user.updateOne({ $set: { resendAttempts: 0 } }); // Reset attempts
    }

    // ✅ Check resend attempts limit
    if (user.resendAttempts >= MAX_RESEND_ATTEMPTS) {
      return NextResponse.json(
        { error: "You have reached the maximum OTP resend attempts. Please try again later after 1 hour." },
        { status: 429 }
      );
    }

    // ✅ Generate new OTP
    const { otp } = await generateEmailVerificationOTP(email);

    await user.updateOne({
        $set: {
          emailVerificationOtp: otp,
          emailVerificationOtpExpires: new Date(now + 10 * 60 * 1000), // 10 min expiry
          lastResendAttempt: now,
        },
        $inc: { resendAttempts: 1 },
      });
      
      

    // ✅ Send OTP via email

    const verificationLink = `${process.env.NEXTAUTH_URL}/member/verify-email?email=${encodeURIComponent(email)}&role=${actualRole}`;

    await sendOtpEmail(email, otp, verificationLink);


    return NextResponse.json(
      { success: true, message: "A new OTP has been sent to your email." },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Resend OTP Error:", error.message);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
};
