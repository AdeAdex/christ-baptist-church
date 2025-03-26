// /app/api/forgot-pasword

import { connectToDb } from "@/app/utils/database";
import ChurchUser from "@/app/models/churchMember.model";
import { NextResponse } from "next/server";
import { sendResetPasswordEmail } from "../../../utils/emailUtils";
import { generateResetToken } from "@/app/utils/jwtUtils";

export const POST = async (req,) => {
  const { email } = await req.json();
  try {
    await connectToDb();
    const user = await ChurchUser.findOne({ email });

    if (!user) {
      console.log("We couldn't find an account associated with this email address. ");
      return NextResponse.json({ message: "We couldn't find an account associated with this email address. " }, { status: 404 });
    }

    // Generate reset password token using JWT
    const resetTokenPayload = { email: user.email };
    // console.log("resetTokenPayload", resetTokenPayload);

    const resetToken = await generateResetToken(resetTokenPayload); // ✅ Await the Promise
    // console.log("Generated Reset Token:", resetToken);

    // Store reset token in the database
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 3 minutes in milliseconds
    await user.save();
    

    // Generate reset password link here, assuming you have a route for resetting password
    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`; 


    const username = user.userName;

    // Send reset password email
    await sendResetPasswordEmail(email, resetLink, username);

    return NextResponse.json(
      { message: "Reset password email sent" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

// export const GET = async (request, response) => {
//   // Implement GET method logic here if needed
// };
