const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const RegisterRoutes = require('./Backend/RegisterRoutes')
const path = require('path')

const app = express()
dotenv.config()
mongoose.connect(process.env.MONGO_URI,)
    .then(() => {
        console.log(`connected to mongoDB`)
    }).catch((error) => {
        console.log(`error connecting to mongoDB`)
        console.log(error)
    })

const PORT = process.env.PORT

app.use(express.json())

app.use(cors())

app.use('/api/Citizens', RegisterRoutes)

const ___dirname1 = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(___dirname1, './frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(___dirname1, "frontend", "build", "index.html"))
    })
} else {
    app.get('/', (req, res) => {
        res.send('API is running successfully')
    })
}

app.listen(PORT, console.log(`server is running on Port ${PORT}`))