import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [2025, "Year must be 2025 or later"],
      max: [new Date().getFullYear() + 1, "Year cannot be in the future"],
    },
    class: {
      type: Number,
      required: [true, "Class is required"],
      min: [1, "Class must be between 1 and 12"],
      max: [12, "Class must be between 1 and 12"],
    },
    section: {
      type: String,
      required: [true, "Section is required"],
      trim: true,
      lowercase: true,
      enum: {
        values: ["A", "B", "C", "D"],
        message: "Section must be a single uppercase letter A-D",
      },
    },
    group: {
      type: String,
      enum: ["science", "commerce", "arts", "none"],
      default: "none",
      trim: true,
    },
    // we have to change this code base on the school
    shift: {
      type: String, 
        enum: ["day", "morning"],
       required: [true, "Shift is required"],
    },
    classTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher", // assuming you have a Teacher model
      default: null,
    },
  },
  { timestamps: true }
);

export const Class = mongoose.model("Class", classSchema);
