const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const database = require('./config/mongoDB.database');

const app = express();
const port = process.env.PORT;

// Body-parser middleware nên được gọi trước các tuyến
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie-parser middleware
app.use(cookieParser());

// Conect DB
database.connect();

// Import routes sau khi middleware đã được cấu hình
const userRoute = require('./routes/index.route');
userRoute(app);

app.get('/', (req, res) => {
    res.send('Restaurant Management System');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
// Đây là code chính
