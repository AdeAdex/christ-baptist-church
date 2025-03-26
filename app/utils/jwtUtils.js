// app/utils/jwtUtils.js

import { SignJWT, jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
const expiresIn = parseInt(process.env.JWT_DURATION, 10) || 86400; // Default to 1 day if undefined
const resetExpiresIn = 600; // 10 minutes in seconds

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
