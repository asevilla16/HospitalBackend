const { response } = require('express');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');

const getTodo = async(req, res = response) => {
    const busqueda = req.params.busqueda;

    const regex = new RegExp(busqueda, 'i');

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({nombre: regex}),
        Medico.find({nombre: regex}),
        Hospital.find({nombre: regex})
    ]);
    
    
    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    })
}

const getDocumentosColeccion = async(req, res) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const tablas = {
        'usuarios': () => Usuario.find({nombre: regex}),
        'medicos': () => Medico.find({nombre: regex}),
        'hospitales': () => Hospital.find({nombre: regex})
    }

    const defRes = () => {
        return res.status(400).json({
            ok: false,
            msg: 'La tabla no existe'
        });
    }

    try {
        const data = await tablas[tabla]();

        res.json({
            ok: true,
            resultados: data
        })

    } catch (error) {
        console.log(error);
        return defRes();
    }

}

module.exports = {
    getTodo,
    getDocumentosColeccion
}