const fs = require('fs');
const logger = require('./logger');
/**
 * 
 * @param {string} ruta 
 * @returns {{}}
 */
const  leerArchivoJSON = (ruta) => {
    try{
        const contenido = fs.readFileSync(ruta);
        const data = JSON.parse(contenido);
        return data;
    }catch(e){
        logger.error(e);
        return {};
    }
}

module.exports = leerArchivoJSON;
