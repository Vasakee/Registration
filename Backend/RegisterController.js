const Register = require('./RegisterModel')
const expressAsyncHandler = require('express-async-handler')

const registerCitizen = expressAsyncHandler(async (req, res) => {
    const { firstName, lastName, middleName, phoneNumber,
        dateOfBirth, email, stateOfOrigin, localGov } = req.body

    if (!firstName || !lastName || !middleName || !phoneNumber
        || !email || !stateOfOrigin || !localGov || !dateOfBirth) {
        res.status(400);
        throw new Error('Please fill all fields')
    }

    const citizenExists = await Register.findOne({ email, phoneNumber })

    if (citizenExists) {
        res.status(400)
        throw new Error('Citizen already exists')
    }

    const citizen = await Register.create({
        firstName, lastName, middleName, phoneNumber,
        email, stateOfOrigin, localGov, dateOfBirth
    })

    if (citizen) {
        res.status(201).json({
            _id: citizen._id,
            firstName: citizen.firstName,
            lastName: citizen.lastName,
            middleName: citizen.middleName,
            phoneNumber: citizen.phoneNumber,
            email: citizen.email,
            stateOfOrigin: citizen.stateOfOrigin,
            localGov: citizen.localGov,
            dateOfBirth: citizen.dateOfBirth
        })
    } else {
        res.status(400)
        throw new Error('Failed to register citizen')
    }
})

const getCitizens = expressAsyncHandler(async (req, res) => {
    try {
        const Candidates = await Register.find();
        res.status(200).json(Candidates)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const getCitizen = expressAsyncHandler(async (req, res) => {
    const { _id } = req.body
    try {
        const Candidate = await Register.findById({ _id })
        if (Candidate) {
            res.status(200).json({
                _id: Candidate._id,
                firstName: Candidate.firstName,
                lastName: Candidate.lastName,
                middleName: Candidate.middleName,
                phoneNumber: Candidate.phoneNumber,
                email: Candidate.email,
                stateOfOrigin: Candidate.stateOfOrigin,
                localGov: Candidate.localGov,
                dateOfBirth: Candidate.dateOfBirth
            })
        } else {
            res.status(404);
            throw new Error('Citizen not found')
        }
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

module.exports = { registerCitizen, getCitizens, getCitizen }