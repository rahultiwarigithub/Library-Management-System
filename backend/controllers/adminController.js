const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const Admin = require('../models/adminModel');
const generateToken = require('../utils/generateToken');


/* creating a new admin */
const registerAdmin = asyncHandler(async (req, res) => {
    const { username, name, email, password, contact } = req.body;

    // basic verification for required properties
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("username, email & password fields are mandatory")
    }
    if (password.length < 6) {
        res.status(400);
        throw new Error("password size should be minimum 6 charaters")
    }

    // check if duplicate admin
    const adminAvailable = await Admin.findOne({ username });
    if (adminAvailable) {
        res.status(400);
        throw new Error("admin already registered");
    }

    // create admin entry to the database but with encrypted password
    const hashPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
        username,
        name,
        email,
        password: hashPassword,
        contact
    })
    if (admin) {
        generateToken(res, admin, 201);
    } else {
        res.status(400);
        throw new Error("admin data not valid")
    }
});

/* function to login an admin */
const loginAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400);
        throw new Error("login details not valid");
    }
    const admin = await Admin.findOne({ username }).select('+password');

    // decrypt password and generate token if valid admin
    if (admin && (await bcrypt.compare(password, admin.password))) {
        generateToken(res, admin, 200)
    } else {
        res.status(401);
        throw new Error("invalid, please provide correct credentials");
    }
});


module.exports = {
    registerAdmin,
    loginAdmin
}