const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

/* function to validate token for authentication */
const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {

        // parsing token from header
        token = authHeader.split(" ")[1];

        // verify given token with jsonwebtoken verify utility
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("token invalid or has expired");
            }

            // add admin property to request object
            req.admin = decoded.admindata;
            next();
        })
        if (!token){
            res.status(401);
            throw new Error("action not authorized or token is missing");
        }
    } else {
        res.status(401);
        throw new Error("please provide token for access");
    }
});

module.exports = validateToken;