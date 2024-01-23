const jwt = require('jsonwebtoken');
const { createError } = require('./createError');

const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;
    // console.log('token: ', token); 
    if (!token) {
        return next(createError(401, "You are not authenticated!"))
    }
    jwt.verify(token, 'shhhhh', (err, user) => {
        if (err) {
            return next(createError(403, "Token is not valid!"))
        }
        req.user = user;
        if (user.role === 'employee' || user.role === 'admin' ||user.role === 'manager' ) {
            // console.log('user: ', user);
            return next()
        }
        return next(createError(403, "You are not authorized!"))
    });
}

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"))
    }
    jwt.verify(token, 'shhhhh', (err, user) => {
        if (err) {
            return next(createError(403, "Token is not valid!"))
        }
        req.user = user;
        if (user.role === 'admin') {
            // console.log('user: ', user);
            return next()
        }
        return next(createError(403, "You are not authorized!"))
    });
}


module.exports = { verifyUser, verifyAdmin }