const {request, response} = require('express');
const BrowserSingleton = require('../config/config');
const { inicarSesionOPAC } = require('../services/auth.service');
const { getLibrosPrestados } = require('../services/libros.prestamo.service');
const { getHistorialLibros } = require('../services/historial.libros.service');
const constantes = require('../config/constantes');
const capitalize = require('../utils/capitalizar.frases.util');
const selectorSimple = require('../services/selector.simple.service');

/**
 * @param {request} req
 * @param {response} res
*/
const informacionPrincipalController = async (req , res )=>{
    const codigo = req.query.codigo;
    const navegador = await BrowserSingleton.getBrowser();
    let pageUser;
    try {
        pageUser = await inicarSesionOPAC(codigo, navegador);
        const fechaExpiracion = (await selectorSimple(pageUser,constantes.FECHA_EXP)).replace(/-/g, ' ');
        const apellido = capitalize(await selectorSimple(pageUser, constantes.APELLIDO));
        const nombre = capitalize(await selectorSimple(pageUser,constantes.NOMBRE));
        const multa = await selectorSimple(pageUser, constantes.MULTA);
        const librosPrestados = await getLibrosPrestados(pageUser);
        const historialPrestamos = await getHistorialLibros(pageUser);
        res.status(200).json({
            nombre,
            apellido,
            fechaExpiracion,
            multa,
            totalLibrosEnPrestamo: librosPrestados.length,
            totalLibrosPrestado : historialPrestamos.length,
            librosPrestados,
            historialPrestamos 
         });

    } catch (error) {
        res.status(500).send(`Algo salió mal: ${error}`);
    } finally{
        if(pageUser){
            await pageUser.close();
        }
    }
}

module.exports = {
    informacionPrincipalController
}