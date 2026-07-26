import mongoose from "mongoose";

const markSchema = new mongoose.Schema(
  {
    enrollmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enrollment",
      required: true,
    },

    subjectId: {
      type: mongoose.Schema.Types.ObjectId, // careful: subject links back to teacher(s)
      ref: "Subject",
      required: true,
    },

    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    obtainedMarks: {
      type: Number,
      required: [true, "Marks obtained is required"],
      min: [0, "Marks cannot be negative"],
    },
    applyForRecheck:{
      type : Boolean,
      default : false 
    }
  },
  { timestamps: true },
);

export const Mark = mongoose.model("Mark", markSchema);
