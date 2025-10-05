import mongoose from "mongoose";

const expensesSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
      minlength: [2, "Item name must be at least 2 characters"],
      maxlength: [50, "Item name cannot exceed 50 characters"],
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },

    unit: {
      type: String,
      trim: true,
      enum: ["pcs", "kg", "liters", "box", "pack", "other"],
      required: [true, "Unit is required"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    buyingDate: {
      type: Date,
      required: [true, "Buying date is required"],
      set: (value) => (value ? new Date(value) : value),
    },

    isApproved: {
      type: Boolean,
      default: false,
    },

    vendorName: {
      type: String,
      trim: true,
      minlength: [2, "Vendor name must be at least 2 characters"],
      maxlength: [50, "Vendor name cannot exceed 50 characters"],
      required: [true, "Vendor name is required"],
    },

    vendorNumber: {
      type: String,
      trim: true,
      match: [/^[0-9]{11}$/, "Vendor number must be exactly 11 digits"],
      required: [true, "Vendor number is required"],
    },

    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: [true, "Buyer ID is required"],
    },

    // verifierId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Teacher",
    //   default: null,
    // },

    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description cannot exceed 200 characters"],
    },

    attachment: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|pdf|webp|docx?))$/,
        "Invalid attachment URL",
      ],
      required: [true, "Attachment is required"],
    },
  },
  {
    timestamps: true,
  }
);

expensesSchema.pre("save", function (next) {
  if (this.buyingDate > new Date()) {
    return next(new Error("Buying date cannot be in the future"));
  }
  next();
});

export const Expenses = mongoose.model("Expenses", expensesSchema);
