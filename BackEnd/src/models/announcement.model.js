import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Announcement title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
      immutable: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      immutable: true,
    },

    attachment: {
      type: String,
      trim: true,
      default: null,
    },

    isApproved: {
      type: Boolean,
      default: null,
    },

    category: {
      type: String,
      enum: ["general", "academic", "event", "other"],
      required: [true, "Category is required"],
      immutable: true,
    },

    createdBy: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Creator ID is required"],
        refPath: "createdBy.type",
        immutable: true,
      },
      type: {
        type: String,
        enum: ["Staff", "Teacher", "Admin"],
        required: [true, "Creator type is required"],
        immutable: true,
      },
    },

    audience: {
      type: [
        {
          type: String,
          enum: ["all", "teacher", "staff", "guardian"],
          trim: true,
          lowercase: true,
        },
      ],
      required: [true, "At least one audience group is required"],
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "At least one audience group must be specified.",
      },
    },
  },
  { timestamps: true }
);

export const Announcement = mongoose.model("Announcement", announcementSchema);
