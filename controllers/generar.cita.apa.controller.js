const {request, response} = require('express');
const generarCitaPorISBN = require('../services/generar.citas.service');
const ErrorOPAC = require('../services/error/error');
/**
 * @param {request} req
 * @param {response} res
*/
const generarCitaAPAController = async(req, res)=>{
    const isbn = req.query.isbn;
    try {
        const cita = await generarCitaPorISBN(isbn);
        res.json(cita);
    } catch (error) {
        if( error instanceof ErrorOPAC){
            res.sendStatus(404);
        }
        res.sendStatus(500)
    }
}

module.exports = generarCitaAPAController;
