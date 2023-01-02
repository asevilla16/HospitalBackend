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

const updateMedico = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const medico = await Medico.findById(id);
        
        if(!medico) {
            return res.status(404).json({
                ok: true,
                msg: "Medico no encontrado"
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true});

        res.json({
            ok: true,
            medico: medicoActualizado
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }

}

const deleteMedico = async (req, res = response) => {
    const id = req.params.id;

    try {
        const medico = await Medico.findById(id);
        
        if(!medico) {
            return res.status(404).json({
                ok: true,
                msg: "Medico no encontrado"
            })
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: "Medico borrado"
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }
}


module.exports = {
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico
}