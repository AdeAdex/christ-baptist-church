import { connectToDb } from "@/app/utils/database";
import ChurchAdmin from "@/app/models/churchAdmin.model";
import ChurchMember from "@/app/models/churchMember.model"; // Import ChurchMember model
import { hashPassword } from "@/app/utils/bcrypt";
import { NextResponse } from "next/server";
import { generateAdminUsername } from "@/app/utils/generateUsername";
import { sendWelcomeEmail } from "@/app/utils/emailUtils";
import { generateEmailVerificationOTP } from "@/app/utils/jwtUtils";
import AdminSecret from "@/app/models/adminSecret.model"; // Model to store the latest secret key

// Function to generate new secret key
const generateSecretKey = () => {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically
  const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase(); // Generate 6-character alphanumeric
  return `CBC_Admin_${currentYear}_${randomCode}`;
};

export const POST = async (req) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, secretKey } = await req.json();
    
    await connectToDb();

    // ✅ Retrieve the latest secret key from the database
    let storedSecret = await AdminSecret.findOne();

    if (!storedSecret) {
      // If no secret key exists in the database, use the one from env
      storedSecret = { key: process.env.ADMIN_SECRET_KEY };
    }

    if (secretKey !== storedSecret.key) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ✅ Generate username before checking uniqueness
    const userName = await generateAdminUsername(firstName, lastName);

    // ✅ Check if email, phone, or username exists in either Admin or Member collections
    const existingUser = await Promise.all([
      ChurchAdmin.findOne({ $or: [{ email }, { phoneNumber }, { userName }] }),
      ChurchMember.findOne({ $or: [{ email }, { phoneNumber }, { userName }] })
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

    const { otp } = await generateEmailVerificationOTP(email);

    // ✅ Create new admin
    const newAdmin = await ChurchAdmin.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber, 
      userName, 
      role: "admin",
      isActive: true,
      isEmailVerified: false,
      emailVerificationOtp: otp,
      emailVerificationOtpExpires: new Date(Date.now() + 10 * 60 * 1000),
    });

    // ✅ Generate verification link
    const verificationLink = `${process.env.NEXTAUTH_URL}/admin/verify-email?email=${encodeURIComponent(email)}&role=admin`;

    // ✅ Send welcome email with OTP
    await sendWelcomeEmail(email, firstName, otp, verificationLink).catch((err) =>
      console.error("Error sending welcome email:", err)
    );

    // ✅ Generate and store new secret key for future admins
    const newSecretKey = generateSecretKey();

    if (storedSecret._id) {
      // If a secret key exists, update it
      await AdminSecret.updateOne({}, { key: newSecretKey });
    } else {
      // If no secret key exists, create a new record
      await AdminSecret.create({ key: newSecretKey });
    }

    return NextResponse.json({
      message: "Admin registered successfully",
      user: newAdmin,
    }, { status: 201 });

  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
