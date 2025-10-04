import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      lowercase: true,
      minlength: 3,
      maxlength: 30,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      lowercase: true,
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
  required: [true, "Assignment code is required"],
  trim: true,
  validate: {
    validator: function (value) {
      // Must be exactly 13 digits
      if (!/^\d{13}$/.test(value)) return false;

      const first4 = parseInt(value.slice(0, 4), 10);   // first 4 digits
      const fifth = parseInt(value[4], 10);            // 5th digit
      const sixthSeventh = parseInt(value.slice(5, 7), 10); // 6th & 7th digits
      const eleventh = parseInt(value[10], 10);        // 11th digit

      if (first4 <= 2025) return false;               // first 4 > 2025
      if (fifth >= 3) return false;                   // 5th < 3
      if (sixthSeventh >= 13) return false;          // 6th & 7th < 13
      if (eleventh >= 3) return false;               // 11th < 3
      return true;
    },
    message: "Assignment code is invalid. Must follow the 13-digit format with segment rules."
  }
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
      trim: true,
      lowercase: true,
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
