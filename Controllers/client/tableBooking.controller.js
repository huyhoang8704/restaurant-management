const mongoose = require('mongoose');
const TableBooking = require("../../models/tableBooking.model");
const Table = require('../../models/table.model');

const createBooking = async (req, res) => {
    try {
        const availableTable = await Table.findOne({
            status: 'available',
            numberofSeats: req.body.numberofSeats
        });
        if (!availableTable) {
            return res.status(400).json({
                message: "Không còn bàn nào có sẵn để đặt!",
            });
        }
        //const booking_Time = moment(req.body.bookingTime, 'DD/MM/YYYY HH:mm:ss').toDate(); THỜI GIAN DỰ KIẾN?
        const booking = new TableBooking({
            customer_id: req.user._id,
            bookingDate: req.body.bookingDate,
            bookingTime: req.body.bookingTime,
            numberofSeats: req.body.numberofSeats,
            tableId: availableTable._id 
        });
        //ĐỔI STATUS CỦA BÀN VỪA ĐẶT ĐC SANG ĐÃ DÙNG
        await Table.findByIdAndUpdate(availableTable._id, { status: 'unavailable' });
        // THỜI GIAN ĐẶT BÀN ĂN 2H
        setTimeout(async () => {
            await Table.findByIdAndUpdate(availableTable._id, { status: 'available' });
        }, 60 * 60 * 1000 * 2); 

        const data = await booking.save();
        res.status(201).json({
            message: `Chúc mừng ${req.user.fullname} đã đặt bàn thành công`,
            data,
        });
    } catch (error) {
        res.status(500).json({
            message: "Đặt bàn thất bại",
            error: error.message,
        });
    }
};

module.exports = {
    createBooking,
};
