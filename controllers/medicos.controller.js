const { response } = require('express');
const Medico = require('../models/medico');


const getMedicos = async(req, res = response) => {
    const medicos = await Medico.find()
                    .populate('usuario', 'nombre')
                    .populate('hospital', 'nombre')
    res.json({
        ok: true,
        medicos
    })
}

const createMedico = async(req, res = response) => {
    
    const uid = req.uid;
    const hospitalId = req.body.hospitalId;

    const medico = new Medico({
        usuario: uid,
        hospital: hospitalId,
        ...req.body
    });

    try {
        const medicoDb = await medico.save()

        res.status(200).json({
            ok: true,
            medico: medicoDb
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }
}

const updateMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: "update Medicos"
    })
}

const deleteMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: "update Medicos"
    })
}


module.exports = {
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico
}