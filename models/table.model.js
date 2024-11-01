const mongoose = require("mongoose");


const TableSchema = new mongoose.Schema({
    numberofSeats: {
        type: String,
        enum: [2, 4, 6, 8, 10],
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available'
    }
},
{
    timestamps: true
}
)

const Table = mongoose.model("Table", TableSchema, "table");

module.exports = Table;