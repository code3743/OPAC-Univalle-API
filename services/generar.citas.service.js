const axios = require('axios');
const logger = require('../utils/logger');
const ErrorOPAC = require('./error/error');

/** 
 * @param {string} ISBN 
 */
const generarCitaPorISBN = async (ISBN)=>{
    try {
        const responseDataId = await axios.get('https://www.googleapis.com/books/v1/volumes',{
            params : { 'q':`isbn:${ISBN}`}});
        if(!responseDataId.data.items){
           throw ErrorOPAC('No se pudo generar la cita');
        }
        const id = responseDataId.data.items[0].id;
        const responseDataBook = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const infoLibro = responseDataBook.data.volumeInfo;
        const autores = infoLibro.authors.map((author, index) => {
            const nombreCompleto = author.split(' ');
            const apellido = nombreCompleto.pop();
            const iniciales = nombreCompleto.map(nombre => `${nombre.charAt(0)}.`);
            const autorFormatoAPA = `${apellido}, ${iniciales.join('')}`;
            return index === infoLibro.authors.length - 1 ? `& ${autorFormatoAPA}` : autorFormatoAPA;
          }).join(', ');
        const anioPublicacion = infoLibro.publishedDate.substring(0, 4);
        const tituloLibro = infoLibro.title;
        const numeroEdicion = infoLibro.edition ? `(${infoLibro.edition} ed.).` : '';
        const subtitulo = infoLibro.subtitle ? `: ${infoLibro.subtitle.charAt(0).toUpperCase() + infoLibro.subtitle.slice(1)}.` : ''; 
        const editorial = infoLibro.publisher;

        const citaAPA = `${autores} (${anioPublicacion}). ${tituloLibro}${subtitulo} ${numeroEdicion} ${editorial}`;
          
        return {
            autores,
            anioPublicacion : `(${anioPublicacion}).`,
            tituloLibro,
            subtitulo,
            numeroEdicion,
            editorial,
            citaAPA
        };
    } catch (error) {
        logger.error(error);
        if(error instanceof ErrorOPAC){
            throw error;
        }
        throw 'Algo salio mal';
    }
    
}

module.exports = generarCitaPorISBN;