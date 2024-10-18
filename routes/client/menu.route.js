const express = require('express')
const controller = require('../../Controllers/client/menu.controller')
const router = express.Router()


router.get('/',controller.index)


module.exports = router;