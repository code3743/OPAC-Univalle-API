const {request, response} = require('express');
const BrowserSingleton = require('../config/config');
const { detallesOID } = require('../services/detalles.oid.service');

/**
 * @param {request} req
 * @param {response} res
*/
const detallesOIDController = async (req, res) => {
    const { oid = '' } = req.params;
    const navegador = await BrowserSingleton.getBrowser();
    try {
        const detalleEjemplar =  await detallesOID(navegador, oid);
        res.status(200).json(
          detalleEjemplar
        );
    }  catch (error) {
        res.status(500).send(`Algo salió mal: ${error}`);
    } 
}

module.exports = {
    detallesOIDController
}