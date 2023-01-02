const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validate-token');
const { getMedicos, createMedico, updateMedico, deleteMedico } = require('../controllers/medicos.controller');

const router = Router();

router.get('/', getMedicos);
router.post(
    '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del medico es requerido').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser valido').isMongoId(),
        validarCampos
    ],
    createMedico
);

router.put(
    '/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre del medico es requerido').not().isEmpty(),
        validarCampos
    ],
    updateMedico
);

router.delete(
    '/:id',
    [
        validarJWT
    ],
    deleteMedico
)

module.exports = router;