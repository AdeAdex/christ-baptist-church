//  /app/api/user/register/route.js

import { connectToDb } from "@/app/utils/database";
import ChurchMember from "@/app/models/churchMember.model";
import ChurchAdmin from "@/app/models/churchAdmin.model"; // Import ChurchAdmin model
import { hashPassword } from "@/app/utils/bcrypt";
import { sendWelcomeEmail } from "@/app/utils/emailUtils";
import { NextResponse } from "next/server";
import { welcomeMessageTemplate } from "@/app/utils/welcomeMessageTemplate";
import { generateUsername } from "@/app/utils/generateUsername";

export const POST = async (req) => {
  try {
    const { 
      firstName, lastName, email, password, 
      gender, dateOfBirth, phoneNumber, address 
    } = await req.json();

    await connectToDb();

    // ✅ Generate username before checking uniqueness
    const userName = await generateUsername(firstName, lastName);

    // ✅ Check if email, phone, or username exists in either Member or Admin collections
    const existingUser = await Promise.all([
      ChurchMember.findOne({ $or: [{ email }, { phoneNumber }, { userName }] }),
      ChurchAdmin.findOne({ $or: [{ email }, { phoneNumber }, { userName }] })
    ]);

    const foundUser = existingUser.find(user => user); // Find any non-null result

    if (foundUser) {
      let message = "An account with this information already exists.";
      if (foundUser.email === email) message = "Email already exists";
      else if (foundUser.phoneNumber === phoneNumber) message = "Phone number already exists";
      else if (foundUser.userName === userName) message = "Username already exists";

      return NextResponse.json({ message }, { status: 400 });
    }

    // ✅ Hash password after validation
    const hashedPassword = await hashPassword(password);

    // ✅ Ensure username is not empty
    if (!userName) {
      return NextResponse.json({ message: "Failed to generate a unique username" }, { status: 500 });
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
      messages: []
    });

    // ✅ Add welcome message
    const welcomeMessageObj = {
      senderId: newUser._id,
      receiverId: newUser._id,
      content: welcomeMessage,
      from: "Christ Baptist Church",
      sentAt: new Date(),
      isRead: false,
    };

    await ChurchMember.findByIdAndUpdate(newUser._id, { $push: { messages: welcomeMessageObj } });

    // ✅ Send welcome email
    await sendWelcomeEmail(newUser.email, newUser.firstName);

    return NextResponse.json({ message: "Account created successfully. Please check your email." }, { status: 201 });

  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ message: "Unexpected error occurred" }, { status: 500 });
  }
};
