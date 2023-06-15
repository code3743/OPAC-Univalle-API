const {request, response} = require('express');
const lanzarNavegador = require('../config/config');
const { buscarLibro } = require('../services/buscar.libro.service');

/**
 * @param {request} req
 * @param {response} res
*/
const buscarLibroController = async (req, res) => {
    const { q = '' } = req.query;
    const navegador = await lanzarNavegador();
    try {
        const resultadosBusqueda = await buscarLibro(navegador, q.replace('%20', ' '));
        res.status(200).json({
            titulo: q.replace('%20', ' '),
            total : resultadosBusqueda.length,
            libros: resultadosBusqueda
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