const {Router} = require('express');
const { informacionPrincipalController } = require('../controllers/informacion.principal.controller');
const { actualizarTodoController, actualizarLibroController } = require('../controllers/actualizar.libro.controller');
const { buscarLibroController } = require('../controllers/buscar.libro.controller');
const { detallesLibroController } = require('../controllers/detalles.libro.controller');

const router = Router();

// router.get('/',);
// router.get('/:facultad', );
router.get('/login', informacionPrincipalController);
router.get('/renovar', actualizarTodoController);
router.get('/renovar/:indexLibro', actualizarLibroController);
router.get('/buscar', buscarLibroController);
router.get('/buscar/:isbn', detallesLibroController);


module.exports = router;