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

    attachments: {
      type: [
        {
          type: String,
          trim: true,
          required: [true, "Attachment file path is required"],
        },
      ],
      required: [true, "At least one attachment is required"],
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length > 0;
        },
        message: "Attachments array cannot be empty",
      },
    },
  },
  { timestamps: true }
);

export const Syllabus = mongoose.model("Syllabus", syllabusSchema);
