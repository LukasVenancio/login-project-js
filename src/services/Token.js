const jwt = require('jsonwebtoken');

const sign = (payload) => {
    const key = process.env.SECRET_KEY
    return jwt.sign(payload, key)
}

module.exports = {
    sign
};