import mongoose from "mongoose";



const examRoutineSchema = new mongoose.Schema(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: [true, "Exam ID is required"],
      
    },

    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: [true, "Subject ID is required"],
   
    },

    paperMarker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: [true, "Paper marker (teacher) is required"],
    },

    examDate: {
      type: Date,
      required: [true, "Exam date is required"],
      set: (value) => new Date(value),
      validate: {
        validator: (value) => !isNaN(value.getTime()),
        message: "Invalid exam date",
      },
    },

    examDateShiftId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExamShift",
      required: [true, "Exam shift ID is required"],
    },

    attachment: {
      type: String,
      trim: true,
      default: null,
      validate: {
        validator: function (value) {
          if (!value) return true;
          return /^(https?:\/\/.*\.(pdf|jpg|jpeg|png|doc|docx|ppt|pptx|xlsx|xls|txt))$/i.test(
            value,
          );
        },
        message:
          "Attachment must be a valid file URL (pdf, image, doc, ppt, xls, txt)",
      },
    },
  },
  { timestamps: true },
);s



export const ExamRoutine = mongoose.model("ExamRoutine", examRoutineSchema);
