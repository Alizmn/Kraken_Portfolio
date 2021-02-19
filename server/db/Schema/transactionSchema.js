const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
    required: true,
    enum: ["Buy", "Sell", "Transfer", "Order"],
  },
  fiat: {
    type: String,
    minLength: 3,
    maxLength: 3,
    required: true,
  },
  crypto: {
    type: String,
    minLength: 2,
    maxLength: 4,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  baseFiat: {
    type: Object,
    required: false,
    symbol: {
      type: String,
    },
    rate: {
      type: Number,
    },
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
