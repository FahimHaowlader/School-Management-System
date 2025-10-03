import mongoose from "mongoose";

const routineSchema = new mongoose.Schema(
  {
    day: {
      type: String,
       enum: ["sat", "sun", "mon", "tue", "wed", "thu", "fri"],
      required: [true, "Day is required"],
      trim: true,
    },
    period: {
      type: String,
      required: [true, "Period is required"], 
      enum: ["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th"],       
      trim: true,
    },
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
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: [true, "Subject is required"],  
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: [true, "Teacher is required"],
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: [true, "Class is required"],
    },  
  },
  { timestamps: true }
);  

export const Routine = mongoose.model("Routine", routineSchema);
