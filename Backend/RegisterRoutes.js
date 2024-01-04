const RegisterRoutes = require('express').Router()
const { registerCitizen, getCitizen } = require('./RegisterController')

RegisterRoutes.post('/', (registerCitizen))
RegisterRoutes.get('/', (getCitizen))

module.exports = RegisterRoutes