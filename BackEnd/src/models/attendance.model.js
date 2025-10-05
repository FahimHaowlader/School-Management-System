import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    // Who this attendance record belongs to
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"Student", // dynamically references correct model
      immutable: true, // cannot be changed after creation
    },
  

    // Attendance date
    date: {
      type: Date,
      required: [true, "Date is required"],
      set: (value) => new Date(value),
      validate: {
        validator: (value) => !isNaN(value.getTime()),
        message: "Invalid date format",
      },
      immutable: true,
    },

    // Status of attendance
    status: {
      type: String,
      enum: ["present", "absent", "late",],
      default: "present",
      required: true,
      trim: true,
    },

    // Who recorded this attendance
    recordedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref :"Teacher",
        immutable: true,
    },
  },
  { timestamps: true }
);

// 🔹 Pre-save hook to prevent status modification after 7 days
attendanceSchema.pre("save", function (next) {
  if (!this.isModified("status")) return next();

  if (!this.isNew) {
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    const createdTime = this.createdAt.getTime();

    if (now - createdTime > sevenDaysInMs) {
      const err = new Error("Status cannot be modified after 7 days");
      return next(err);
    }
  }

  next();
});

export const Attendance = mongoose.model("Attendance", attendanceSchema);
