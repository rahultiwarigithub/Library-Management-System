const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({

    user_details: {
        type: Object,
        required: true
    },
    book_details: {
        type: Object,
        required: true
    },
    due_date: {
        type: Date,
        default: Date.now() + 7 * 24 * 60 * 60 * 1000
    },
    trans_type: {
        type: String,
        enum: ["borrow", "return"],
        required: true
    }
});

module.exports = mongoose.model("Transaction", TransactionSchema, "transactions");