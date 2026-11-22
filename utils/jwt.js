const jwt = require('jsonwebtoken');

const createToken = (user) => {
    const payload = {
        userId: user._id
    };

    return jwt.sign(payload,process.env.JWT_SECRET);

};

module.exports = { createToken };