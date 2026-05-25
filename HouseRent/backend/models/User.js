import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    role: { type: String, enum: ["owner", "tenant"], default: "tenant" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);