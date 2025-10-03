import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {    
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: [true, "Teacher ID is required"],
    },

    subjectName: {
      type: String,
      required: [true, "Subject name is required"],
      trim: true,
      set: (value) => value.toUpperCase(), // Optional: Standard formatting
    },

    subjectCode: {
      type: String,
      required: [true, "Subject code is required"],
      trim: true,
      unique: true, // Prevent duplicate codes
    },

    paper: {
      type: String,
      enum: ["1st", "2nd", "both"],
      default: "both",
      trim: true,
    },
  },
  { timestamps: true }
);




export const Subject = mongoose.model("Subject", subjectSchema);