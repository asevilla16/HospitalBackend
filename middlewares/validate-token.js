const jwt = require("jsonwebtoken");


const validarJWT = (req, res, next) => {
    
    const token = req.header('token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No se envio un token'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

}

module.exports = {
    validarJWT
}