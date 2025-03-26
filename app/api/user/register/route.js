import { connectToDb } from "@/app/utils/database";
import ChurchUser from "@/app/models/churchMember.model";
import { hashPassword } from "@/app/utils/bcrypt";
import { sendWelcomeEmail } from "@/app/utils/emailUtils";
import { NextResponse } from "next/server";
import { welcomeMessageTemplate } from "@/app/utils/welcomeMessageTemplate";
import { generateUsername } from "@/app/utils/generateUsername";

export const POST = async (req) => {
  try {
    const { 
      firstName, lastName,  email, password, 
      gender, dateOfBirth, phoneNumber, address 
    } = await req.json();

    try {
      await connectToDb();
    } catch (error) {
      console.error("Database connection error:", error);
      return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
    }

    try {
      const existingUserWithEmail = await ChurchUser.findOne({ email });
      if (existingUserWithEmail) {
        return NextResponse.json({ message: "Email already exists" }, { status: 400 });
      }

    } catch (error) {
      console.error("Error checking existing users:", error);
      return NextResponse.json({ message: "Error checking existing users" }, { status: 500 });
    }

    let hashedPassword;
    let userName
    try {
      hashedPassword = await hashPassword(password);
      userName = await generateUsername(firstName, lastName);
    } catch (error) {
      console.error("Error hashing password:", error);
      return NextResponse.json({ message: "Error processing password" }, { status: 500 });
    }

    // Ensure username is not empty
    if (!userName) {
      return NextResponse.json({ message: "Failed to generate a unique username" }, { status: 500 });
    }

    // const logoUrl = process.env.CHRIST_BC_LOGO;
    const welcomeMessage = welcomeMessageTemplate(firstName);

    let newUser;
    try {
      newUser = await ChurchUser.create({
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
    } catch (error) {
      console.error("Error creating user:", error);
      return NextResponse.json({ message: "Error creating user" }, { status: 500 });
    }

    try {
      const welcomeMessageObj = {
        senderId: newUser._id,
        receiverId: newUser._id,
        content: welcomeMessage,
        from: "Christ Baptist Church",
        sentAt: new Date(),
        isRead: false,
      };

      await ChurchUser.findByIdAndUpdate(newUser._id, { $push: { messages: welcomeMessageObj } });
    } catch (error) {
      console.error("Error adding welcome message:", error);
      return NextResponse.json({ message: "Error adding welcome message" }, { status: 500 });
    }

    try {
      await sendWelcomeEmail(newUser.email, newUser.firstName);
    } catch (error) {
      console.error("Error sending welcome email:", error);
      return NextResponse.json({ message: "User created, but error sending welcome email" }, { status: 500 });
    }

    return NextResponse.json({ message: "Account created successfully. Please check your email." }, { status: 201 });

  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ message: "Unexpected error occurred" }, { status: 500 });
  }
};
