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

const examRoutineSchema = new mongoose.Schema(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: [true, "Exam ID is required"],
      
    },

    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: [true, "Subject ID is required"],
   
    },

    paperMarker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: [true, "Paper marker (teacher) is required"],
    },

    examDate: {
      type: Date,
      required: [true, "Exam date is required"],
      set: (value) => new Date(value),
      validate: {
        validator: (value) => !isNaN(value.getTime()),
        message: "Invalid exam date",
      },
    },

    startingTime: {
      type: String,
      required: [true, "Starting time is required"],
      trim: true,
      validate: {
        validator: (v) => parseTimeToMinutes(v) !== null,
        message: "Invalid starting time format",
      },
    },

    endTime: {
      type: String,
      required: [true, "Ending time is required"],
      trim: true,
      validate: {
        validator: (v) => parseTimeToMinutes(v) !== null,
        message: "Invalid ending time format",
      },
    },

    attachment: {
      type: String,
      trim: true,
      default: null,
      validate: {
        validator: function (value) {
          if (!value) return true;
          return /^(https?:\/\/.*\.(pdf|jpg|jpeg|png|doc|docx|ppt|pptx|xlsx|xls|txt))$/i.test(
            value,
          );
        },
        message:
          "Attachment must be a valid file URL (pdf, image, doc, ppt, xls, txt)",
      },
    },
  },
  { timestamps: true },
);s

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

export const ExamRoutine = mongoose.model("ExamRoutine", examRoutineSchema);
