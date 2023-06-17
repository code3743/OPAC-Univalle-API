const path = require("path");
const { request, response } = require("express");
const leerArchivoJSON = require("../utils/leer.archivos.json");
const existeArchivo = require("../utils/existe.archivo");

/**
 * @param {request} req
 * @param {response} res
 */

const librosRecomendadosFacultad = (req, res) => {
  const idFacultad = req.params.idFacultad;
  try {
    const ruta = path.join(__dirname, `../data/db/${idFacultad}.json`);
    if (existeArchivo(ruta)) {
      res.json(leerArchivoJSON(ruta));
    } else res.sendStatus(404);
  } catch (e) {
    res.sendStatus(500);
  }
};

module.exports = librosRecomendadosFacultad;
