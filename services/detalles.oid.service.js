const constantes = require('../config/constantes');
const { BrowserContext} = require('playwright-chromium');
const { detallesMaterial } = require('./detalle.material.service');
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
        throw Error(`Error al tratar de buscar ${oid},\n${error}`);
    }
}

module.exports = {
    detallesOID
}