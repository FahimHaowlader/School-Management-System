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
      lowercase: true, // Mongoose built-in option
      trim: true,
      minlength: [3, "Subject name must be at least 3 characters"],
      maxlength: [30, "Subject name cannot exceed 30 characters"],
      set: (value) => (value ? value.toLowerCase() : value), // Ensure lowercase
    },
    subjectCode: {
      type: Number,
      required: [true, "Subject code is required"],
      validate: {
        validator: function (value) {
          // ✅ Check if it's a 3-digit number
          if (!/^\d{3}$/.test(value.toString())) return false;

          // ✅ Check that the last digit is 0, 1, or 2
          const lastDigit = parseInt(value.toString().slice(-1));
          return lastDigit <= 2;
        },
        message: "Subject code must invalid",
      },
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
