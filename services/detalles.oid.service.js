const { BrowserContext} = require('playwright-chromium');
const constantes = require('../config/constantes');
const  detallesMaterial  = require('./detalle.material.service');
const logger = require('../utils/logger');
const ErrorOPAC = require('./error/error');
/**
 * @param {BrowserContext} navegador
 * @param {string} oid
*/
const detallesOID = async (navegador, oid) => {
    try {
        const page = await navegador.newPage();
        await page.goto(`${constantes.URL}?oid=${oid}`);
        await page.waitForLoadState();
        const detallesLibro = await detallesMaterial(page, 8500, false);
        return detallesLibro;
    } catch (error) {
        logger.error(error);
        throw new ErrorOPAC('No se puede mostrar informacion');
    }
}

module.exports = {
    detallesOID
}