const {request, response} = require('express');
const { detallesLibro } = require('../services/detalles.libro.service');

const detallesLibroController = async (req = request, res = response) => {
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