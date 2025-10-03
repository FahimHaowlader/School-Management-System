import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
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
      enum: ["A+", "A", "A-", "B", "C", "D", "F"],
    },
    promotedToNextClass: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
