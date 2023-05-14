const constantes = require('../config/constantes');
const { BrowserContext} = require('playwright-chromium');

/**
 * @param {string} codigo
 * @param {BrowserContext} navegador
 * @returns {Promise<Page>}
*/
const inicarSesionOPAC = async (codigo, navegador) => {
    try {
        const page = await navegador.newPage();
        await page.goto(constantes.URL);
        await page.waitForLoadState();
        await page.fill(constantes.INPUT_LOGIN, codigo);
        await page.evaluate((selector) => {
            document.querySelector(selector).click();
        }, constantes.BOTTON_LOGIN);
        await page.waitForTimeout(3000)
        const evaluarUsuario = await page.evaluate((query) => {
            return document.querySelector(query) == null;
        }, constantes.LOGIN_SELECTOR);
        if (!evaluarUsuario) {
            throw Error('El usuario no existe');
        }
        await page.waitForSelector(constantes.BODY_SELECTOR);
        return page;
    } catch (error) {
        throw Error('No se pudo iniciar sesion: ' + error);
    }
}


module.exports = {
    inicarSesionOPAC
}