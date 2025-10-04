import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Holiday name is required"],
      trim: true,
      minlength: [3, "Holiday name must be at least 3 characters"],
      maxlength: [50, "Holiday name cannot exceed 50 characters"],
    },

    startingDate: {
      type: Date,
      required: [true, "Starting date is required"],
      set: (value) => new Date(value),
      validate: {
        validator: (value) => !isNaN(value.getTime()),
        message: "Invalid starting date format",
      },
    },

    endingDate: {
      type: Date,
      set: (value) => (value ? new Date(value) : null),
      validate: {
        validator: function (value) {
          if (!value) return true; // allow null
          return (
            !isNaN(value.getTime()) &&
            this.startingDate &&
            value >= this.startingDate
          );
        },
        message: "Ending date must be on or after the starting date",
      },
    },

    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description cannot exceed 200 characters"],
      default: null,
    },

    type: {
      type: String,
      enum: ["public", "optional", "exam", "other"],
      default: "public",
      required: true,
      trim: true,
    },

    attachment: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { timestamps: true }
);

export const Holiday = mongoose.model("Holiday", holidaySchema);
