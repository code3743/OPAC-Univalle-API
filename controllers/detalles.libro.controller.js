const {request, response} = require('express');
const { detallesLibro } = require('../services/detalles.libro.service');
const BrowserSingleton = require('../config/config');
/**
 * @param {request} req
 * @param {response} res
*/
const detallesLibroController = async (req, res) => {
    const { isbn = '' } = req.params;
    const navegador = await BrowserSingleton.getBrowser();
    try {
        const detalleEjemplar =  await detallesLibro(navegador, isbn);
        res.status(200).json(
          detalleEjemplar
        );
    }  catch (error) {
        res.status(500).send(`Algo salió mal: ${error}`);
    } 
}

module.exports = {
    detallesLibroController
}