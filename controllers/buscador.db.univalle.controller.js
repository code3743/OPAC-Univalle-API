const {request, response} = require('express');
const buscarDBUnivalle = require('../services/buscar.db.univalle.service');

/**
 * @param {request} req
 * @param {response} res
*/
const buscadorDBUnivalleController = async(req,res)=>{
    const parametroBusqueda = req.query.q;
    try {
        const resultados = await buscarDBUnivalle(parametroBusqueda);
        res.json({
            busqueda: parametroBusqueda,
            resultados
        });
    } catch (error) {
        res.json(error).sendStatus(500);
    }
}

module.exports = buscadorDBUnivalleController;