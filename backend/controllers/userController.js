const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


/* function to create a user */
const registerUser = asyncHandler(async (req, res) => {

    const { username, name, email, contact } = req.body;
    if (!username || !email) {
        res.status(400);
        throw new Error("username & email fields are mandatory");
    }
    
    // check if the user already exists
    const userAvailable = await User.findOne({ username });
    if (userAvailable) {
        res.status(400);
        throw new Error("user already registered");
    }

    // create new user
    const user = await User.create({
        username,
        name,
        email,
        contact
    });
    if (user) {
        res.status(201).json(user);
    } else {
        res.status(400);
        throw new Error("user data not valid");
    }
});


module.exports = {
    registerUser,
}