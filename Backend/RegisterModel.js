const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RegSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    stateOfOrigin: {
        type: String,
        required: true
    },
    localGov: {
        type: String,
        required: true
    }
})
const Register = mongoose.model('Register', RegSchema)

module.exports = Register