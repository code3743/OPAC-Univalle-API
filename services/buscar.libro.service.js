const constantes = require('../config/constantes');
const LibroBusqueda = require('../models/libro.busqueda.model');

const { BrowserContext} = require('playwright-chromium');

/**
 * @param {BrowserContext} navegador
 * @param {string} nombreLibro
*/
const buscarLibro = async (navegador, nombreLibro) => {
    try {
        const page = await navegador.newPage();
        await page.goto(constantes.URL);
        await page.waitForLoadState();
        await page.fill(constantes.INPUT_SEARCH, nombreLibro);
        await page.click(constantes.BOTTON_SEARCH);
        await page.waitForTimeout(5000);
        const resultadoBusqueda = await page.evaluate(() => {
            if (document.querySelector('.title_hitlist>table>tbody') === null) {
                return [];
            }
            const resultados = document.querySelector('.title_hitlist>table>tbody').querySelectorAll('.hitlist_ticol');
            const libros = [];
            for (let i = 0; i < resultados.length; i++) {
                const id = resultados[i].querySelector('.resultsbright>a').id.replace('hitlabel', '');
                const nombre = resultados[i].querySelector('.resultsbright').innerText;
                const autor = resultados[i].querySelector('.extras').innerText.split('\n')[1];
                const detalle = resultados[i].querySelector('.tihitlist_l3').innerText.split('\n')[0].replace(' ', '');
                const ejemplares = resultados[i].querySelector('.tihitlist_l3').innerText.split('\n')[1];
                const infoLibro = new LibroBusqueda(id,nombre,autor,detalle,ejemplares);
                if(resultados[i].querySelector('.extras').innerText.includes('ISBN: ')){
                    const ISBN = resultados[i].querySelector('.extras').innerText.split('\n')[2].replaceAll('ISBN: ','');
                    infoLibro.ISBN = ISBN;
                    infoLibro.imagenUrl = `http://covers.openlibrary.org/b/isbn/${ISBN}-L.jpg`
                }
                libros.push(infoLibro.toJson());
            }
            return libros
        });

        return resultadoBusqueda;
    } catch (error) {
        throw Error(`Error al tratar de buscar el libro ${nombreLibro},\n${error}`);
    }
}


module.exports = {
    buscarLibro
}