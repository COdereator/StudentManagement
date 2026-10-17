const express = require('express')
const cors = require('cors')
const authRouter = require('./router/authRouter.js')
const connectDB = require('./cofig/connectDB.js')
const app = express()
require('dotenv').config({ quite: true })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('best')
})

app.use('/auth', authRouter)

connectDB().then(() => {
    app.listen(5000, () => {
        console.log('server is listening')
    })
})