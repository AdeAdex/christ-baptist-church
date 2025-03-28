//  /app/models/message.model.ts


import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  senderModel: "ChurchMember" | "ChurchAdmin"; // ✅ Add sender model
  receiverModel: "ChurchMember" | "ChurchAdmin"; // ✅ Add receiver model
  content: string;
  from?: string;
  sentAt: Date;
  isRead: boolean;
}

const MessageSchema = new Schema<IMessage>({
  senderId: { type: Schema.Types.ObjectId, refPath: "senderModel" },
  receiverId: { type: Schema.Types.ObjectId, refPath: "receiverModel" },
  senderModel: { type: String, enum: ["ChurchMember", "ChurchAdmin"] }, // ✅ Add this field
  receiverModel: { type: String, enum: ["ChurchMember", "ChurchAdmin"] }, // ✅ Add this field
  content: { type: String },
  from: { type: String },
  sentAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
});

const Message =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
