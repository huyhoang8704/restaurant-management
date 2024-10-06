const express = require('express');
require('dotenv').config()
const database = require('./config/database');


const app = express()
const port = process.env.PORT;

const userRoute = require('./routes/index.route')
userRoute(app)

// Conect DB
database.connect();


app.get('/',(req, res) => {
    res.send('Restaurant Management System');
})


app.listen(port , () =>{
    console.log(`App listening on port ${port}`);
})