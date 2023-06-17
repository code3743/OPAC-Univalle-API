const path = require("path");
const constantes = require("../config/constantes");
const lanzarNavegador = require("../config/config");
const existeArchivo = require("../utils/existe.archivo");
const leerArchivoJSON = require("../utils/leer.archivos.json");
const crearArchivoJSON = require("../utils/crear.archivo.json");
const { recomendacion } = require("../services/recomendaciones.service");

class DbLocal {
  #datos = {};
  #rutaCategorias = path.join(__dirname, "categorias.json");
  #rutaDBCategorias = path.join(__dirname, "db");
  constructor() {
    this.#datos = leerArchivoJSON(this.#rutaCategorias);
  }
  datos() {
    for (const facultades of this.#datos.categorias) {
      const ruta = path.join(this.#rutaDBCategorias, `${facultades.id}.json`);
      if (!existeArchivo(ruta)) {
        this.#buscarEjemplares();
        return;
      }
    }
    console.log("Libros encontrados en la DB");
    return;
  }

  async #buscarEjemplares() {
    const navegador = await lanzarNavegador();
    const page = await navegador.newPage();
    await page.goto(constantes.URL);
    await page.waitForLoadState();
    for (const facultades of this.#datos.categorias) {
      const librosRecomendados = [];
      for (const libro of facultades.libros) {
        librosRecomendados.push(...(await recomendacion(page, libro)));
      }
      const ruta = path.join(this.#rutaDBCategorias, `${facultades.id}.json`);
      if (
        crearArchivoJSON(ruta, {
          id: facultades.id,
          facultad: facultades.facultad,
          libros: librosRecomendados,
        })
      ) {
        console.log("Libros consultados facultad: ", facultades.facultad);
      }
    }
  }
}

module.exports = DbLocal;
