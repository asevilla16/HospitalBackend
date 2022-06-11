const Usuario = require('../models/usuario');
const bcrypt = require("bcryptjs");
const { response } = require("express");
const { generateJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {
    try {

        const {email, password} = req.body;

        const existingUser = await Usuario.findOne({email});

        if(!existingUser){
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun usuario con el correo o password especificado'
            })
        }

        const validPassword = bcrypt.compareSync(password, existingUser.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }

        const token = await generateJWT(existingUser.id);



        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contactar al admin'
        })
    }
}

module.exports = {
    login
}