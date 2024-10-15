const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customer_id: String,
    deliveryAddress: {
        type: String,
        default : ""  // Có thể ăn tại nhà hàng nên optional
    },
    cart_id : String,
    dishes: [
        {
            dish: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Dish',
                required: [true, 'Dish is required']
            },
            quantity: {
                type: Number,
                required: [true, 'Quantity is required'],
                min: [1, 'Quantity must be at least 1']
            },
            price :{
                type: Number,
                required: [true, 'Price is required'],
                min: [0, 'Price must be a positive number']
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: [true, 'Total amount is required'],
        min: [0, 'Total amount must be a positive number']
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
},
    {
        timestamps: true
    }
);

const Order = mongoose.model('Order', OrderSchema , "order");

module.exports = Order;
