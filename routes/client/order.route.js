const express = require('express')
const controller = require('../../Controllers/client/order.controller')
const router = express.Router() 

router.post('/',controller.createOrder)


module.exports = router;