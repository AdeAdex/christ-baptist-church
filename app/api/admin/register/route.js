import { connectToDb } from "@/app/utils/database";
import ChurchAdmin from "@/app/models/churchAdmin.model";
import ChurchMember from "@/app/models/churchMember.model";
import { hashPassword } from "@/app/utils/bcrypt";
import { NextResponse } from "next/server";
import { generateAdminUsername } from "@/app/utils/generateUsername";
import { sendWelcomeEmail, sendSecretKeyEmail } from "@/app/utils/emailUtils";
import { generateEmailVerificationOTP } from "@/app/utils/jwtUtils";
import AdminSecret from "@/app/models/adminSecret.model";

// Function to generate new secret key
const generateSecretKey = () => {
  const currentYear = new Date().getFullYear();
  const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `CBC_Admin_${currentYear}_${randomCode}`;
};

export const POST = async (req) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, secretKey } = await req.json();
    
    await connectToDb();

    // ✅ Get the latest stored secret key
    let storedSecret = await AdminSecret.findOne();
    if (!storedSecret) {
      storedSecret = { key: process.env.ADMIN_SECRET_KEY };
    }

    if (secretKey !== storedSecret.key) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ✅ Generate username
    const userName = await generateAdminUsername(firstName, lastName);

    // ✅ Check if admin or member with the same details exists
    const existingUser = await Promise.all([
      ChurchAdmin.findOne({ $or: [{ email }, { phoneNumber }, { userName }] }),
      ChurchMember.findOne({ $or: [{ email }, { phoneNumber }, { userName }] })
    ]);

    if (existingUser.some(user => user)) {
      return NextResponse.json({ message: "An account with this information already exists." }, { status: 400 });
    }

    // ✅ Hash password
    const hashedPassword = await hashPassword(password);

    // ✅ Generate OTP for email verification
    const { otp } = await generateEmailVerificationOTP(email);

    // ✅ Determine the new admin's position
    const totalAdmins = await ChurchAdmin.countDocuments();
    const position = totalAdmins + 1; // First admin gets 1, second gets 2, etc.

    // ✅ Create new admin
    const newAdmin = await ChurchAdmin.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber, 
      userName, 
      role: "admin",
      position, // Assign position
      isActive: true,
      isEmailVerified: false,
      emailVerificationOtp: otp,
      emailVerificationOtpExpires: new Date(Date.now() + 10 * 60 * 1000),
    });

    // ✅ Generate verification link
    const verificationLink = `${process.env.NEXTAUTH_URL}/admin/verify-email?email=${encodeURIComponent(email)}&role=admin`;

    // ✅ Send welcome email with OTP
    await sendWelcomeEmail(email, firstName, otp, verificationLink).catch(err =>
      console.error("Error sending welcome email:", err)
    );

    // ✅ Generate new secret key
    const newSecretKey = generateSecretKey();

    // ✅ Update or create new secret key in the database
    if (storedSecret._id) {
      await AdminSecret.updateOne({}, { key: newSecretKey });
    } else {
      await AdminSecret.create({ key: newSecretKey });
    }

    // ✅ Get the first admin (position = 1)
    const firstAdmin = await ChurchAdmin.findOne({ position: 1 });

    // ✅ If the first admin exists, send them the new secret key
    if (firstAdmin) {
      await sendSecretKeyEmail(firstAdmin.email, newSecretKey);
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
