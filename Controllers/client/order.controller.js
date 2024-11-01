const Cart = require('../../models/cart.model')
const Dish = require('../../models/dish.model')
const Order = require('../../models/order.model')
const TableBooking = require("../../models/tableBooking.model");



const index = async (req, res) => {
    try {
        const cart_id = req.cookies.cart_id
        const cart = await Cart.findOne({
            _id : cart_id,
            deleted : false
        })
        let objectOrder = new Order();
        // Tính tổng số tiền
        let totalAmount = 0; 
        if(cart.dishes.length > 0) {
            for(const item of cart.dishes) {
                const dish = await Dish.findOne({
                    _id : item.dish_id
                })
                let objectDish = {
                    name : dish.name,
                    price : dish.price,
                    quantity : item.quantity,
                    imageUrl : dish.imageUrl
                }
                objectOrder.dishes.push(objectDish)
                totalAmount += (dish.price * item.quantity)
            }
        }
        objectOrder.totalAmount = totalAmount
        //!
        if(req.body.orderType === "Dine In") {
            const table = await TableBooking.find({
                customer_id : req.user._id
            })
            if(!table) {
                res.status(404).json({
                    message : "Table not found!"
                })
                return;
            }
            objectOrder.dineInDetails = table
        }
        if (req.body.orderType === "Delivery") {
            let deliveryDetails = {
                address : req.body.address,
                deliveryTime : req.body.deliveryTime
            }
            objectOrder.deliveryDetails = deliveryDetails
        }
        // //! QRPayment

        // const order = new Order(objectOrder)
        // await order.save()

        //! nếu đặt hàng thành công thì cập nhật lại cart
        await Cart.findOneAndUpdate({
            _id : cart_id
        }, {
            $set : {
                deleted : true
            }
        })

        res.status(200).json({
            message : "Success!",
            data : objectOrder
        })
    } catch (error) {
        res.status(501).json({
            message : "Error!",
            error : error.message
        })
    } 
}

module.exports = {
    index,
}