const RegisterRoutes = require('express').Router()
const { registerCitizen, getCitizens, getCitizen } = require('./RegisterController')

RegisterRoutes.post('/', (registerCitizen))
RegisterRoutes.get('/', (getCitizens))
RegisterRoutes.post('/_id', (getCitizen))

module.exports = RegisterRoutes