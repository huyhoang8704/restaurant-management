const User = require('../models/user.model')



const getUsers = async (req, res) => {
    try {
        const users = await User.find({
            deleted : false
        })
        res.json({
            code : 200,
            message : "Success!",
            data : users
        })
    } catch (error) {
        res.json({
            code : 400,
            message : "Error!",
            error : error
        })
    } 
}



module.exports = {
    getUsers,
}