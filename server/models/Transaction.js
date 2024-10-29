// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    date: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentType: { type: String, required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
