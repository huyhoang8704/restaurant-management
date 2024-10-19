const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    customer_id: String,
    dishes: [
        {
            dish_id : String,
            quantity : Number,
        }
    ],
},
    {
        timestamps: true
    }
);

const Cart = mongoose.model('Cart', CartSchema, "cart");

module.exports = Cart;
