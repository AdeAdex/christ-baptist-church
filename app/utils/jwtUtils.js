// app/utils/jwtUtils.js

import { SignJWT, jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
const expiresIn = parseInt(process.env.JWT_DURATION, 10) || 86400; // Default to 1 day if undefined

// Generate JWT Token
export const generateToken = async (payload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(Math.floor(Date.now() / 1000) + expiresIn) // Expiry as a timestamp
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
