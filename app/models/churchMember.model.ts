// /app/models/churchMember.model.ts
// This file contains the schema for the ChurchUser model. The ChurchUser model represents a user in the church management system. The schema defines the structure of the ChurchUser model, including the fields and their types. The model is defined using Mongoose, a MongoDB object modeling tool designed to work in an asynchronous environment. 


import mongoose, { Schema, Document } from "mongoose";

export interface IMessage {
  senderId: mongoose.Types.ObjectId; // Reference to the sender
  receiverId: mongoose.Types.ObjectId; // Reference to the receiver
  content: string;
  from?: string; // Optional field for system-generated messages
  sentAt: Date;
  isRead: boolean;
}

export interface IChurchUser extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  role: "member" | "admin";

  gender?: "male" | "female";
  dateOfBirth?: Date;
  nationality?: string;
  maritalStatus?: "single" | "married" | "divorced" | "widowed";

  baptismDate?: Date;
  confirmationDate?: Date;
  ministry?: string;
  isActive: boolean;

  phoneNumber?: string;
  profilePicture?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };

  occupation?: string;
  company?: string;

  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    tiktok?: string;
    linkedin?: string;
    youtube?: string;
  };

  emergencyContact?: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };

  membershipStartDate?: Date;
  membershipStatus?: "active" | "inactive" | "suspended";

  socialId?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;

  messages: mongoose.Types.DocumentArray<IMessage>; // Use DocumentArray for subdocuments

  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  senderId: { type: Schema.Types.ObjectId, ref: "ChurchUser", required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: "ChurchUser", required: true },
  content: { type: String, required: true },
  from: { type: String },
  sentAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
});

const ChurchUserSchema = new Schema<IChurchUser>({
  firstName: { type: String, required: true, minlength: 2, maxlength: 50 },
  middleName: { type: String, maxlength: 50 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 50 },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ["member", "admin"], default: "member" },

  gender: { type: String, enum: ["male", "female"] },
  dateOfBirth: { type: Date },
  nationality: { type: String },
  maritalStatus: { type: String, enum: ["single", "married", "divorced", "widowed"] },

  baptismDate: { type: Date },
  confirmationDate: { type: Date },
  ministry: { type: String },
  isActive: { type: Boolean, default: false },

  phoneNumber: { type: String },
  profilePicture: { type: String },

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

  membershipStartDate: { type: Date },
  membershipStatus: { type: String, enum: ["active", "inactive", "suspended"], default: "active" },

  socialId: { type: String, default: "" },
  resetPasswordToken: { type: String, expires: '1h' },

  messages: [MessageSchema],

  createdAt: { type: Date, default: Date.now, immutable: true },
});

const ChurchUser =
  mongoose.models.ChurchUser || mongoose.model<IChurchUser>("ChurchUser", ChurchUserSchema);

export default ChurchUser;
