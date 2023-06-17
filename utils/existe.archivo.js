const fs = require('fs');
const logger = require('./logger');

/**
 * 
 * @param {string} ruta 
 * @return {boolean} 
 */
const existeArchivo = (ruta)=>{
    try {
        return fs.existsSync(ruta);
    } catch (e) {
        logger.error(e);
        return false;
    }

}

module.exports = existeArchivo;