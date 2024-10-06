const express = require('express');
const app = express()
const port = 3000;




app.get('/',(req, res) => {
    res.send('Restaurant Management System');
})


app.listen(port , () =>{
    console.log(`App listening on port ${port}`);
})