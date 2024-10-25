const express = require('express')
const controller = require('../../Controllers/client/cart.controller')
const router = express.Router()


router.get('/',controller.index)

router.post('/add',controller.addToCart)

router.post('/update/:dish_id',controller.updateCart)

module.exports = router;