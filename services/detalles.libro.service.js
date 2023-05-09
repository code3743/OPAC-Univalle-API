const constantes = require('../config/constantes');
const LocalizacionEjemplar = require('../models/localizacion.ejemplar.model');
const { Browser} = require('playwright-chromium');
/**
 * @param {Browser} navegador
 * @param {string} id
*/
const detallesLibro = async (navegador, id) => {
    try {
        const page = await navegador.newPage();
        await page.goto(constantes.URL + `?oid=${id}`);
        await page.waitForLoadState();
        await page.waitForTimeout(20000);
        const imagen = await page.evaluate(() => {
            if (document.querySelector('#details_bkjacket>a') != null) {
                return document.querySelector('#details_bkjacket>a').href.replace('-M.', '-L.')
            }
            return null;
        });
        const resumen = await page.evaluate(() => {
            if (document.querySelector('div#details_abstract_tab>div.details_tab_other') != null) {
                return document.querySelector('div#details_abstract_tab>div.details_tab_other').innerText;
            }
            return 'Resumen no disponible';
        });

        const localizacion = await page.evaluate(() => {
            if (document.querySelector('.details_tab_copy.tabcont_vscroll_full>table>tbody') === null) {
                return [];
            }
            const contenido = document.querySelector('.details_tab_copy.tabcont_vscroll_full>table>tbody').querySelectorAll('tr');
            const disponibilidad = [];
            for (let i = 0; i < disponibilidad.length; i++) {
                const contenidoEjemplar = contenido[i + 1].querySelectorAll('td');
                const detalle = [];
                contenidoEjemplar.forEach((ubicacion) => {
                    detalle.push(ubicacion.innerText);
                });
                const [codigo, localizacion, estante, signatura, coleccion, estado, categoria] = detalle;
                disponibilidad.push((new LocalizacionEjemplar(codigo, localizacion, estante, signatura, coleccion, estado, categoria)).toJson());
            }
            return disponibilidad;
        });

        return {
            imagen,
            resumen,
            disponibilidad : localizacion
        }

    } catch (error) {
        throw Error(`Error al tratar de buscar el libro ${nombreLibro},\n${error}`);
    }
}


module.exports = {
    detallesLibro
}