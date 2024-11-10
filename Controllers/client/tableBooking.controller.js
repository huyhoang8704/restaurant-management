const mongoose = require('mongoose');
const TableBooking = require("../../models/tableBooking.model");
const Table = require('../../models/table.model');
const moment = require('moment');

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

        
        const bookingDateTime = moment(
            `${req.body.bookingDate} ${req.body.bookingTime}`, 
            'DD/MM/YYYY HH:mm:ss'
        );
        const now = moment();

        // // THỜI GIAN ĐẶT BÀN PHẢI TRƯỚC THỜI GIAN HIỆN TẠI 1 TIẾNG.
        // const oneHourInMillis = 60 * 1000;
        // if (bookingDateTime.diff(now) < oneHourInMillis) {
        //     return res.status(400).json({
        //     message: "Thời gian đặt bàn phải trước 1 tiếng.",
        //     });
        // }


        const booking = new TableBooking({
            customer_id: req.user._id,
            bookingDate: req.body.bookingDate,
            bookingTime: req.body.bookingTime,
            numberofSeats: req.body.numberofSeats,
            tableId: availableTable._id 
        });


        //TÍNH TOÁN THỜI GIAN TỪ GIỜ ĐƯỢC ĐẶT TRỪ CHO GIỜ HIỆN TẠI. ĐỂ KHI TỚI THỜI GIAN ĐƯỢC ĐẶT THÌ NÓ MỚI ĐỔI THÀNH KO CÓ SẴN
        const delayUntilBooking = bookingDateTime.valueOf() - now.valueOf();

        setTimeout(async () => {
            await Table.findByIdAndUpdate(availableTable._id, { status: 'unavailable' });
            // BÀN ĐÃ ĐẶT CÓ THỜI HẠN 2 TIẾNG
            setTimeout(async () => {
            await Table.findByIdAndUpdate(availableTable._id, { status: 'available' });
            }, 2 * 60 * 60 * 1000); // 2 hours in milliseconds
        }, delayUntilBooking);
        
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
