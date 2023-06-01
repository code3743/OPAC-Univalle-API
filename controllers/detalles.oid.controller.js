const {request, response} = require('express');
const { detallesOID } = require('../services/detalles.oid.service');
const lanzarNavegador = require('../config/config');

/**
 * @param {request} req
 * @param {response} res
*/
const detallesOIDController = async (req, res) => {
    const { oid = '' } = req.params;
    const navegador = await lanzarNavegador();
    try {
        const detalleEjemplar =  await detallesOID(navegador, oid);
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
    detallesOIDController
}