const express = require('express')
const controller = require('../../Controllers/client/user.controller') 
const Otpcontroller = require('../../Controllers/client/Otp.controller')


const router = express.Router()

router.get('/list', controller.getUsers)

router.get('/detail/:id' , controller.getUser)

router.patch('/edit/:id' , controller.updateUser)

router.post('/register' , controller.register)

router.post('/login' , controller.login)

router.get('/logout', controller.logout)

router.post('/request_Otp', Otpcontroller.requestOtp)

router.post('/verify_Otp', Otpcontroller.VerifyOtpController)


module.exports = router;