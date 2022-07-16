const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
//this allows the app to read from .env files.
require('dotenv').config()
const userRoutes = require('./routes/userRoutes.js')

app.use(cors())
app.use(bodyParser.json())

//all paths of '/user'
app.use('/user', userRoutes)

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})
