const {request, response} = require('express');
const { inicarSesionOPAC } = require('../services/auth.service');
const { getLibrosPrestados } = require('../services/libros.prestamo.service');
const { getHistorialLibros } = require('../services/historial.libros.service');
const constantes = require('../config/constantes');
const capitalize = require('../utils/capitalizar.frases.util');
const selectorSimple = require('../services/selector.simple.service');
const lanzarNavegador = require('../config/config');

/**
 * @param {request} req
 * @param {response} res
*/
const informacionPrincipalController = async (req , res )=>{
    const codigo = req.query.codigo;
    const navegador = await lanzarNavegador();
    let pageUser ;
    try {
        pageUser = await inicarSesionOPAC(codigo, navegador);
        const fechaExpiracion = (await selectorSimple(pageUser,constantes.FECHA_EXP)).replace(/-/g, ' ');
        const apellido = capitalize(await selectorSimple(pageUser, constantes.APELLIDO));
        const nombre = capitalize(await selectorSimple(pageUser,constantes.NOMBRE));
        const programa = (await selectorSimple(pageUser, constantes.PROGRAMA_ACADEMICO)).split(' - ')[0];
        const multa = await selectorSimple(pageUser, constantes.MULTA);
        const librosPrestados = await getLibrosPrestados(pageUser);
        const historialPrestamos = await getHistorialLibros(pageUser);
        res.status(200).json({
            nombre,
            apellido,
            fechaExpiracion,
            programa,
            multa,
            totalLibrosEnPrestamo: librosPrestados.length,
            totalLibrosPrestado : historialPrestamos.length,
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