const mongoose = require('mongoose');

const connection = async () => {

    try {
        await mongoose.connect(process.env.connection_string, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Db online")
    } catch (error) {
        console.log(error);
        throw new Error('no se pudo conectar ala db');
    }    
}

module.exports = {
    connection
}