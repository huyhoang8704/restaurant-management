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

    const dishes = await Dish.find(find)
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
    const dishes = await Dish.find(find)
    res.status(200).json({
        message : "Success!",
        data : dishes
    })
}

module.exports = {
    index,
    getCategory,
}