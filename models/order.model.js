const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    cart_id : String,
    customer_id : String,
    orderType: {
        type: String,
        enum: ['Dine In', 'Delivery'],
        required: true,
    },
    dishes: [
        {
            dish_id : String,
            quantity : Number,
            price : Number,
        }
    ],
    totalAmount: {
        type: Number,
        required: [true, 'Total amount is required'],
        min: [0, 'Total amount must be a positive number']
    },
    dineInDetails: {   // "Dine In"
        tableId: String,
        reservationTime: Date,
    },
    deliveryDetails: {
        address: String,
        deliveryTime: Date,
    },
},
    {
        timestamps: true
    }
);
// Validate the order before saving
OrderSchema.pre('save', function (next) {
    if (this.orderType === 'Dine In' && !this.dineInDetails.tableId) {
      return next(new Error('Dine In order must have table details.'));
    }
    if (this.orderType === 'Delivery' && !this.deliveryDetails.address) {
      return next(new Error('Delivery order must have address details.'));
    }
    next();
  });


const Order = mongoose.model('Order', OrderSchema , "order");

module.exports = Order;
