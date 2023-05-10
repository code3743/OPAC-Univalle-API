const  LibroEnPrestamo  = require('../models/libro.prestamo.model');

const { Page} = require('playwright-chromium');
/**
 * @param {Page} page
*/
const getHistorialLibros = async (page) =>{
    try {
    const historialPrestamo =  await page.evaluate(()=>{
        if(document.querySelector('#tabcontent_Title3>#user_tab_hist>.details_tab_copy>table>tbody') != null){
            const  libros = document.querySelector('.details_tab_copy>table>tbody').querySelectorAll('tr');
            const historial = [];
            for(let i=0; i<libros.length - 1; i++){
               const [codigo, titulo, _ , __ , fecha] = libros[i + 1].querySelectorAll('td');
               const fechaFormat = fecha.innerText.split(' ')[0].replace(/-/g, ' ');
                historial.push((new LibroEnPrestamo(undefined, codigo.innerText, titulo.innerText, fechaFormat, undefined)).toJson());
            }
            return historial;
        }
       return [];
    });
    return historialPrestamo;
    } catch (error) {
        throw Error(`No se pudo obtener el historial: ${error}`);
    }

}


module.exports = {
    getHistorialLibros
}