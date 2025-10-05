import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    attachment: {
      type: String,
      required: [true, "Attachment is required"],
      trim: true,
      validate: {
        validator: function (value) {
          return /^https?:\/\/.*\.(?:pdf|jpg|jpeg|png|docx?)$/.test(value);
        },
        message: "Attachment must be a valid URL to a file",
      },
    },
    type: {
      type: String,
      enum: ["admitcard", "registrationcard", "marksheet", "transcript", "certificate"],
      required: [true, "Certificate type is required"],
      trim: true,
    },
    examName: {
      type: String,
      enum: ["psc", "jsc", "ssc", "hsc"],
      required: [true, "Exam name is required"],
      trim: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
    },
    isCollected: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Certificate = mongoose.model("Certificate", certificateSchema);
