const Cart = require('../../models/cart.model')
const Dish = require('../../models/dish.model')

const index = async (req, res) => {
    res.send('Trang giỏ hàng');
}
const addToCart = async (req, res) => {
    try {
        const cart_id = req.cookies.cart_id;
        const dishId = req.body.dishId;
        const quantity = parseInt(req.body.quantity);


        // Kiểm tra xem có sản phẩm đó chưa
        const cart = await Cart.findOne({
            _id : cart_id
        })
        const existDish = cart.dishes.find(item => item.dish_id == dishId)
        // Nếu tồn tại => tăng quantity lên
        if(existDish){
            existDish.quantity += quantity ;
            await Cart.updateOne(
                {
                    _id : cart_id,
                    'dishes.dish_id' : dishId,
                },
                {
                    'dishes.$.quantity': existDish.quantity
                }
            )
        }
        // Nếu không thì tạo một object dish mới
        else {
            const objectDish = {
                dish_id : dishId,
                quantity : quantity
            }
        
            // Lưu vào database
            await Cart.updateOne(
                {_id : cart_id}, 
                {
                    $push : {dishes : objectDish}
                }
            )
        }
        // CartDetail để show cho FrontEnd
        const cartDetail = {
            dishes : [],
        }

        // Tính tổng tiền
        const newCart = await Cart.findOne({_id : cart_id})
        // console.log(newCart)
        let total = 0;
        for (const item of newCart.dishes) {
            const dish = await Dish.findOne({ _id: item.dish_id });
            const object = {
                name : dish.name,
                price : dish.price,
                quantity : item.quantity,
                category : dish.category,
                imageUrl : dish.imageUrl,
            }
            cartDetail.dishes.push(object);
            if (dish) {
                total += parseInt(dish.price) * item.quantity;
            }
        }
        // console.log(total);
        newCart.totalAmount = total;
        cartDetail.totalAmount = newCart.totalAmount

        await Cart.updateOne(
            {_id : cart_id},
            {
                totalAmount : newCart.totalAmount
            }
        )

        res.status(200).json({
            message : "Thêm sản phẩm vào giỏ hàng thành công!",
            cart : cartDetail
        })
    } catch (error) {
        res.status(400).json({
            message : "Error!",
            error : error.message
        })
    } 
}

module.exports = {
    index,
    addToCart,
}