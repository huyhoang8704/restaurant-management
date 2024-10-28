const express = require('express')
const controller = require('../../Controllers/client/order.controller')
const router = express.Router() 
const tableBookingcontroller = require('../../Controllers/client/tableBooking.controller')

router.get('/',controller.index)

router.post('/createtableBooking', tableBookingcontroller.createBooking)

module.exports = router;