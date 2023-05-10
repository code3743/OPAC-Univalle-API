const {request, response} = require('express');
const {browser} = require('../config/config');
const { inicarSesionOPAC } = require('../services/auth.service');
const { actualizarLibro, actualizarTodo } = require('../services/actualizar.libros.service');
/**
 * @param {request} req
 * @param {response} res
*/
const actualizarTodoController = async (req, res)=>{
    const {codigo} = req.query;
    const navegador = await browser();
    try {
        const pageUser = inicarSesionOPAC(codigo, navegador);
        const nuevasFechas =actualizarTodo(pageUser);
        res.status(200).json(nuevasFechas);
    } catch (error) {
        res.status(500).send(`Algo salió mal: ${error}`);
    } finally {
        await navegador.close();
    }
}
/**
 * @param {request} req
 * @param {response} res
*/
const actualizarLibroController= async (req, res)=>{
    const {codigo} = req.query;
    const indexLibro = parseInt(req.params.index);
    const navegador = await browser();
    try {
        const pageUser = await inicarSesionOPAC(codigo, navegador);
        const nuevasFechas = await actualizarLibro(pageUser, indexLibro);
        res.status(200).json(nuevasFechas);
    } catch (error) {
        res.status(500).send(`Algo salió mal: ${error}`);
    } finally {
        await navegador.close();
    }
}

module.exports = {
    actualizarTodoController,
    actualizarLibroController
}