//  /app/types/user/index.ts


import { Types } from "mongoose";

export interface IMessage {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  content: string;
  from?: string;
  sentAt: Date;
  isRead: boolean;
}

export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

export interface ISocialMedia {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  tiktok?: string;
  linkedin?: string;
  youtube?: string;
}

export interface IEmergencyContact {
  name: string;
  relationship: string;
  phoneNumber: string;
}

export interface IChurchMember {
  _id?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  userName?: string;
  email: string;
  password?: string;
  role?: "member" | "admin";

  gender?: "male" | "female";
  dateOfBirth?: Date;
  nationality?: string;
  maritalStatus?: "single" | "married" | "divorced" | "widowed";

  baptismDate?: Date;
  confirmationDate?: Date;
  ministry?: string;
  isActive?: boolean;

  phoneNumber?: string;
  profilePicture?: string;
  address?: IAddress;

  occupation?: string;
  company?: string;
  socialMedia?: ISocialMedia;
  emergencyContact?: IEmergencyContact;

  membershipStartDate?: Date;
  membershipStatus?: "active" | "inactive" | "suspended";

  socialId?: string;
  resetPasswordToken?: string;
  messages?: IMessage[];

  createdAt?: Date;
}
