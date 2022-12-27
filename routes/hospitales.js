const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validate-token');
const { createHospital, updateHospital, deleteHospital, getHospitales } = require('../controllers/hospitales.controller');

const router = Router();

router.get('/', getHospitales);
router.post(
    '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es requerido').not().isEmpty(),
        validarCampos
    ],
    createHospital
);

router.put(
    '/:id', 
    [],
    updateHospital
);

router.delete(
    '/:id',
    [],
    deleteHospital
)

module.exports = router;