const {request, response} = require('express');
const {browser} = require('../config/config');
const { buscarLibro } = require('../services/buscar.libro.service');

/**
 * @param {request} req
 * @param {response} res
*/
const buscarLibroController = async (req, res) => {
    const { parametroBusqueda = '' } = req.query;
    const navegador = await browser();
    try {
        
        const resultadosBusqueda = (await buscarLibro(navegador, parametroBusqueda.replace('%20', ' '))).map(libro => libro.toJson());
        res.status(200).json({
            tituloBuscado: parametroBusqueda.replace('%20', ' '),
            totalResultados : resultadosBusqueda.length,
            resultadosBusqueda
        });
    } catch (error) {
        res.status(500).send(`Algo salió mal: ${error}`);
    } finally{
        await navegador.close();
    }
}

module.exports = {
    buscarLibroController
}