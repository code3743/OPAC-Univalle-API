const {request, response} = require('express');
const BrowserSingleton = require('../config/config');
const { buscarLibro } = require('../services/buscar.libro.service');

/**
 * @param {request} req
 * @param {response} res
*/
const buscarLibroController = async (req, res) => {
    const { parametroBusqueda = '' } = req.query;
    const navegador = await BrowserSingleton.getBrowser();
    try {
        const resultadosBusqueda = await buscarLibro(navegador, parametroBusqueda.replace('%20', ' '));
        res.status(200).json({
            tituloBuscado: parametroBusqueda.replace('%20', ' '),
            totalResultados : resultadosBusqueda.length,
            resultadosBusqueda
        });
    } catch (error) {
        res.status(500).send(`Algo salió mal: ${error}`);
    } 
}

module.exports = {
    buscarLibroController
}