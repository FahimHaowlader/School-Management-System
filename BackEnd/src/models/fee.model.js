import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["tuition", "admission", "exam", "other"],
      required: [true, "Fee type is required"],
      trim: true,
      lowercase: true,
    },
    which: {
      type: String,
      enum: [
        "classtest-1", "final-1", "classtest-2", "final-2", "classtest-3", "final-3",
        "quiz", "assignment", "monthly",
        "class-1","class-2","class-3","class-4","class-5","class-6","class-7","class-8","class-9","class-10","class-11","class-12",
        "playgroup","nursery","kg"
      ],
      required: [true, "Which month/semester/year is required"],
      trim: true,
      lowercase: true,
    },
    amount: {
      type: Number,
      required: [true, "Fee amount is required"],
      min: [0, "Fee amount cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Fee amount must be a whole number",
      },
    },
  },
  { timestamps: true }
);

export const Fee = mongoose.model("Fee", feeSchema);
