import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 3,
      maxlength: 30,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: 3,
      maxlength: 200,
      trim: true,
    },
    routineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Routine",
      required: [true, "Routine ID is required"],
    },
    assignmentCode: {
      type: String,
      unique: true,  // auto-generated year+shift+class+section+subject+paper+assignNo
      required: [true, "Assignment code is required"],
      lowercase: true,
      trim: true,
    },
    submissionDate: {
      type: Date,
      required: [true, "Submission date is required"],
      validate: {
        validator: function (value) {
          return value > new Date();
        },
        message: "Submission date must be in the future",
      },
    },
    mark: {
      type: Number,
      required: [true, "Mark is required"],
      min: 10,
      max: 100,
    },
    attachment: {
      type: String, // Could be URL to uploaded file (PDF, image, etc.)
      default: null,
    }
  },
  { timestamps: true }
);

// 🔹 Auto-generate assignmentCode before save
// assignmentSchema.pre("save", async function (next) {
//   if (!this.assignmentCode) {
//     // Example code pattern: title-short + timestamp
//     this.assignmentCode = `${this.title.slice(0, 5)}-${Date.now()}`.toLowerCase();
//   }
//   next();
// });

export const Assignment = mongoose.model("Assignment", assignmentSchema);
