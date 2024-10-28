const express = require('express')
const router = express.Router() 
const tableBookingcontroller = require('../../Controllers/admin/tableBooking.controller')


router.get('/getalltableBookings', tableBookingcontroller.getallBookings)


module.exports = router;