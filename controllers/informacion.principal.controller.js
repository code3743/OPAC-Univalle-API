const {request, response} = require('express');
const {browser} = require('../config/config');
const constantes = require('../config/constantes');
const { inicarSesionOPAC } = require('../services/auth.service');
const { getLibrosPrestados } = require('../services/libros.prestamo.service');
const { getHistorialLibros } = require('../services/historial.libros.service');

const informacionPrincipalController = async (req = request, res = response)=>{
    const codigo = req.query.codigo;
    const navegador =await browser();
    try {
        const pageUser = await inicarSesionOPAC(codigo, navegador);
        const fechaExpiracion = await pageUser.evaluate((fecha)=>{
            return document.querySelector(fecha).innerText;
        }, constantes.FECHA_EXP);
        const apellido = await pageUser.evaluate((apellido)=>{
          return document.querySelector(apellido).innerText;
        },constantes.APELLIDO);
        const nombre = await pageUser.evaluate((nombre)=>{
          return document.querySelector(nombre).innerText;
        }, constantes.NOMBRE);
        const multa = await pageUser.evaluate((multa)=>{
            return document.querySelector(multa).innerText;
        }, constantes.MULTA);
        const librosPrestados = await getLibrosPrestados(pageUser);
        const historialPrestamos = await getHistorialLibros(pageUser);
        res.status(200).json({
            nombre,
            apellido,
            fechaExpiracion,
            multa,
            librosPrestados,
            historialPrestamos 
         });

    } catch (error) {
        res.status(500).send(`Algo salió mal: ${error}`);
    } finally{
        await navegador.close();
    }
}

module.exports = {
    informacionPrincipalController
}