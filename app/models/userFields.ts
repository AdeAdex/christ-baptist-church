// /app/models/userFields.ts


// import { Schema } from "mongoose";


export const userFields = {
  firstName: { type: String, required: true, minlength: 2, maxlength: 50 },
  middleName: { type: String, maxlength: 50 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 50 },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String },

  gender: { type: String, enum: ["male", "female"] },
  dateOfBirth: { type: Date },
  nationality: { type: String },
  maritalStatus: { type: String, enum: ["single", "married", "divorced", "widowed"] },

  profilePicture: { type: String },
  isActive: { type: Boolean, default: false },

  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipCode: { type: String },
  },

  occupation: { type: String },
  company: { type: String },

  socialMedia: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    tiktok: { type: String },
    linkedin: { type: String },
    youtube: { type: String },
  },

  emergencyContact: {
    name: { type: String },
    relationship: { type: String },
    phoneNumber: { type: String },
  },

  baptismDate: { type: Date },
  confirmationDate: { type: Date },
  ministry: { type: String },
  membershipStartDate: { type: Date },
  membershipStatus: { type: String, enum: ["active", "inactive", "suspended"], default: "active" },

  resetPasswordToken: { type: String, expires: "10m" },

  isEmailVerified: { type: Boolean, required: true, default: false }, 
  

  emailVerificationOtp: { type: String }, 
  emailVerificationOtpExpires: { type: Date },

  resendAttempts: { type: Number, default: 0 }, 
  lastResendAttempt: { type: Date, default: null },

  permissionStatus: { 
    type: String, 
    enum: ["pending", "approved", "revoked", "banned"], 
    default: "pending",
    required: true
  },
  permissionLevel: { 
    type: String, 
    enum: ["full", "limited", "view-only", "none"], 
    default: "none",
    required: true
  },
  hasPermission: { type: Boolean, default: false, required: true },

  createdAt: { type: Date, default: Date.now, immutable: true },
};
