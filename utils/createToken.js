const jwt = require("jsonwebtoken")

const createToken = (userId) => {
    return jwt.sign(
        { id: userId }, //id de usuario
        process.env.JWT_SECRET, //secreto de jwt- env
        {expiresIn: process.env.JWT_EXPIRES_IN} //tiempo de validez tb en env
)
}

module.exports = { createToken }