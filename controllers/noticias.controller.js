const { request, response } = require("express");
const extraerNoticias = require("../services/noticias.biblioteca.service");
/**
 * @param {request} req
 * @param {response} res
 */

const noticiasController = async(req, res)=>{
    try{
        const noticias = await extraerNoticias();
        res.json({
            noticias
        });
    }catch(e){
        res.sendStatus(500);
    }
}

module.exports = noticiasController;