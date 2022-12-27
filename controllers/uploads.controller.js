const { response } = require("express");
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const fs = require('fs');
const path = require('path');

const fileUpload = (req, res = response) => {

    const {tipo, id} = req.params;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    const esTipoValido = tiposValidos.includes(tipo);
    if(!esTipoValido){
        return res.status(400).json({
            ok: false,
            msg: 'No es una coleccion valida'
        })
    }

    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        })
    }

    const file = req.files.imagen;

    const nombreCorto = file.name.split(".");
    const extension = nombreCorto[nombreCorto.length - 1];

    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if(!extensionesValidas.includes(extension)){
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        })
    }

    const nombreArchivo = `${nombreCorto[0]}_${Date.now()}.${extension}`;

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path, (error) => {
        if(error){
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        })
    });

    //console.log(file);

}

const retornaImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-image.jfif`)
        res.sendFile(pathImg);
    }
}

module.exports = {
    fileUpload,
    retornaImagen
}