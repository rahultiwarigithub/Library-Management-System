const jwt = require('jsonwebtoken');

/* utility function to generate new token */
const generateToken = (res, admin, statusCode) => {
    try {
        const admindata = {
            username: admin.username,
            email: admin.email,
        }
        const accessToken = jwt.sign(
                { admindata },
                process.env.JWT_SECRET, 
                { expiresIn: process.env.JWT_EXPIRATION }
            );
    
        res.status(statusCode).json({
            status: 'success',
            accessToken,
            admindata
        });
    } catch (err) {
        console.error("failed to generate token, please retry!")
    }
};

module.exports = generateToken;