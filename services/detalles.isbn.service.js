const constantes = require('../config/constantes');
const { BrowserContext} = require('playwright-chromium');
const { detallesMaterial } = require('./detalle.material.service');
/**
 * @param {BrowserContext} navegador
 * @param {string} isbn
*/
const detallesISBN = async (navegador, isbn) => {
    try {
        const page = await navegador.newPage();
        await page.goto(constantes.URL);
        await page.waitForLoadState();
        await page.fill(constantes.INPUT_SEARCH, isbn);
        await page.click(constantes.BOTTON_SEARCH);
        const detallesLibro = await detallesMaterial(page);
        return detallesLibro;
    } catch (error) {
        throw Error(`Error al tratar de buscar ${isbn},\n${error}`);
    }
}

module.exports = {
    detallesISBN
}