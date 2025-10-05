import mongoose from "mongoose";

const bookRentSchema = new mongoose.Schema(
  {
    issueDate: {
      type: Date,
      required: [true, "Borrow date is required"],
      default: Date.now,
      set: (value) => new Date(value),
      immutable: true,
    },

    issuedBy:{
      type : mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },

    returnDate: {
      type: Date,
      default: null,
      set: (value) => (value ? new Date(value) : null),
      validate: {
        validator: function (value) {
          if (!value) return true;
          return this.issueDate ? value >= this.issueDate : true;
        },
        message: "Return date cannot be before borrow date",
      },
    },

    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book is required"],
      immutable: true,
    },

    borrower: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Borrower ID is required"],
        refPath: "borrower.type",
        immutable: true,
      },
      type: {
        type: String,
        enum: ["Student", "Teacher", "Staff"],
        required: [true, "Borrower role is required"],
        immutable: true,
      },
    },

    fine: {
      type: Number,
      default: 0,
      min: [0, "Fine cannot be negative"],
    },

    isPaid: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const BookRent = mongoose.model("BookRent", bookRentSchema);
