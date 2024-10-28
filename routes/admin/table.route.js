const express = require('express')
const controller = require('../../Controllers/admin/table.controller')
const router = express.Router()



// router.get('/detail/:slugDish', controller.getDish),
    
// router.get('/list', controller.getDishes),
    
// router.patch('/edit/:slugDish', controller.updateDish),
    
router.post('/create', controller.createTable),

// router.delete('/delete/:slugDish', controller.deleteDish)

    
    
module.exports = router;