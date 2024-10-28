const Cart = require('../../models/cart.model')
const Dish = require('../../models/dish.model')
const TableBooking = require('../../models/tableBooking')



const index = async (req, res) => {
    try {
        const cart_id = req.cookies.cart_id
        const cart = await Cart.findOne({
            _id : cart_id,
            deleted : false
        })
        let totalAmount = 0;  // Tính tiền thanh toán
        if(!cart.dishes.length > 0) {
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
        if(req.body.orderType === "Dine In") {
            const table = await TableBooking.findOne({
                customer_id : cart.customer_id
            })
            if(!table) {
                res.status(404).json({
                    message : "Table not found!"
                })
                return;
            }
            objectOrder.table_id = table._id
        }
        if (req.body.orderType === "Delivery") {
            let deliveryDetails = {
                address : req.body.address,
                deliveryTime : req.body.deliveryTime
            }
            objectOrder.deliveryDetails = deliveryDetails
        }
        //! QRPayment


        const objectOrder = {
            cart_id : cart_id,
            customer_id : cart.customer_id,
            dishes : cart.dishes,
            totalAmount : totalAmount,
            orderType : req.body.orderType
        }
        const order = new Order(objectOrder)
        await order.save()

        res.status(200).json({
            message : "Success!",
            order : order
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