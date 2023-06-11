const {request, response} = require('express');
const { detallesISBN} = require('../services/detalles.isbn.service');
const lanzarNavegador = require('../config/config');
/**
 * @param {request} req
 * @param {response} res
*/
const detallesISBNController = async (req, res) => {
    const { isbn = '' } = req.params;
    const navegador = await lanzarNavegador();
    try {
        const detalleEjemplar =  await detallesISBN(navegador, isbn);
        res.status(200).json(
          detalleEjemplar
        );
    }  catch (error) {
        res.status(500).send(`Algo salió mal: ${error}`);
    } finally{
        await navegador.close();
    }
}

module.exports = {
    detallesISBNController
}