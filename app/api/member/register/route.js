//  /app/api/member/register/route.js

import { connectToDb } from "@/app/utils/database";
import ChurchMember from "@/app/models/churchMember.model";
import ChurchAdmin from "@/app/models/churchAdmin.model"; // Import ChurchAdmin model
import { hashPassword } from "@/app/utils/bcrypt";
import { sendWelcomeEmail } from "@/app/utils/emailUtils";
import { NextResponse } from "next/server";
import { welcomeMessageTemplate } from "@/app/utils/welcomeMessageTemplate";
import { generateUsername } from "@/app/utils/generateUsername";
import { generateEmailVerificationOTP } from "@/app/utils/jwtUtils";
import Message from "@/app/models/message.model";

export const POST = async (req) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      dateOfBirth,
      phoneNumber,
      address,
    } = await req.json();

    await connectToDb();

    // ✅ Generate username before checking uniqueness
    const userName = await generateUsername(firstName, lastName);

    // ✅ Check if email, phone, or username exists in either Member or Admin collections
    const existingUser = await Promise.all([
      ChurchMember.findOne({ $or: [{ email }, { phoneNumber }, { userName }] }),
      ChurchAdmin.findOne({ $or: [{ email }, { phoneNumber }, { userName }] }),
    ]);

    const foundUser = existingUser.find((user) => user); // Find any non-null result

    if (foundUser) {
      let message = "An account with this information already exists.";
      if (foundUser.email === email) message = "Email already exists";
      else if (foundUser.phoneNumber === phoneNumber)
        message = "Phone number already exists";
      else if (foundUser.userName === userName)
        message = "Username already exists";

      return NextResponse.json({ message }, { status: 400 });
    }

    // ✅ Check if there is at least one admin before creating the member
    const admin = await ChurchAdmin.findOne();
    if (!admin) {
      return NextResponse.json(
        { message: "No admin found to send the welcome message" },
        { status: 500 }
      );
    }

    // ✅ Hash password after validation
    const hashedPassword = await hashPassword(password);

    const { otp } = await generateEmailVerificationOTP(email);

    // console.log("Generated OTP:", otp);

    // ✅ Ensure username is not empty
    if (!userName) {
      return NextResponse.json(
        { message: "Failed to generate a unique username" },
        { status: 500 }
      );
    }

    const welcomeMessage = welcomeMessageTemplate(firstName);

    // ✅ Create new member
    const newUser = await ChurchMember.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
      gender,
      dateOfBirth,
      phoneNumber,
      address,
      messages: [],
      isEmailVerified: false,
      emailVerificationOtp: otp,
      emailVerificationOtpExpires: new Date(Date.now() + 10 * 60 * 1000),
    });

    // ✅ Save the welcome message with the admin as the sender
    const savedMessage = await Message.create({
      senderId: admin._id,
      receiverId: newUser._id,
      senderModel: "ChurchAdmin",
      receiverModel: "ChurchMember",
      content: welcomeMessage,
      from: "Christ Baptist Church",
      sentAt: new Date(),
      isRead: false,
    });

    // ✅ Add the saved message's _id to the new user's messages array
    await ChurchMember.findByIdAndUpdate(newUser._id, {
      $push: { messages: savedMessage._id },
    });

    // ✅ Generate verification link
    const verificationLink = `${process.env.NEXTAUTH_URL}/member/verify-email?email=${encodeURIComponent(email)}&role=member`;

    // ✅ Send welcome email
    await sendWelcomeEmail(
      newUser.email,
      newUser.firstName,
      otp,
      verificationLink
    );

    return NextResponse.json(
      { message: "Account created successfully. Please check your email." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { message: "Unexpected error occurred" },
      { status: 500 }
    );
  }
};
