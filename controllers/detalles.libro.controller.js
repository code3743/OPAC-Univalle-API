const {request, response} = require('express');
const { detallesLibro } = require('../services/detalles.libro.service');
/**
 * @param {request} req
 * @param {response} res
*/
const detallesLibroController = async (req, res) => {
    const { id = '' } = req.params;
    const navegador = await browser();
    try {
        const detalleEjemplar =  await detallesLibro(navegador, id);
        res.status(200).json(
            ...detalleEjemplar
        )
        
    }  catch (error) {
        res.status(500).send(`Algo salió mal: ${error}`);
    } finally{
        await navegador.close();
    }
}

module.exports = {
    detallesLibroController
}