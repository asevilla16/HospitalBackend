const { response } = require('express')
const Hospital = require('../models/hospital');


const getHospitales = async (req, res = response) => {
    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre')

    res.json({
        ok: true,
        hospitales
    })
}

const createHospital = async (req, res = response) => {

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

const updateHospital = async (req, res = response) => {

    const hospitalId = req.params.id;
    const uid = req.uid

    try {

        const hospital = await Hospital.findById(hospitalId);

        if(!hospital){
            return res.status(404).json({
                ok: false,
                msg: "Hospital no encontrado"
            }) 
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(hospitalId, cambiosHospital, {new: true});

        res.json({
            ok: true,
            hospital: hospitalActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }

}

const deleteHospital = async (req, res = response) => {
    const hospitalId = req.params.id;

    try {

        const hospital = await Hospital.findById(hospitalId);

        if(!hospital){
            return res.status(404).json({
                ok: false,
                msg: "Hospital no encontrado"
            }) 
        }

        await Hospital.findByIdAndDelete(hospitalId);

        res.json({
            ok: true,
            msg: "Hospital eliminado"
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }
}


module.exports = {
    getHospitales,
    createHospital,
    updateHospital,
    deleteHospital
}