import mongoose from "mongoose";

const admitCardSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
      immutable: true,
    },

    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: [true, "Exam ID is required"],
      immutable: true,
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: [true, "Class ID is required"],
      immutable: true,
    },

    issueDate: {
      type: Date,
      required: [true, "Issue date is required"],
      default: Date.now,
      set: (value) => new Date(value),
      immutable: true,
    },

    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: [true, "Payment ID is required"],
      immutable: true,
    },

    attachment: {
      type: String,
      trim: true,
      required: [true, "Attachment is required"],
      validate: {
        validator: (value) =>
          /^(https?:\/\/.*\.(?:pdf|jpg|jpeg|png|webp))$/i.test(value),
        message: "Attachment must be a valid file URL (pdf, jpg, jpeg, png, webp)",
      },
      immutable: true,
    },
  },
  { timestamps: true }
);

export const AdmitCard = mongoose.model("AdmitCard", admitCardSchema);
