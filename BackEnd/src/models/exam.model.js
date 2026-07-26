import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    examName: {
      type: String,
      enum: {
        values: [
          "classtest-1",
          "final-1",
          "classtest-2",
          "final-2",
          "classtest-3",
          "final-3",
          "quiz",
        ],
        message: "{VALUE} is not a valid exam name",
      },
      required: [true, "Exam name is required"],
      lowercase: true,
      trim: true,
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: [true, "Class ID is required"],
      immutable: true,
    },

    marks: {
      type: Number,
      required: [true, "Marks are required"],
      min: [1, "Marks must be at least 1"],
      max: [100, "Marks cannot exceed 100"],
    },
  },
  { timestamps: true }
);

// 🛑 Application-level unique check before saving (No DB index)
examSchema.pre("save", async function (next) {
  // Only run check if classId or examName are modified (or on initial creation)
  if (this.isModified("classId") || this.isModified("examName")) {
    const existingExam = await this.constructor.findOne({
      classId: this.classId,
      examName: this.examName,
      _id: { $ne: this._id }, // Exclude current document during updates
    });

    if (existingExam) {
      const error = new Error(
        `An exam named '${this.examName}' already exists for this class.`
      );
      error.statusCode = 409;
      return next(error);
    }
  }
  next();
});

export const Exam = mongoose.model("Exam", examSchema);