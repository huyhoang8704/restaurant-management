const mongoose = require('mongoose');

const TableBookingSchema = new mongoose.Schema({
    customer_id: String,
    bookingDate: {  
        type: String,
        required: [true, 'DD/MM/YYYY'] 
    },
    bookingTime: {  // mấy giờ
        type: String,
        required: [true, 'HH:mm:ss'] 
    },
    numberofSeats: {
        type: String,
        enum: [2, 4, 6, 8, 10],
        required: true,
    },
    tableId: {
        type: String,
    },
}, {
    timestamps: true
});

const TableBooking = mongoose.model('TableBooking', TableBookingSchema, "tableBooking");

module.exports = TableBooking;

