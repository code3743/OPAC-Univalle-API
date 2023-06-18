const {Router} = require('express');
const { informacionPrincipalController } = require('../controllers/informacion.principal.controller');
const { actualizarTodoController, actualizarLibroController } = require('../controllers/actualizar.libro.controller');
const { buscarLibroController } = require('../controllers/buscar.libro.controller');
const { detallesISBNController } = require('../controllers/detalles.isbn.controller');
const { detallesOIDController } = require('../controllers/detalles.oid.controller');
const facultadesUnivalle = require('../controllers/facultades.univalle.controller');
const librosRecomendadosFacultad = require('../controllers/libros.recomendados.facultad.controller');
const buscadorDBUnivalleController = require('../controllers/buscador.db.univalle.controller');

const router = Router();

// router.get('/',);
router.get('/buscar/db', buscadorDBUnivalleController);
router.get('/facultades', facultadesUnivalle);
router.get('/facultades/:idFacultad', librosRecomendadosFacultad);
router.get('/login', informacionPrincipalController);
router.get('/renovar', actualizarTodoController);
router.get('/renovar/:indexLibro', actualizarLibroController);
router.get('/buscar', buscarLibroController);
router.get('/detalle/isbn/:isbn', detallesISBNController);
router.get('/detalle/oid/:oid', detallesOIDController);

module.exports = router;