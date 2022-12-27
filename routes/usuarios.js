const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsers, createUser, editUser, deleteUser } = require('../controllers/usuarios.controller');
const { validarJWT } = require('../middlewares/validate-token');

const router = Router();

router.get('/', validarJWT, getUsers);
router.post(
    '/', 
    [
        //validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    createUser
);

router.put(
    '/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    editUser
);

router.delete(
    '/:id',
    [
        validarJWT
    ],
    deleteUser
)

module.exports = router;