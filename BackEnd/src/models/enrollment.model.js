import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    result: {
      type: String,
      enum: ["a+", "a", "a-", "b", "c", "d", "f"], // lowercase values
      lowercase: true, // ensures whatever is saved is converted to lowercase
      trim: true,
    },
    promotedToNextClass: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
