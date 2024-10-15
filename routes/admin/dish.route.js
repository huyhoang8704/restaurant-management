const express = require('express')
const controller = require('../../Controllers/admin/dish.controller')
const router = express.Router()


// router.patch('/change-status/:status/:id',controller.changeStatus)
// router.delete('/delete/:id',controller.deleteItem)


router.get('/detail/:name', controller.getDish),
    
router.get('/list', controller.getDishes),
    
router.patch('/edit/:name', controller.updateDish),
    
router.post('/add', controller.addDish),

module.exports = router;