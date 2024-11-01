const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const User = require('../../models/user.model')
const Cart = require('../../models/cart.model')


dotenv.config();

const generateHelper = require('../../helpers/generateHelper')


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
            error : error.message
        })
    } 
}
const getUser = async (req, res) => {
    try {
        const id = req.user.id

        const user = await User.findOne({
            _id : id,
            deleted : false
        }).select("fullname email phone address role token")
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại.' });
        }

        res.status(200).json({
            message : "Thông tin user!",
            user : user,
        })
    } catch (error) {
        res.status(400).json({
            message : "Error!",
            error : error.message
        })
    } 
    
}
const register = async (req, res) => {
    try {
        const { fullname, email, phone, password, address} = req.body;


        const existEmail = await User.findOne({
            email : req.body.email,
            deleted : false
        })
        if(existEmail) {
            return res.status(400).json({ message: 'Email đã được sử dụng.' });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const newUser = new User({
            fullname,
            email,
            phone,
            password : hashedPassword,
            address
        })
        // Create JWT token
        const token = jwt.sign(
            { 
                id: newUser.id,
                fullname: newUser.fullname,
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );
        // Save MongoDB
        newUser.token = token;
        await newUser.save();
        // Set cookie
        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,  
            secure: true     
        });
        // Đăng ký thành công thì tạo cart cho user
        const cart = new Cart({
            user_id : newUser._id,
            dishes : [],
        })
        await cart.save()
        res.cookie("cart_id", cart.id , {
            expires : new Date(Date.now() + 1000 * 60 * 60 * 24),
        });


        res.status(201).json({
            message: 'Đăng ký thành công!',
            user: {
                fullName: newUser.fullname,
                email: newUser.email,
                role : newUser.role
            },
            cart : cart,
            token
        });


    } catch (error) {
        res.status(500).json({
            message : "Đăng ký thất bại!",
            error : error.message
        })
    } 
}
const login = async (req, res) => {
    const {email, password} = req.body;


    // Check email
    const user = await User.findOne({
        email: email,
        deleted: false
    })
    if(!user) {
        return res.status(400).json({ message: 'Email đăng nhập không chính xác.' });
    }
    // Check Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Sai mật khẩu.' });
    }
    // Create JWT token
    const token = jwt.sign(
        { 
            id: user.id,
            fullname: user.fullname,
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
    );
    // Lưu lại token vào moongoDB
    user.token = token;
    await user.save();
    
    res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,  // ngăn JavaScript truy cập cookie này
        secure: true     // yêu cầu HTTPS
    });

    // Sau khi người dùng đăng nhập thành công tạo CartID cho khách hàng
    let cart = {};
    const userCart = await Cart.findOne({
        customer_id : user._id
    })
    // Kiểm tra xem khách hàng có giỏ hàng đó chưa
    if(!userCart) {
        cart = new Cart({
            customer_id : user._id,  // Lưu id của khách hàng vào cart
            dishes : [],
            totalAmount : 0,
        });
        await cart.save();
    } else {
        cart = userCart
    }
    res.cookie("cart_id", cart.id , {
        expires : new Date(Date.now() + 1000 * 60 * 60 * 24),
    });


    res.status(200).json({
        message : "Đăng nhập thành công!",
        user : user.fullname,
        token : user.token,
        cart : cart
    })

}
const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const updateIn4 = req.body

        const data = await User.updateOne({
            _id : id
        }, {
            $set : updateIn4
        })
        const updatedUser = await User.findOne({ _id: id }).select("-password");
        res.status(200).json({
            message : "Cập nhật thông tin thành công!",
            user : updatedUser
        })
    } catch (error) {
        res.status(500).json({
            message : "Error!",
            error : error.message
        })
    } 
}
const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.clearCookie("cart_id");
        res.status(200).json({
            message : "Đăng xuất thành công!",
        })
    } catch (error) {
        res.status(400).json({
            message : "Error!",
            error : error.message
        })
    } 
}

module.exports = {
    getUser,
    getUsers,
    register,
    login,
    updateUser,
    logout,
}