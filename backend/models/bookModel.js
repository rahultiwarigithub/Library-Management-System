const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A book must have a name"],
        unique: true
    },
    author: {
        type: String,
        default: "anonymous"
    },
    availability_status: {
        type: String,
        enum: ["available","unavailable"],
        default: "available"
    }
});

module.exports = mongoose.model("Book", BookSchema, "books");