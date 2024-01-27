const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company : {
        type: String,
        maxLength : 50,
        required : [true, 'company name is required']
    },
    position : {
        type: String,
        maxLength : 100,
        required : [true, 'position name is required']
    },
    status : {
        type: String,
        enum: ['interview' ,'declined' , 'pending'],
        default: 'pending'
    },
    createdBy : {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required : [true, 'Please provide a user']
    }
}, {timestamps: true})


module.exports = mongoose.model('Job', JobSchema)