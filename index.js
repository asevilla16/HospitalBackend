require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { connection } = require('./database/config');

const app = express();

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

connection();

//Credentials
//asevilla16
//ZgBhSnhLKjLIenWp
//190.92.33.112
//190.92.33.118/32

// Routes
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/hospitales', require('./routes/hospitales'))
app.use('/api/medicos', require('./routes/medicos'))
app.use('/api/busqueda-general', require('./routes/busquedas'))
app.use('/api/login', require('./routes/auth'))
app.use('/api/upload', require('./routes/uploads'))



app.listen(process.env.port, () => {
    console.log('Server listening in port ' + process.env.port)
});