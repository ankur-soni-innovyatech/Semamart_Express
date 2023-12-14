const jwt = require('jsonwebtoken')

exports.generateToken = (id) => {
    console.log("ID in generateToken: " + id)
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}