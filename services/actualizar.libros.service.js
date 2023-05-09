const { Page } = require('playwright-chromium');

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

        await page.waitForTimeout(2000);

        const getEstado = await page.evaluate((index) => {
            const libros = document.querySelector('.details_tab_copy').querySelectorAll('table>tbody>tr');
            return libros[index].querySelectorAll('td')[5].innerText;
        }, indexLibro);

        return {
            total: 1,
            nueva_fecha: [getEstado]
        }

    } catch (error) {
        throw Error(`Error al tratar de actualizar el libro ${indexLibro},\n${error}`);
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
        await page.waitForTimeout(2000);
        const getFechasLibrosActualizados = await page.evaluate(() => {
            const libros = document.querySelector('.details_tab_copy').querySelectorAll('table>tbody>tr');
            const estados = [];
            for (let i = 0; i < libros.length - 1; i++) {
                estados.push(libros[i + 1].querySelectorAll('td')[5].innerText);
            }
            return estados;
        });
        return {
            total: getFechasLibrosActualizados.length,
            nueva_fecha: getFechasLibrosActualizados
        }

    } catch (error) {
        throw Error(`Error al tratar de actualizar el libro ${indexLibro},\n${error}`);
    }
};


module.exports = {
    actualizarLibro,
    actualizarTodo
}