// models/User.js
import mongoose from "mongoose";

// 1. Destructure Schema and model from mongoose
const { Schema, model } = mongoose;

// 2. Define the Schema (Blueprint)
const supplySchema = new Schema(
  {
    description: {
      type: String,
      required: [true, "description is required"],
      unique: false,
      trim: true,
    },
    location: {
      type: String,
      required: [true, "location is required"],
      unique: false,
      lowercase: true,
    },
    size: {
      type: Number,
      required: true,
      minlength: 6,
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    // 3. Enable timestamps for createdAt and updatedAt
    timestamps: true,
  },
);

// 4. Create the Model and export it
const Supply = model("Supply", userSchema);
export default Supply;
