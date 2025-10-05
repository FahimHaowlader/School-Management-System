import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },

    position: {
      type: String,
      enum: ["first", "second", "third", "participant"],
      default: "participant",
      trim: true,
    },

    title: {
      type: String,
      required: [true, "Achievement title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: null,
    },
  },
  { timestamps: true }
);

export const Achievement = mongoose.model("Achievement", achievementSchema);
