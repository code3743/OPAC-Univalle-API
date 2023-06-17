const path = require("path");
const {request, response} = require('express');
const leerArchivoJSON = require('../utils/leer.archivos.json');

/**
 * @param {request} req
 * @param {response} res
*/

const facultadesUnivalle = (req, res) => {
    try {
        const ruta = path.join(__dirname, '../data/categorias.json');
        const datos = leerArchivoJSON(ruta);
        const facultadesInfo = []
        for (const facultades of datos.categorias) {
            facultadesInfo.push({
                id: facultades.id,
                facultad: facultades.facultad
            });
        }
        res.json({facultades: facultadesInfo});
    } catch (error) {
        res.json({
            facultades: []
        }).sendStatus(500)
    }
}

module.exports = facultadesUnivalle;