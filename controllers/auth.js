
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')
const jwt = require('jsonwebtoken')

const register = async (req,res) => {

    const user = await  User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user : {name:  user.getName()},token})
}

const login = async (req,res) => {
    const {email,password} = req.body
    if(!email || !password || email == null || password == null){
        throw new BadRequestError("provide email and password")
    }
    const user = await User.findOne({ email })
    if(!user || user == null){
        throw new UnauthenticatedError("invalid credentials")
    }
    
    const isPasswordCorrect = await user.comparePasswords(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError("invalid passwordss")
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user : {name: user.getName()}, token})

}

module.exports = { register, login}