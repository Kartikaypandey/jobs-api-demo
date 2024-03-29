require('dotenv').config();
const mognoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mognoose.Schema({
    name: {
        type:String,
        required: [true, "name is required"],
        minLength:3,
        maxLength:50
    },
    email: {
        type:String,
        required: [true, "email is required"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
})

UserSchema.pre('save' , async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password , salt)

})

UserSchema.methods.getName = function () {
    return this.name
}

UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id , name: this.name } , process.env.JWT_SECRET , {
        expiresIn: '30d'
    })
}

UserSchema.methods.comparePasswords = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword,this.password)
}

module.exports = mognoose.model('User', UserSchema)