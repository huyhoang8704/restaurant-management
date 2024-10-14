const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    customer_id: String,
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
            }
        }
    ],
    totalAmount: {
        type: Number,
        default: 0,
        min: [0, 'Total amount must be a positive number']
    },
},
    {
        timestamps: true
    }
);

const Cart = mongoose.model('Cart', CartSchema, "cart");

module.exports = Cart;
