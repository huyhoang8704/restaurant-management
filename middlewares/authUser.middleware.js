




module.exports.authUser = async (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(401).json({
            message : "Người dùng chưa đăng nhập"
        })
    } else {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
    }
    next();
}