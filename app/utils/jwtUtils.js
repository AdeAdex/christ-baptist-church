// app/utils/jwtUtils.js

import { SignJWT, jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
const expiresIn = parseInt(process.env.JWT_DURATION, 10) || 86400; // Default to 1 day if undefined
const resetExpiresIn = 600; // 10 minutes in seconds
const otpExpiresIn = 600; 

// Generate JWT Token
export const generateToken = async (payload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(Math.floor(Date.now() / 1000) + expiresIn) // Expiry as a timestamp
    .sign(secretKey);
};


// Generate Reset Password Token (Expires in 3 Minutes)
export const generateResetToken = async (payload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(Math.floor(Date.now() / 1000) + resetExpiresIn) // 3-minute Expiry
    .sign(secretKey);
};

// Verify JWT Token
export const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload; // Contains decoded token data
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return null;
  }
};






// Generate Email Verification OTP Token
export const generateEmailVerificationOTP = async (email) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const token = await new SignJWT({ otp, email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(Math.floor(Date.now() / 1000) + otpExpiresIn)
      .sign(secretKey);
    
    return { otp, token }; // Return both OTP and token
  } catch (error) {
    console.error("Error generating email verification OTP:", error);
    throw error;
  }
};

// Verify Email Verification OTP Token
export const verifyEmailVerificationOTP = async (token, otp) => {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload.otp == otp ? payload : null; // Match OTP
  } catch (error) {
    console.error("OTP verification failed:", error.message);
    return null;
  }
};