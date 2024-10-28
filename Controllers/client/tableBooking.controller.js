const mongoose = require('mongoose');
const TableBooking = require("../../models/tableBooking.model");
const Table = require('../../models/table.model');

const createBooking = async (req, res) => {
    try {
        const availableTable = await Table.findOne({ status: 'available' });
        if (!availableTable) {
            return res.status(400).json({
                message: "Không còn bàn nào có sẵn để đặt!",
            });
        }
        //const booking_Time = moment(req.body.bookingTime, 'DD/MM/YYYY HH:mm:ss').toDate(); THỜI GIAN DỰ KIẾN?
        const booking = new TableBooking({
            customer_id: req.body.customer_id,
            bookingTime: req.body.bookingTime,
            numberofSeats: req.body.numberofSeats,
            tableId: availableTable._id 
        });
        //ĐỔI STATUS CỦA BÀN VỪA ĐẶT ĐC SANG ĐÃ DÙNG
        await Table.findByIdAndUpdate(availableTable._id, { status: 'unavailable' });

        setTimeout(async () => {
            await Table.findByIdAndUpdate(availableTable._id, { status: 'available' });
        }, 60 * 1000); // ĐOẠN NÀY CÓ THỂ GÁN THỜI GIAN ĐỂ TỰ HẾT HẠN BÀN. (TÍNH BẰNG MILI GIÂY

        const data = await booking.save();
        res.status(201).json({
            message: "Đặt bàn thành công",
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
