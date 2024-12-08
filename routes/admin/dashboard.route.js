const express = require('express')
const controller = require('../../Controllers/admin/dashboard.controller')
const router = express.Router()


router.get('/',controller.index)

router.get('/total-revenue',controller.totalRevenue)



module.exports = router;