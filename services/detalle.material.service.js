const { Page } = require("playwright-chromium");
const LocalizacionEjemplar = require("../models/localizacion.ejemplar.model");
const logger = require("../utils/logger");
const ErrorOPAC = require("./error/error");
/**
 * @param {Page} page
 * @param {number} tiempoEspera
 * @param {boolean} busquedaDirecta

*/
const detallesMaterial = async (
  page,
  tiempoEspera = 1000,
  busquedaDirecta = true
) => {
  try {
    await page.waitForTimeout(tiempoEspera);
    if (busquedaDirecta) {
      await page.waitForFunction(
        () =>
          document.querySelector("#results") &&
          document.querySelector("#results").textContent !==
            "Ejecutando su búsqueda. Por favor espere ..."
      );
    }

    const nombre = await page.evaluate(() => {
      if (document.querySelector(".details_title"))
        return document.querySelector(".details_title").innerText;
      return "";
    });

    const autores = await page.evaluate(() => {
      if (document.querySelector(".details_otherrow_col2"))
        return document.querySelector(".details_otherrow_col2").innerText;
      return "";
    });

    const publicacion = await page.evaluate(() => {
        document.querySelector('.details_otherrow_col2').remove();
      if (document.querySelector(".details_otherrow_col2"))
        return document.querySelector(".details_otherrow_col2").innerText;
      return "";
    });

    const imagen = await page.evaluate(() => {
      if (document.querySelector("#details_bkjacket>a") != null) {
        return document
          .querySelector("#details_bkjacket>a")
          .getAttribute("href")
          .replace("-M.", "-L.");
      }
      return null;
    });
    const resumen = await page.evaluate(() => {
      if (
        document.querySelector(
          "div#details_abstract_tab>div.details_tab_other"
        ) != null
      ) {
        return document.querySelector(
          "div#details_abstract_tab>div.details_tab_other"
        ).textContent;
      }
      return "Resumen no disponible";
    });
    const localizacion = await page.evaluate(() => {
      if (
        document.querySelector(
          ".details_tab_copy.tabcont_vscroll_full>table>tbody"
        ) === null
      ) {
        return [];
      }
      const contenido = document
        .querySelector(".details_tab_copy.tabcont_vscroll_full>table>tbody")
        .querySelectorAll("tr");
      const disponibilidad = [];
      for (let i = 0; i < contenido.length - 1; i++) {
        const contenidoEjemplar = contenido[i + 1].querySelectorAll("td");
        const [
          codigo,
          localizacion,
          estante,
          signatura,
          coleccion,
          estado,
          categoria,
        ] = contenidoEjemplar;
        disponibilidad.push(
          new LocalizacionEjemplar(
            codigo.innerText,
            localizacion.innerText,
            estante.innerText,
            signatura.innerText,
            coleccion.innerText,
            estado.innerText,
            categoria.innerText
          ).toJson()
        );
      }
      return disponibilidad;
    });
    return {
      nombre,
      autores,
      publicacion,
      imagen,
      resumen,
      disponibilidad: localizacion,
    };
  } catch (error) {
    logger.error(error);
    throw new ErrorOPAC("No se pudo obtener los detalles");
  }
};

module.exports = detallesMaterial;
