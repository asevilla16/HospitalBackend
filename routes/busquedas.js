const { Router } = require('express');
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas.controller');
const { validarJWT } = require('../middlewares/validate-token');
const router = Router();

router.get('/:busqueda', validarJWT, getTodo);

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion)

module.exports = router;