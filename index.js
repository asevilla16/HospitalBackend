require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { connection } = require('./database/config');

const app = express();

app.use(cors());

connection();

//Credentials
//asevilla16
//NTPiU3a2ntf7cTGo
//190.92.33.112

// Routes

app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hello there'
    })
})

app.listen(process.env.port, () => {
    console.log('Server listening in port ' + process.env.port)
});