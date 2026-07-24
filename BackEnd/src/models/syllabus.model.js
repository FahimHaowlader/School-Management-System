import mongoose from "mongoose";

const syllabusSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: [true, "Class reference is required"],
    },

    subjectId: {
      type: mongoose.Schema.Types.ObjectId,   // care here about the teacher
      ref: "Subject",
      required: [true, "Subject reference is required"], 
    },
    teacherId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Teacher",
       required: [true, "Teacher ID is required"],
     },
     madeBy: {
  type: mongoose.Schema.Types.ObjectId,
  required: [true, "Creator ID is required"],
  refPath: "madeByModel", // Dynamically inspects the 'madeByModel' field on the document
},

     madeByModel: {
  type: String,
  required: [true, "Creator model type is required"],
  enum: {
    values: ["Staff", "Teacher"],
    message: "madeByModel must be either 'Staff' or 'Teacher'",
  },
},

    isApproved: {
      type: Boolean,
      default: null,
    },

    attachment: {
    type: String,
  required: [true, "Attachment PDF file path is required"],
  trim: true,
  validate: {
    validator: function (val) {
      // Optional: Ensures the string ends with .pdf (case-insensitive)
      return typeof val === "string" && val.toLowerCase().endsWith(".pdf");
    },
    message: "Attachment must be a valid PDF file path or URL",
  },
},
  },
  { timestamps: true }
);

export const Syllabus = mongoose.model("Syllabus", syllabusSchema);
