const Table  = require("../../models/table.model")

const createTable = async (req, res) => {
    try {
        const table = new Table({
            numberofSeats : req.body.numberofSeats
        })
        const data = await table.save()
        res.status(201).json({
            message : "Thêm bàn thành công",
            data,
        })
    } catch (error) {
        res.status(500).json({
            message : "Thêm bàn thất bại",
            error : error.message
        })
    } 
}

module.exports = {
    createTable
}