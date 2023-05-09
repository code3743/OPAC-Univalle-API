
const LibroEnPrestamo  = require('../models/libro.prestamo.model');
const {Page} = require('playwright-chromium');
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
                prestamos.push((new LibroEnPrestamo(i+1, codigo.innerText, titulo.innerText, fecha.innerText, multa.innerText)).toJson());   
            }
            return prestamos
        }
        document.querySelector('#tab_Title3').click();
        return [];
    });
    return librosPrestamo;
    } catch (error) {
        throw Error(`No se pudo obtener los libros: ${error}`);
    }
}


module.exports = {
    getLibrosPrestados
}