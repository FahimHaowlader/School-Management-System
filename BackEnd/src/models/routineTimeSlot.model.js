import mongoose from "mongoose";


const routineTimeSlotSchema = new mongoose.Schema(
  {
    startTime: {
      type: String,
      required: [true, "Start time is required"],
      match: [/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Start time must be in HH:MM format"],
    },
    endTime: {
      type: String,
      required: [true, "End time is required"],
      match: [/^([0-1]\d|2[0-3]):([0-5]\d)$/, "End time must be in HH:MM format"],
    },
    period: {
      type: String,
      required: [true, "Period is required"],
      enum: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th","break"],
      trim: true,
    },
    shift: {
      type: String,
      required: [true, "Shift is required"],
      enum: ["morning", "day"],
      trim: true,
    },
    isApproved: {
      type: Boolean,
      default: null,
    },
  },
  { timestamps: true }
);

export const RoutineTimeSlot = mongoose.model(
  "RoutineTimeSlot",
  routineTimeSlotSchema
);  
