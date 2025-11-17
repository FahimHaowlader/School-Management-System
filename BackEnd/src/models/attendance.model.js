import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    // Who this attendance record belongs to
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Student", // dynamically references correct model
      immutable: true, // cannot be changed after creation
    },
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Teacher", // dynamically references correct model
      immutable: true, // cannot be changed after creation
    },
    staff_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Staff", // dynamically references correct model
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
      enum: ["present", "absent", "late", "leave", "half-day"],
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

// 🔹 Pre-update hook to ensure at least one ID is provided
attendanceSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  // Only check if any of the three IDs are being set
  const studentId = update.student_id ?? this._update?.student_id;
  const teacherId = update.teacher_id ?? this._update?.teacher_id;
  const staffId = update.staff_id ?? this._update?.staff_id;

  if (!studentId && !teacherId && !staffId) {
    return next(
      new Error(
        "At least one of student_id, teacher_id, or staff_id must be provided"
      )
    );
  }

  next();
});

// 🔹 Pre-update hook to ensure classId is provided when student_id is updated
attendanceSchema.pre("findOneAndUpdate", function (next) {
  try {
    const update = this.getUpdate();

    const studentId = update.student_id ?? this._update?.student_id;
    const classId = update.classId ?? this._update?.classId;

    if (studentId && !classId) {
      return next(
        new Error("classId is required when student_id is provided")
      );
    }

    next();
  } catch (err) {
    next(err);
  }
});


// 🔹 Pre-update hook to prevent status modification after 7 days
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
