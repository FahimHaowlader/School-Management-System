import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    feeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fee",
      required: [true, "Fee ID is required"],
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
    },
    

    paidBy: {
        id : {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "paidBy.type", // Could be admin, accountant, parent, etc.
            required: [true, "PaidBy (user) is required"],
        },
        type:{
            type : String,
            enum: ["Student","Guardian","Staff"],
            default:"Student"
        }
    },

    fine: {
      type: Number,
      min: [0, "Fine cannot be negative"],
      default: 0,
    },

   which: {
  type: Number,
  required: [true, "Fee type (which) is required"],
  min: [0, "Fee type must be at least 0"],
  max: [12, "Fee type cannot be greater than 12"], // Less than 13
},


    medium: {
      type: String,
      enum: ["cash", "bank", "mobile banking", "online", "cheque"],
      required: [true, "Payment medium is required"],
      trim: true,
    },

    transactionId: {
      type: String,
      trim: true,
      required: [true, "Transaction ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model("Payment", paymentSchema);
