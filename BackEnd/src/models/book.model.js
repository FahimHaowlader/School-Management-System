import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    bookId: {
      type: Number,
      required: [true, "Book ID is required"],
      unique: true,
      immutable: true,
      validate: {
        validator: (value) => /^[0-9]{6}$/.test(value.toString()),
        message: "Book ID must be exactly 6 digits",
      },
    },

    bookName: {
      type: String,
      required: [true, "Book name is required"],
      trim: true,
      minlength: [2, "Book name must be at least 2 characters long"],
      maxlength: [100, "Book name cannot exceed 100 characters"],
    },

    bookPrice: {
      type: Number,
      required: [true, "Book price is required"],
      min: [0, "Book price cannot be negative"],
    },

    buyingDate: {
      type: Date,
      required: [true, "Buying date is required"],
      default: Date.now,
      set: (value) => new Date(value),
    },

    condition: {
      type: String,
      enum: ["new", "good", "fair", "poor"],
      default: "new",
    },

    category: {
      type: String,
      enum: ["academic", "reference", "magazine", "novel", "other"],
      required: [true, "Book category is required"],
      trim: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: null,
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
