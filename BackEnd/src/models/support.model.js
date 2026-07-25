import mongoose from "mongoose";

const supportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Support name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [30, "Name cannot exceed 30 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [100, "Description cannot exceed 100 characters"],
    },
    officialTime: {
      type: Number,
      required: [true, "Official time is required"],
      trim: true,
      min: [0, "Official time must be at least 0"],
      max: [23, "Official time cannot exceed 23"],
    },
    officeDesk: {
      type: String,
      required: [true, "Office desk is required"],
      trim: true,
      minlength: [3, "Office desk must be at least 3 characters"],
      maxlength: [30, "Office desk cannot exceed 30 characters"],
    },

    contactPerson: {
      type: String,
      required: [true, "Contact person is required"],
      trim: true,
      minlength: [3, "Contact person must be at least 3 characters"],
      maxlength: [40, "Contact person cannot exceed 40 characters"],
    },

    officialPhone: {
      type: String,
      required: [true, "Official phone number is required"],
      trim: true,
      match: [
        /^\+?[1-9]\d{1,14}$/,
        "Please fill a valid international phone number",
      ],
    },
    
    officialEmail: {
      type: String,
      required: [true, "Official email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      maxlength: [50, "Email cannot exceed 50 characters"],
    },
    isApproved: {
      type: Boolean,
      default: null,
    },
    userType: {
      type: String,
      enum: ["teacher", "staff", "guardian", "student", "all"],
      required: [true, "For whom is required"],
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const Support = mongoose.model("Support", supportSchema);

export default Support;