const mongoose = require('mongoose');

const TableBookingSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Tham chiếu đến khách hàng đặt bàn
        required: true
    },
    // tableNumber: {
    //     type: Number,
    //     required: [true, 'Table number is required']
    // },
    bookingDate: {  // ngày đặt bàn
        type: Date,
        required: [true, 'Booking date is required']
    },
    bookingTime: {  // mấy giờ
        type: String,
        required: [true, 'Booking time is required']
    },
    numberOfGuests: {
        type: Number,
        required: [true, 'Number of guests is required'],
        min: [1, 'There must be at least 1 guest']
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
        default: 'Pending'
    }
}, {
    timestamps: true
});

const TableBooking = mongoose.model('TableBooking', TableBookingSchema);

module.exports = TableBooking;
