const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
    {
        fullname: String,
        email : String,
        password : String,
        phone : String,
        address : {
            default : "",
            type : String
        },
        role : {
            default : "user",
            type : String
        },
        token : String, 
        deleted: {
            type : Boolean,
            default: false,
        },
        deletedAt: Date,

    },
    {
        timestamps : true
    }
);


const User = mongoose.model("User",UserSchema,"user") // argu3 là tên connection trong db


module.exports = User;
