const express = require('express')
const controller = require('../../Controllers/admin/dish.controller')
const router = express.Router()


// router.patch('/change-status/:status/:id',controller.changeStatus)


router.get('/detail/:slugDish', controller.getDish),
    
router.get('/list', controller.getDishes),
    
router.patch('/edit/:slugDish', controller.updateDish),
    
router.post('/create', controller.createDish),

router.delete('/delete/:slugDish', controller.deleteDish)

module.exports = router;