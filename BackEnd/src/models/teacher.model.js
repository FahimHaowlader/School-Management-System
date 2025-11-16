import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



const teacherSchema  = new mongoose.Schema(
    {
        // year+number   
            teacherId: {
              type: String,
      required: [true, "Staff ID is required"],
      unique: true,
      trim: true,
      match: [/^\d{8}$/, "Staff ID must be exactly 8 digits"],
      validate: {
        validator(value) {
          const firstFour = parseInt(value.slice(0, 4), 10);
          return firstFour >= 2025;
        },
        message: "Invalid Staff ID",
      },
      immutable: true,
    },
   prefixName: {
  type: String,
  trim: true,
  lowercase: true,
  minlength: [1, "Prefix must be at least 1 character"],
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
      match: [/^[a-z]+$/, "First name can only contain letters"],
    },

    middleName: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Middle name is required"],
      minlength: [2, "Middle name must be at least 2 characters"],
      maxlength: [15, "Middle name cannot exceed 15 characters"],
      match: [/^[a-z]+$/, "Middle name can only contain letters"],
    },

    lastName: {
      type: String,
      trim: true,
      lowercase: true,
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [15, "Last name cannot exceed 15 characters"],
      match: [/^[a-z]+$/, "Last name can only contain letters"],
    },

    dateOfBirth: {
      type: Date,
      set: (value) => new Date(value),
      validate: {
        validator(value) {
          if (isNaN(value.getTime())) return false;

          const today = new Date();
          const minDate = new Date(today.getFullYear() - 80, today.getMonth(), today.getDate());
          const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

          return value >= minDate && value <= maxDate;
        },
        message: "Invalid DOB. Age must be between 18 and 80 years.",
      },
    },

    bloodGroup: {
      type: String,
      enum: ["a+", "a-", "b+", "b-", "ab+", "ab-", "o+", "o-"],
      lowercase: true,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
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

    pic: {
      type: String,
      trim: true,
      default: null,
      set: (value) => (value === "" ? null : value),
      match: [/^(https?:\/\/.*\.(?:png|jpg|jpeg|webp))$/, "Invalid image URL"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    accountType: {
          type: String,
          enum: ["teacher"],
          default: "teacher",
          immutable: true,
          trim: true,
        },
    
        gender: {
          type: String,
          enum: ["male", "female", "other"],
          required: [true, "Gender is required"],
        },
    
        joinedAt: {
          type: Date,
          required: [true, "Joining date is required"],
          set: (value) => new Date(value),
        },
    
        leavedAt: {
          type: Date,
          default: null,
          validate: {
            validator(value) {
              return !value || !this.joinedAt || value >= this.joinedAt;
            },
            message: "Leave date cannot be before joining date",
          },
        },
    
        borrowedBook: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "BookRent",
          default: null,
        },
    
        status: {
          type: String,
          enum: ["active", "inactive", "suspended", "transferred", "retired"],
          default: "active",
        },
    
        // role: {
        //   type: String,
        //   enum: ["normal", "librarian", "technician"],
        //   default: "normal",
        // },
    
        role: {
          type: String,
          enum: ["junior", "senior", "mostsenior","head-of-subject", "vice-principal","principal"],
          default: "junior",
        },
     attendance: [
      {
        date: { type: Date, required: true },
        status: {
          type: String,
          enum: ["present", "absent", "leave", "late", "half-day"],
          default: "present",
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],

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
        halfDay: { type: Number, default: 0, min: 0 },
      },
    ],

    refreshToken: {
      type: String,
      select: false,
      default: null,
    },

    },
    {
        timestamps:true
    }
    
);

// ✅ Prevent modifying attendance status after 15 days
teacherSchema.pre("save", function (next) {
  if (!this.isModified("attendance")) return next();

  const today = new Date();

  for (const record of this.attendance) {
    if (!record.isNew && record.createdAt) {
      const diffDays = (today - record.createdAt) / (1000 * 60 * 60 * 24);
      if (diffDays > 15 && this.isModified(`attendance.${record._id}.status`)) {
        return next(new Error("Attendance status cannot be modified after 15 days"));
      }
    }
  }

  next();
});

// 🔹 Generate access token
teacherSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      teacherId: this.teacherId,
      accountType: this.accountType,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// 🔹 Generate refresh token
teacherSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

// 🔹 Pre-save middleware for hashing password
teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    return next(error);
  }
});

// 🔹 Compare passwords
teacherSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const Teacher = mongoose.model("Teacher",teacherSchema)