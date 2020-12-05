const jwt = require('jsonwebtoken')
require('dotenv').config()


exports.createAccesToken = user => {
    return jwt.sign(user, process.env.SECRET_ACCES_TOKEN, { expiresIn: '50m' })
}

exports.createRefreshToken = user => {
    return jwt.sign(user, process.env.SECRET_REFRESH_TOKEN, { expiresIn: '30d' })
}
