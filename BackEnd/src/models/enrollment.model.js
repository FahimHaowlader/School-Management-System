import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      immutable: true, // studentId cannot change
    },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
      immutable: true, // classId cannot change
    },
    result: {
      type: String,
      enum: ["a+", "a", "a-", "b", "c", "d", "f"],
      lowercase: true,
      trim: true,
    },
    promotedToNextClass: {
      type: Boolean,
      default: false,
    },
    present: {
      type: Number,
      default: 0,
    },
    absent: {
      type: Number,
      default: 0,
    },
      late:{
      type: Number,
      default: 0,
      },
  
  assignments: {
      type: [
        {
          assignment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assignment",
          },
          score: {
            type: Number,
            default: 0,
            min: 0,
            max: 100, // optional
          },
          isSubmitted: {
            type: Boolean,
            default: false,
          },
          submitedDate: {
            type: Date,
            default: null,
          },
          submittedDocuments: {
            type: [String], // File URLs or paths
            default: [],
          },
        },
      ],
      default: [],
    },
},
  { timestamps: true }
);

// we have to make a method the prevent that no body can modefied the hole document after one and half year it has been created all through all field will manupulite by the code only

// Middleware to prevent modifications after 1.5 years
enrollmentSchema.pre("save", function (next) {
  const now = new Date();
  const oneAndHalfYear = 1.5 * 365 * 24 * 60 * 60 * 1000; // milliseconds
  if (this.isModified() && this.createdAt && now - this.createdAt > oneAndHalfYear) {
    return next(new Error("This enrollment record is locked after 1.5 years"));
  }
  next();
});

// Also apply for update operations
enrollmentSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (!update) return next();

  this.model.findOne(this.getQuery()).then((doc) => {
    if (!doc) return next();

    const now = new Date();
    const oneAndHalfYear = 1.5 * 365 * 24 * 60 * 60 * 1000;
    if (now - doc.createdAt > oneAndHalfYear) {
      return next(new Error("Cannot modify this enrollment after 1.5 years"));
    }
    next();
  }).catch(next);
});

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
