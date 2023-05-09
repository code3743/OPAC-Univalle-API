const {Router} = require('express');
const { informacionPrincipalController } = require('../controllers/informacion.principal.controller');
const { actualizarTodoController, actualizarLibroController } = require('../controllers/actualizar.libro.controller');
const { buscarLibroController } = require('../controllers/buscar.libro.controller');
const { detallesLibroController } = require('../controllers/detalles.libro.controller');

const router = Router();

router.get('/', informacionPrincipalController);
router.get('/renovar', actualizarTodoController);
router.get('/renovar/:indexLibro', actualizarLibroController);
router.get('/buscar', buscarLibroController);
router.get('/buscar/:id', detallesLibroController);


module.exports = router;