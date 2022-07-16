const express = require('express')
const router = express.Router()
const UC = require('../controllers/userController')
const VAL = require('../utilities/validator')
const PASS = require('../utilities/password')

//login route
router.post('/login', VAL.username, VAL.password, VAL.validatorResult, UC.login)

//signup route
router.post('/signup', VAL.username, VAL.password, VAL.validatorResult, PASS.hash, UC.signup)

module.exports=router;