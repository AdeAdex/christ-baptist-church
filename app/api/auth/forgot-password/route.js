import { connectToDb } from "@/app/utils/database";
import ChurchMember from "@/app/models/churchMember.model";
import ChurchAdmin from "@/app/models/churchAdmin.model";
import { NextResponse } from "next/server";
import { sendResetPasswordEmail } from "@/app/utils/emailUtils";
import { generateResetToken } from "@/app/utils/jwtUtils";

export const POST = async (req) => {
  try {
    const { email, role: requestedRole } = await req.json();

    if (!email || !requestedRole) {
      return NextResponse.json(
        { message: "Email and role are required to reset the password." },
        { status: 400 }
      );
    }

    await connectToDb();

    // Check both collections to find the user
    const member = await ChurchMember.findOne({ email });
    const admin = await ChurchAdmin.findOne({ email });

    if (!member && !admin) {
      return NextResponse.json(
        { message: "No account found with this email address." },
        { status: 404 }
      );
    }

    // Determine the role based on where the user was found
    const user = member || admin;
    const actualRole = member ? "member" : "admin";

    // 🚨 Prevent mismatched roles
    if (requestedRole !== actualRole) {
      return NextResponse.json(
        { message: "Invalid role access. Please use the correct reset password page." },
        { status: 403 }
      );
    }

    // 🚨 Prevent social login users from resetting their password
    if (user.socialId) {
      return NextResponse.json(
        { message: "This account was created using social login. Please reset your password through your social provider." },
        { status: 403 }
      );
    }


     // 🚨 Check email verification for social logins
     if (!user.isEmailVerified) {
      return NextResponse.json(
        { message: "Your email is not verified. Please check your inbox to verify your email." },
        { status: 403 }
      );
    }


    // Generate reset password token using JWT
    const resetTokenPayload = { email: user.email, role: actualRole };
    const resetToken = await generateResetToken(resetTokenPayload);
    

    // Store reset token in the database
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiration
    await user.save();

    // Generate reset password link with role parameter
    const resetLink = `${process.env.NEXTAUTH_URL}/${actualRole}/reset-password?role=${actualRole}&token=${resetToken}`;

    // Send reset password email
    await sendResetPasswordEmail(user.email, resetLink, user.userName);

    return NextResponse.json(
      { message: "A reset password email has been sent to your email address." },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ Forgot Password Error:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your request. Please try again later." },
      { status: 500 }
    );
  }
};
