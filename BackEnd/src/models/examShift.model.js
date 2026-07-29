import mongoose from "mongoose";

function parseTimeToMinutes(value) {
  if (!value && value !== 0) return null;
  const s = String(value).trim().toLowerCase();
  const m = s.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);
  if (!m) return null;

  let hour = parseInt(m[1], 10);
  const minute = m[2] ? parseInt(m[2], 10) : 0;
  const ampm = m[3];

  if (minute < 0 || minute > 59) return null;

  if (ampm) {
    if (hour < 1 || hour > 12) return null;
    if (hour === 12) hour = ampm === "am" ? 0 : 12;
    else hour = ampm === "pm" ? hour + 12 : hour;
  } else {
    if (hour < 0 || hour > 23) return null;
  }

  return hour * 60 + minute;
}

const examShiftSchema = new mongoose.Schema(
  {
    shiftName: {
      type: String,
      required: [true, "Shift name is required"],
      trim: true,
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
      trim: true,
      validate: {
        validator: (v) => parseTimeToMinutes(v) !== null,
        message: "Invalid start time format",
      },
    },
    endTime: {
      type: String,
      required: [true, "End time is required"],
      trim: true,
      validate: {
        validator: (v) => parseTimeToMinutes(v) !== null,
        message: "Invalid end time format",
      },
    },
  },
  { timestamps: true }
);

// ✅ Prevent next-day exams + invalid ranges
examSchema.pre("save", function (next) {
  const start = parseTimeToMinutes(this.startingTime);
  const end = parseTimeToMinutes(this.endTime);

  if (start === null || end === null) {
    return next(new Error("Invalid time format"));
  }

  if (end <= start) {
    return next(
      new Error("End time must be later than start time (same-day exams only)"),
    );
  }

  next();
});

const ExamShift = mongoose.model("ExamShift", examShiftSchema);

export default ExamShift;