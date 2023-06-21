const { Page } = require('playwright-chromium');
const logger = require('../utils/logger');
const ErrorOPAC = require('./error/error');


/**
 * @param {Page} page
 * @param {number} indexLibro
*/
const actualizarLibro = async (page, indexLibro) => {
    try {
        await page.evaluate((index) => {
            const libros = document.querySelector('.details_tab_copy').querySelectorAll('table>tbody>tr');
            libros[index].querySelectorAll('td')[5].querySelector('span>img').click();
        }, indexLibro);

        await page.waitForTimeout(2500);

        const getEstado = await page.evaluate((index) => {
            const libros = document.querySelector('.details_tab_copy').querySelectorAll('table>tbody>tr');
            return libros[index].querySelectorAll('td')[5].innerText;
        }, indexLibro);

        return {
            total: 1,
            estado: [getEstado]
        }

    } catch (error) {
        logger.error(error);
        throw new ErrorOPAC('Error al tratar de actualizar los libros');
    }
};


/**
 * @param {Page} page
*/
const actualizarTodo = async (page) => {
    try {
        await page.evaluate(() => {
            document.querySelector('img[title="Renovar todos los artículos"]').click();
        });
        await page.waitForTimeout(2500);
        const getFechasLibrosActualizados = await page.evaluate(() => {
            const libros = document.querySelector('.details_tab_copy').querySelectorAll('table>tbody>tr');
            const estados = [];
            for (let i = 1; i < libros.length; i++) {
                estados.push(libros[i].querySelectorAll('td')[5].innerText);
            }
            return estados;
        });
        return {
            total: getFechasLibrosActualizados.length,
            estados: getFechasLibrosActualizados
        }

    } catch (error) {
        logger.error(error);
        throw new ErrorOPAC('Error al tratar de actualizar los libros');
    }
};


module.exports = {
    actualizarLibro,
    actualizarTodo
}