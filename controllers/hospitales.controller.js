const { response } = require('express')
const Hospital = require('../models/hospital');


const getHospitales = async(req, res = response) => {
    const hospitales = await Hospital.find()
                        .populate('usuario', 'nombre')

    res.json({
        ok: true,
        hospitales
    })
}

const createHospital = async(req, res = response) => {

    const uid = req.uid;
    
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {
        const hospitalDB = await hospital.save();

        res.status(200).json({
            ok: true,
            hospital: hospitalDB
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el admin'
        })
    }
}

const updateHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: "update hospitales"
    })
}

const deleteHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: "update hospitales"
    })
}


module.exports = {
    getHospitales,
    createHospital,
    updateHospital,
    deleteHospital
}