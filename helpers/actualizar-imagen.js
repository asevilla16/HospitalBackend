const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const fs = require('fs');

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    
    const entity = await obtenerTabla(tipo, id);

    if(!entity){
        console.log(`No es un ${tipo} existente`);
        return false;
    }

    console.log(entity);

    const pathViejo = `./uploads/${tipo}/${entity.img}`;

    borrarImagen(pathViejo);

    entity.img = nombreArchivo;
    await entity.save();
    return true;
}

const borrarImagen = (path) => {
    if(fs.existsSync(path)){
        fs.unlinkSync(path);
    }
}

const obtenerTabla = async(tipo, id) => {
    const tablasBusqueda = {
        'usuarios': () => Usuario.findById(id),
        'medicos': () => Medico.findById(id),
        'hospitales': () => Hospital.findById(id)
    }

    const entity = await tablasBusqueda[tipo]();

    return entity;
}

module.exports = {
    actualizarImagen
}