const constantes = require('../config/constantes');
const { Browser} = require('playwright-chromium');

/**
 * @param {string} codigo
 * @param {Browser} nav
*/
const inicarSesionOPAC = async (codigo, nav) => {
    try {
        const page = await nav.newPage();
        await page.goto(constantes.URL);
        await page.waitForLoadState();
        await page.fill(constantes.INPUT_LOGIN, codigo);
        await page.evaluate((selector) => {
            document.querySelector(selector).click();
        }, constantes.BOTTON_LOGIN);
        await page.waitForTimeout(5000)
        const evaluarUsuario = await page.evaluate(() => {
            return document.querySelector('#login1') == null;
        });
        if (!evaluarUsuario) {
            throw Error('El usuario no existe');
        }
        return page;
    } catch (error) {
        throw Error('Error al tratar de inicar sesión ' + error);
    }
}


module.exports = {
    inicarSesionOPAC
}