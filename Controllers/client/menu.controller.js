const searchHelper = require("../../helpers/searchHelper")
const Dish = require("../../models/dish.model")



const index = async (req, res) => {
    let find = {
        deleted : false,
    }
    // Search dishes
    if(req.query.keyword){
        find.name = searchHelper(req);
    }
    // Sort Dishes
    let sort = {};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
    } else {
        sort.like = "desc"
    }

    const dishes = await Dish.find(find).sort(sort)
    res.status(200).json({
        message : "Success!",
        data : dishes
    })

}
const getCategory = async (req, res) => {
    let find = {
        deleted : false,
        slugCategory : req.params.slugCategory
    }
    // Search dishes
    if(req.query.keyword){
        find.name = searchHelper(req);
    }
    // Sort Dishes
    let sort = {};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
    } else {
        sort.like = "desc"
    }
    
    const dishes = await Dish.find(find)
    res.status(200).json({
        message : "Success!",
        data : dishes
    })
}
const getDish = async (req, res) => {
    let find = {
        deleted : false,
        slug : req.params.slug
    }


    const dish = await Dish.findOne(find)
    res.status(200).json({
        message : "Success!",
        dish : dish
    })
}

module.exports = {
    index,
    getCategory,
    getDish,
}