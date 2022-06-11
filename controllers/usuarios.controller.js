const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const res = require('express/lib/response');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google');
    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    })
}

const createUser = async (req, res = response) => {

    const {email, password, nombre} = req.body;

    try {
        const emailExistente = await Usuario.findOne({email});

        if(emailExistente){
            return res.status(400).json({
                ok: false,
                msg: "Correo ya se encuentra registrado"
            })
        }

        const user = new Usuario(req.body);

        
        //Encriptar contrasenia
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt)
        
        await user.save();
        
        const token = await generateJWT(user.uid);

        res.json({
            ok: true,
            usuario: user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }
}

const editUser = async (req, res = response) => {
    const id = req.params.id;
    try {
        const existingUser = await Usuario.findById(id);

        if(!existingUser){
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun usuario con el id especificado'
            })
        }

        const {password, google, email, ...campos} = req.body;

        if(existingUser.email !== email){
            const existingEmail = Usuario.findOne({email: email})
            if(existingEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con el email especificado'
                })
            }
        }

        campos.email = email;

        const updatedUser = await Usuario.findByIdAndUpdate(id, campos, {new: true})

        res.json({
            ok: true,
            usuario: updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const deleteUser = async (req, res = response) => {
    try {
        const uid = req.params.id;

        const existingUser = await Usuario.findById(uid);

        if(!existingUser){
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun usuario con el id especificado'
            })
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario Eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, contactar al admin'
        })
    }
}


module.exports = {
    getUsers,
    createUser,
    editUser,
    deleteUser
}