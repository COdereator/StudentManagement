const express = require('express')
const { postRegister, postLogin } = require('../controller/authController.js')

const authRouter = express.Router()

authRouter.post('/register', postRegister)

authRouter.post('/login', postLogin)

module.exports = authRouter