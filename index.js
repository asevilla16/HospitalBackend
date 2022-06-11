require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { connection } = require('./database/config');

const app = express();

app.use(cors());

app.use(express.json());

connection();

//Credentials
//asevilla16
//ZgBhSnhLKjLIenWp
//190.92.33.112
//190.92.33.118/32

// Routes
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/login', require('./routes/auth'))


app.listen(process.env.port, () => {
    console.log('Server listening in port ' + process.env.port)
});