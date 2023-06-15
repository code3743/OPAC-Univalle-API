
const {Page} = require('playwright-chromium');
const LibroEnPrestamo  = require('../models/libro.prestamo.model');
const logger = require('../utils/logger');
const ErrorOPAC = require('./error/error');
/**
 * @param {Page} page
*/
const getLibrosPrestados = async (page) =>{
    try {
    const librosPrestamo =  await page.evaluate(()=>{
        if(document.querySelector('#tabcontent_Title1>#user_tab_loan>.details_tab_copy>.tabcont_vscroll_full>table>tbody') != null){
            const libros = document.querySelector('.details_tab_copy').querySelectorAll('table>tbody>tr')
            const prestamos = [];
            for(let i=0; i<libros.length - 1; i++){
                const [codigo, titulo, _ , fecha, multa] = libros[i + 1].querySelectorAll('td');
                const fechaFormat = fecha.innerText.split(' ')[0].replace(/-/g, ' ');
                prestamos.push((new LibroEnPrestamo(i+1, codigo.innerText, titulo.innerText, fechaFormat, multa.innerText)).toJson());   
            }
            return prestamos
        }
        document.querySelector('#tab_Title3').click();
        return [];
    });
    return librosPrestamo;
    } catch (error) {
        logger.error(error);
        throw new ErrorOPAC('No se puedo obtener los ejemplares prestados');
    }
}


module.exports = {
    getLibrosPrestados
}