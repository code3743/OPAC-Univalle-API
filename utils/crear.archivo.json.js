const fs = require('fs');
const logger = require('./logger');
/**
 * @param {string} ruta 
 * @param {{}} data 
 * @returns {{}}
 */

const crearArchivoJSON = (ruta, data) => {
    try{
        const datosJSON = JSON.stringify(data, null, 2);
        fs.writeFileSync(ruta, datosJSON, 'utf8');
        return true;
    }catch(e){
        logger.error(e);
        return false;
    }
}

module.exports = crearArchivoJSON;