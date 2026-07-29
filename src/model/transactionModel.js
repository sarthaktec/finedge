const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Food",
        "Rent",
        "Salary",
        "Shopping",
        "Travel",
        "Entertainment",
        "Healthcare",
        "Education",
        "Bills",
        "Investment",
        "Other",
      ],
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "UPI", "Card", "Bank Transfer"],
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);