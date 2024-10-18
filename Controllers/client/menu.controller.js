const Dish = require("../../models/dish.model")




const index = async (req, res) => {
    let find = {
        deleted : false,
    }
    // Search dishes
    if(req.query.keyword){
        const keyword = req.query.keyword
        const regex = new RegExp(keyword, "i")
        find.name = regex
    }





    const dishes = await Dish.find(find)
    res.status(200).json({
        message : "Success!",
        data : dishes
    })

}

module.exports = {
    index,
}