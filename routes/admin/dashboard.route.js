const express = require('express')
const controller = require('../../Controllers/admin/dashboard.controller')
const router = express.Router()


router.get('/',controller.index)

router.get('/total-revenue',controller.totalRevenue)

router.get('/total-dishes',controller.totalDishes)

router.get('/total-orders',controller.totalOrders)


module.exports = router;