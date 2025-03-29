import mongoose from "mongoose";

const AdminSecretSchema = new mongoose.Schema({
  key: { type: String, required: true },
});

export default mongoose.models.AdminSecret || mongoose.model("AdminSecret", AdminSecretSchema);
