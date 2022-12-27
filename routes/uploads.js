const { Router } = require('express');
const expressFileUpload = require('express-fileupload')
const { fileUpload, retornaImagen } = require('../controllers/uploads.controller');
const { validarJWT } = require('../middlewares/validate-token');
const router = Router();

router.use(expressFileUpload());

router.get('/:tipo/:foto', validarJWT, retornaImagen)
router.put('/:tipo/:id', validarJWT, fileUpload);

 
module.exports = router;