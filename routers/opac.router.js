const { actualizarTodoController, actualizarLibroController } = require('../controllers/actualizar.libro.controller');
const { buscarLibroController } = require('../controllers/buscar.libro.controller');
const { detallesISBNController } = require('../controllers/detalles.isbn.controller');
const { detallesOIDController } = require('../controllers/detalles.oid.controller');
const { informacionPrincipalController } = require('../controllers/informacion.principal.controller');
const {Router} = require('express');
const buscadorDBUnivalleController = require('../controllers/buscador.db.univalle.controller');
const facultadesUnivalle = require('../controllers/facultades.univalle.controller');
const librosRecomendadosFacultad = require('../controllers/libros.recomendados.facultad.controller');
const listadoDBUnivalleController = require('../controllers/listado.db.univalle.controller');
const noticiasController = require('../controllers/noticias.controller');
const generarCitaAPAController = require('../controllers/generar.cita.apa.controller');

const router = Router();

router.get('/', noticiasController);
router.get('/db', listadoDBUnivalleController);
router.get('/db/buscar', buscadorDBUnivalleController);
router.get('/facultades', facultadesUnivalle);
router.get('/facultades/:idFacultad', librosRecomendadosFacultad);
router.get('/login', informacionPrincipalController);
router.get('/renovar', actualizarTodoController);
router.get('/renovar/:indexLibro', actualizarLibroController);
router.get('/buscar', buscarLibroController);
router.get('/detalle/isbn/:isbn', detallesISBNController);
router.get('/detalle/oid/:oid', detallesOIDController);
router.get('/cita', generarCitaAPAController);

module.exports = router;