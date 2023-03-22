const mongoose = require('mongoose');
const validator = require('validator');

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Please enter your username"]
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter your email address"],
        validate: [validator.isEmail, 'Invalid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: 6,
        select: false
    },
    contact: {
        type: String,
        minlength: 10
    }
});

module.exports = mongoose.model("Admin", AdminSchema, "admin");

