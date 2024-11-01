const express = require('express')
const router = express.Router() 
const tableBookingcontroller = require('../../Controllers/admin/tableBooking.controller')


router.get('/list', tableBookingcontroller.getallBookings)


module.exports = router;