const mongoose = require('mongoose');

const TableBookingSchema = new mongoose.Schema({
    customer_id: String,
    // tableNumber: {
    //     type: Number,
    //     required: [true, 'Table number is required']
    // },
    bookingDate: {  // ngày đặt bàn //CÁI NÀY CHẮC HỆ THỐNG TỰ LƯU
        type: Date,
        default: Date.now ()
    },
    bookingTime: {  // mấy giờ
        type: String,
        required: [true, 'DD/MM/YYYY HH:mm:ss'] 
    },
    // numberOfGuests: {
    //     type: Number,
    //     required: [true, 'Number of guests is required'],
    //     min: [1, 'There must be at least 1 guest']
        // },
    numberofSeats: {
        type: String,
        enum: [2, 4, 6, 8, 10],
        required: true,
    },
    // status: {
    //     type: String,
    //     enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
    //     default: 'Pending'
    // }
    tableId: {
        type: String,
    },
}, {
    timestamps: true
});

const TableBooking = mongoose.model('TableBooking', TableBookingSchema, "tableBooking");

module.exports = TableBooking;

