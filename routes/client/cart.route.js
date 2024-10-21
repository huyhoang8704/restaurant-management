const express = require('express')
const controller = require('../../Controllers/client/cart.controller')
const router = express.Router()


router.get('/',controller.index)

router.post('/add',controller.addToCart)

module.exports = router;