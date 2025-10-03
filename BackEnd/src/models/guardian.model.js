import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const guardianSchema = new mongoose.Schema(
  {
    guardianId: {
     guardianId: {
  type: String,
  required: [true, "Guardian ID is required"],
  unique: true,
  trim: true,
  match: [/^\d{10}$/, "Guardian ID must be exactly 10 digits"],
  validate: [
    {
      validator: function (value) {
        const firstFour = parseInt(value.slice(0, 4), 10);
        return firstFour >= 2000; // First 4 digits cannot be less than 2000
      },
      message: "Invalid Guardian ID",
    },
    {
      validator: function (value) {
        const twoDigits56 = parseInt(value.slice(4, 6), 10);
        return twoDigits56 <= 12; // 5th & 6th digits ≤ 12
      },
      message: "Invalid Guardian ID",
    },
    {
      validator: function (value) {
        const lastDigit = parseInt(value[9], 10);
        return lastDigit <= 3; // Last digit ≤ 3
      },
      message: "Invalid Guardian ",
    },
  ],
},

prefixName: {
      type: String,
      trim: true,
      minlength: [1, "Prefix must be at least 1 character"],
      maxlength: [10, "Prefix cannot exceed 10 characters"],
    },


     firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [15, "First name cannot exceed 15 characters"],
      match: [/^[A-Za-z]+$/, "First name can only contain letters"],
    },

    middleName: {
      type: String,
      required: [true, "Middle name is required"],
      trim: true,
      minlength: [2, "Middle name must be at least 2 characters"],
      maxlength: [15, "Middle name cannot exceed 15 characters"],
      match: [/^[A-Za-z]+$/, "Middle name can only contain letters"],
    },


     lastName: {
      type: String,
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [15, "Last name cannot exceed 15 characters"],
      match: [/^[A-Za-z]+$/, "Last name can only contain letters"],
    },

    
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[0-9]{11}$/, "Phone number must be exactly 11 digits"],
    },

    address: {
      type: String,
      trim: true,
      minlength: [5, "Address must be at least 5 characters"],
      maxlength: [200, "Address cannot exceed 200 characters"],
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    accountType: {
      type: String,
      enum: ["guardian"],
      default: "guardian",
      immutable: true,
      trim: true,
      required: true,

    },
    
   pic: {
      type: String,
      trim: true,
      default: null,
      set: (value) => (value === "" ? null : value), // Convert empty string to null
      match: [/^(https?:\/\/.*\.(?:png|jpg|jpeg|webp))$/, "Invalid image URL"],
      validate: {
        validator: function (value) {
          return value === null || /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp))$/.test(value);
        },
        message: "Invalid image URL",
      },
    },

    // Fixed 3 children
    children1: { type: mongoose.Schema.Types.ObjectId, ref: "Student", default: null },
    children2: { type: mongoose.Schema.Types.ObjectId, ref: "Student", default: null },
    children3: { type: mongoose.Schema.Types.ObjectId, ref: "Student", default: null },

    refreshToken: { type: String, select: false },
  },
},
  { timestamps: true }
);

// 🔹 Pre-save password hashing
guardianSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    return next(error);
  }
});

// 🔹 Compare password
guardianSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// 🔹 Generate access token
guardianSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      guardianId: this.guardianId,
      accountType: this.accountType,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// 🔹 Generate refresh token
guardianSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const Guardian = mongoose.model("Guardian", guardianSchema);
