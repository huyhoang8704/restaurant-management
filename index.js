const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config();
const database = require('./config/mongoDB.database');

const clientRoute = require('./routes/client/index.route');
const adminRoute = require('./routes/admin/index.route');

const app = express();
const port = process.env.PORT;

// Body-parser middleware nên được gọi trước các tuyến
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())
// /**
//  * (Access-Control-Allow-Origin: *)
//  * GET, POST, PUT, DELETE, v.v.
//  * Content-Type, Authorization, v.v.
// */
// Cookie-parser middleware
app.use(cookieParser());

// Conect DB
database.connect();

// Import routes 
clientRoute(app);
adminRoute(app);


app.get('/', (req, res) => {
    res.send('Restaurant Management System');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
// Đây là code chính
