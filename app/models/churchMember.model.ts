import mongoose, { Schema, Document } from "mongoose";

export interface IMessage {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  content: string;
  from?: string;
  sentAt: Date;
  isRead: boolean;
}

export interface IChurchMember extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  role: "member"; // Only "member" for this model
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
  messages: mongoose.Types.DocumentArray<IMessage>;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  senderId: { type: Schema.Types.ObjectId, ref: "ChurchMember", required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: "ChurchMember", required: true },
  content: { type: String, required: true },
  from: { type: String },
  sentAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
});

export const ChurchMemberSchema = new Schema<IChurchMember>(
  {
    firstName: { type: String, required: true, minlength: 2, maxlength: 50 },
    middleName: { type: String, maxlength: 50 },
    lastName: { type: String, required: true, minlength: 2, maxlength: 50 },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ["member"], default: "member" }, // Enforce only "member"

    gender: { type: String, enum: ["male", "female"] },
    dateOfBirth: { type: Date },
    nationality: { type: String },
    maritalStatus: { type: String, enum: ["single", "married", "divorced", "widowed"] },

    baptismDate: { type: Date },
    confirmationDate: { type: Date },
    ministry: { type: String },
    isActive: { type: Boolean, default: false },
    
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
    resetPasswordToken: { type: String, expires: "1h" },

    messages: [MessageSchema],

    createdAt: { type: Date, default: Date.now, immutable: true },
  },
  { collection: "churchmembers" } // ✅ Explicitly define collection name
);

const ChurchMember =
  mongoose.models.ChurchMember ||
  mongoose.model<IChurchMember>("ChurchMember", ChurchMemberSchema);

export default ChurchMember;
