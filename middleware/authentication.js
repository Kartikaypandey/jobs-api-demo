require('dotenv').config()
const {UnauthenticatedError} = require('../errors')
const jwt = require('jsonwebtoken')
const authMiddleWare = async (req,res,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('invalid token')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        req.user = { userID: payload.userId , name: payload.name}
        next()
    } catch (error) {
        throw new UnauthenticatedError('invalid token 2')
    }
}

module.exports = authMiddleWare