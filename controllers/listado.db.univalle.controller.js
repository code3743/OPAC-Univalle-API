const { request, response } = require("express");
const listadoDBUnivalle = require("../services/listado.db.univalle.service");

/**
 * @param {request} req
 * @param {response} res
 */

const listadoDBUnivalleController = async(req, res)=>{
    try {
        const listado = await listadoDBUnivalle();
        res.json({
            total: listado.length,
            listado
        })
    } catch (e) {
        res.sendStatus(500);
    }
}

module.exports = listadoDBUnivalleController;