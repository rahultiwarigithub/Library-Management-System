const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
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
    contact: {
        type: String,
        minlength: 10
    }
});

module.exports = mongoose.model("User", UserSchema, "users");
