const User = require("../models/user.model")




module.exports.authUser = async (req, res, next) => {
    if(!req.cookies.token) {
        return res.status(401).json({
            error: "Unauthorized",
            message : "Người dùng chưa đăng nhập",

        })
    } else {
        try {
            const token = req.cookies.token;
            // console.log(token)
            const user = await User.findOne({
                token: token,
                deleted : false,
            }).select("-password")
            req.user = user
        } catch (error) {
            return res.status(403).json({ message: 'Token không hợp lệ!' });
        }
    }
    next();
}