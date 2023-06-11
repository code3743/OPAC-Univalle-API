const constantes = require('../config/constantes');
const { BrowserContext} = require('playwright-chromium');
const logger = require('../utils/logger');
const ErrorOPAC = require('./error/error');

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
            throw new ErrorOPAC('El usuario no existe', 'AuthOpac');
        }
        await page.waitForSelector(constantes.BODY_SELECTOR);
        return page;
    } catch (error) {
        logger.error(error);
        if(error instanceof ErrorOPAC){
            throw error;
        }
        throw Error('Algo salio mal: ' + error);
    }
}


module.exports = {
    inicarSesionOPAC
}