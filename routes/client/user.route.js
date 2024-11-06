const express = require('express')
const controller = require('../../Controllers/client/user.controller') 
const Otpcontroller = require('../../Controllers/client/Otp.controller')

const authenticateToken = require('../../middlewares/authUser.middleware')


const router = express.Router()

router.get('/list', controller.getUsers)

router.get('/detail' ,authenticateToken, controller.getUser)

router.patch('/edit/:id' ,authenticateToken ,controller.updateUser)

router.post('/register' , controller.register)

router.post('/login' , controller.login)

router.get('/logout',authenticateToken, controller.logout)

router.post('/request_Otp',authenticateToken, Otpcontroller.requestOtp)

router.post('/verify_Otp',authenticateToken ,Otpcontroller.VerifyOtpController)


module.exports = router;