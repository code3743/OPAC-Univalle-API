const {Router} = require('express');
const { informacionPrincipalController } = require('../controllers/informacion.principal.controller');
const { actualizarTodoController, actualizarLibroController } = require('../controllers/actualizar.libro.controller');
const { buscarLibroController } = require('../controllers/buscar.libro.controller');
const { detallesISBNController } = require('../controllers/detalles.isbn.controller');
const { detallesOIDController } = require('../controllers/detalles.oid.controller');

const router = Router();

// router.get('/',);
router.get('/login', informacionPrincipalController);
router.get('/renovar', actualizarTodoController);
router.get('/renovar/:indexLibro', actualizarLibroController);
router.get('/buscar', buscarLibroController);
router.get('/detalle/isbn/:isbn', detallesISBNController);
router.get('/detalle/oid/:oid', detallesOIDController);

module.exports = router;