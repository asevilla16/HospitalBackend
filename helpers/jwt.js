const jwt = require("jsonwebtoken")

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {

        const payload = {
            uid
        }
    
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        },(error, token) => {
            if(error){
                console.log(error);
                reject('No se pudo generar el token');
            }
            resolve(token);
        })
    })
}

module.exports = {
    generateJWT
}