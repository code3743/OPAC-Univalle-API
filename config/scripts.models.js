const fs = require('fs');
const path = require('path');


const rutasModels = [
    path.join(__dirname,'..', 'models', 'libro.prestamo.model.js'),
    path.join(__dirname,'..', 'models', 'libro.busqueda.model.js'),
    path.join(__dirname,'..', 'models', 'localizacion.ejemplar.model.js'),
];

const generarScriptModels = rutasModels.map(ruta => fs.readFileSync(ruta, 'utf-8').split('module.exports')[0]);

module.exports = generarScriptModels;