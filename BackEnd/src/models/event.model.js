import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      minlength: [3, "Event title must be at least 3 characters"],
      maxlength: [100, "Event title cannot exceed 100 characters"],
      immutable: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      immutable: true,
    },

    startingDate: {
      type: Date,
      required: [true, "Starting date is required"],
      set: (value) => (value ? new Date(value) : value),
      validate: [
        {
          validator: (value) => value instanceof Date && !isNaN(value.getTime()),
          message: "Invalid starting date format",
        },
        {
          validator: function (value) {
            // Skip check on updates if document is already saved and startingDate hasn't changed
            if (!this.isModified("startingDate")) return true;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return value >= today;
          },
          message: "Starting date cannot be in the past",
        },
      ],
    },

    endingDate: {
      type: Date,
      default: null,
      set: (value) => (value ? new Date(value) : null),
      validate: [
        {
          validator: function (value) {
            if (!value) return true; // allow null
            const startDate = this.startingDate || this.getUpdate()?.startingDate;
            if (!startDate) return true;
            return value >= startDate;
          },
          message: "Ending date cannot be before starting date",
        },
      ],
    },

    startingTime: {
      type: String,
      required: [true, "Starting time is required"],
      trim: true,
      validate: {
        validator: (value) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(value),
        message: "Starting time must be in HH:MM format",
      },
    },

    endingTime: {
      type: String,
      trim: true,
      default: null,
      validate: {
        validator: function (value) {
          if (!value) return true;
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
        },
        message: "Ending time must be in HH:MM format",
      },
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      maxlength: [100, "Location cannot exceed 100 characters"],
    },

    category: {
      type: String,
      enum: ["academic", "cultural", "sports", "other"],
      default: "academic",
      required: true,
      trim: true,
      lowercase: true,
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

    createdBy: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Creator ID is required"],
        refPath: "createdBy.type",
        immutable: true,
      },
      type: {
        type: String,
        enum: ["Staff", "Teacher"],
        required: [true, "Creator type is required"],
        immutable: true,
      },
    },

    pic: {
      type: String,
      required: [true, "Profile picture is required"],
      trim: true,
      match: [
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp))$/i,
        "Invalid image URL. Must end with .png, .jpg, .jpeg, or .webp",
      ],
    },

    audience: {
      type: [
        {
          type: String,
          enum: ["all", "teachers", "staff", "guardian", "students"],
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

export const Event = mongoose.model("Event", eventSchema);