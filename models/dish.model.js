const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Dish name is required'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Dish price is required'],
        min: [0, 'Price must be a positive number']
    },
    category: {
        type: String,
        enum: ['Appetizer', 'Main Course', 'Dessert', 'Drink'],
        required: [true, 'Category is required']
    },
    imageUrl: {
        type: String,
        default: ''
    },
    like : {
        type: Number,
        default: 0
    },
    deleted: {    // stock or not
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Dish = mongoose.model('Dish', DishSchema , "dish");

module.exports = Dish;
