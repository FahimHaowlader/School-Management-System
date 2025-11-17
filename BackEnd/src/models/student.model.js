import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: [true, "Student ID is required"],
      unique: true,
      trim: true,
      match: [/^\d{9}$/, "Student ID must be exactly 9 digits"],
      validate: [
        {
          validator: function (value) {
            const firstFour = parseInt(value.slice(0, 4), 10);
            return firstFour >= 2000; // First 4 digits cannot be less than 2000
          },
          message: "Invalid Student ID",
        },
        {
          validator: function (value) {
            const twoDigits56 = parseInt(value.slice(4, 6), 10);
            return twoDigits56 <= 12; // 5th & 6th digits validation
          },
          message: "Invalid Student ID",
        },
      ],
    },

    prefixName: {
      type: String,
      trim: true,
      lowercase: true,
      minlength: [0, "Prefix must be at least 0 character"],
      maxlength: [10, "Prefix cannot exceed 10 characters"],
      validate: {
        validator: function (v) {
          // Only lowercase letters and allowed punctuation: . , : - ! ? / () and spaces
          return /^[a-z.,:!\-?/()\s]+$/.test(v);
        },
        message:
          "Prefix can only contain lowercase letters and punctuation . , : - ! ? / ()",
      },
    },

    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      lowercase: true,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [15, "First name cannot exceed 15 characters"],
      match: [/^[A-Za-z]+$/, "First name can only contain letters"],
    },

    middleName: {
      type: String,
      required: [true, "Middle name is required"],
      trim: true,
      lowercase: true,
      minlength: [2, "Middle name must be at least 2 characters"],
      maxlength: [15, "Middle name cannot exceed 15 characters"],
      match: [/^[A-Za-z]+$/, "Middle name can only contain letters"],
    },

    lastName: {
      type: String,
      trim: true,
      lowercase: true,
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [15, "Last name cannot exceed 15 characters"],
      match: [/^[A-Za-z]+$/, "Last name can only contain letters"],
    },

    dateOfBirth: {
      type: Date,
      set: (value) => new Date(value),
      require: [true, "Date of birth is required"],
      validate: {
        validator: function (value) {
          if (isNaN(value.getTime())) return false;

          const today = new Date();
          const minDate = new Date(
            today.getFullYear() - 25,
            today.getMonth(),
            today.getDate()
          ); // Max 25 years old
          const maxDate = new Date(
            today.getFullYear() - 4,
            today.getMonth(),
            today.getDate()
          ); // Min 4 years old

          return value >= minDate && value <= maxDate;
        },
        message: "Invalid DOB. Age must be between 4 and 25 years.",
      },
    },

    bloodGroup: {
      type: String,
      enum: {
        values: ["a+", "a-", "b+", "b-", "ab+", "ab-", "o+", "o-"],
        message: "Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-",
      },
      lowercase: true, // store in lowercase
      trim: true,
      default: null,
    },
    address: {
      type: String,
      trim: true,
      require: [true, "Address is required"],
      lowercase: true,
      minlength: [5, "Address must be at least 5 characters"],
      maxlength: [200, "Address cannot exceed 200 characters"],
    },

    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[0-9]{11}$/, "Phone number must be exactly 11 digits"],
    },

    mother: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guardian",
      required: true,
    },

    father: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guardian",
      required: true,
    },

    guardian: {
      guardian_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Guardian",
        required: [true, "Guardian ID is required"],
      },
      relationshipWithGuardian: {
        type: String,
        required: [true, "Relationship with guardian is required"],
        trim: true,
        lowercase: true,
        minlength: [2, "Relationship must be at least 2 characters"],
        maxlength: [30, "Relationship cannot exceed 30 characters"],
      },
      default: null,
    },

    pic: {
      type: String,
      trim: true,
      require: [true, "Profile picture is required"],
      set: (value) => (value === "" ? null : value), // Convert empty string to null
      match: [/^(https?:\/\/.*\.(?:png|jpg|jpeg|webp))$/, "Invalid image URL"],
      validate: {
        validator: function (value) {
          return (
            value === null ||
            /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp))$/.test(value)
          );
        },
        message: "Invalid image URL",
      },
    },

    scholarShip: {
      type: Number,
      default: 0,
      min: [0, "Scholarship cannot be negative"],
      max: [100, "Scholarship cannot exceed 100"],
    },

    status: {
      type: String,
      enum: ["active", "inactive", "suspended", "transferred", "passout"],
      default: "active",
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // must be explicitly selected in queries
    },

    accountType: {
      type: String,
      enum: ["student"],
      default: "student",
      immutable: true, // cannot be changed later
      trim: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
      trim: true,
    },

    admittedAt: {
      type: Date,
      required: [true, "Admission date is required"],
      set: (value) => new Date(value),
    },

    // classes: [
    //   {
    //     classId: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Class",
    //       required: true,
    //     },
    //     result: {
    //       type: String,
    //       enum: ["A+", "A", "A-", "B", "C", "D", "F"],
    //     },
    //     promotedToNextClass: {
    //       type: Boolean,
    //       default: false,
    //     },
    //   },
    // ],
    classes: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Enrollment",
          required: true,
        },
      ],
      default: [],
    },

    leavedAt: {
      type: Date,
      default: null,
      set: (value) => new Date(value),
      validate: {
        validator: function (value) {
          if (!value) return true;
          if (isNaN(value.getTime())) return false;
          return !this.admittedAt || value >= this.admittedAt;
        },
        message: "Leave date cannot be before admission date",
      },
    },
    documents: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Document",
        },
      ],
      default: [],
    },
    emergencyContact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guardian",
      required: true,
    },

    refreshToken: {
      type: String,
      select: false,
      default: null,
    },
    role: {
      type: String,
      default: "student",
    },

    attendanceSummary: [
      {
        year: {
          type: Number,
          required: true,
          min: [2025, "Year must be 2025 or later"],
          validate: {
            validator(value) {
              return value <= new Date().getFullYear();
            },
            message: "Year cannot be in the future",
          },
        },
        present: { type: Number, default: 0, min: 0 },
        absent: { type: Number, default: 0, min: 0 },
        late: { type: Number, default: 0, min: 0 },
        leave: { type: Number, default: 0, min: 0 },
        immutable: true, // cannot be changed directly
      },
    ],
    borrowedBook: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookRent",
      default: null,
    },

    libraryFine: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "BookRent",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

// 🔹 Pre-save middleware for hashing password
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    return next(error);
  }
});

// 🔹 Compare passwords
studentsSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// 🔹 Generate access token
studentSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      studentId: this.studentId,
      accountType: this.accountType,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// 🔹 Generate refresh token
studentSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

// 🔹 Validate refresh token
studentSchema.methods.validateRefreshToken = function (token) {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return decoded?._id?.toString() === this._id.toString();
  } catch (error) {
    return false;
  }
};

export const Student = mongoose.model("Student", studentSchema);
