import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    // Who this attendance record belongs to
    student_id: {
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

    classId :{
      type : mongoose.Schema.Types.ObjectId,
      ref: "Class"

    }
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

attendanceSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this.getUpdate(); // fields being updated
    if (!update.status) return next(); // only check if status is being updated

    const doc = await this.model.findOne(this.getQuery()); // get the document
    if (!doc) return next();

    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    if (now - doc.createdAt.getTime() > sevenDaysInMs) {
      return next(new Error("Status cannot be modified after 7 days"));
    }

    // Optionally validate status
    const validStatuses = ["present", "absent", "late"];
    if (!validStatuses.includes(update.status)) {
      return next(new Error("Invalid status value"));
    }

    next();
  } catch (err) {
    next(err);
  }
});


export const Attendance = mongoose.model("Attendance", attendanceSchema);
