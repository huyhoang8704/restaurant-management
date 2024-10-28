const mongoose = require('mongoose');
const TableBooking = require("../../models/tableBooking.model");

const getallBookings = async (req, res) => {
    try {
        const bookings = await TableBooking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({
            message: "Lấy danh sách đặt bàn thất bại",
            error: error.message,
        });
    }
};

module.exports = {
    getallBookings,
};
