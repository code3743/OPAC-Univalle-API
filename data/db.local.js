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
  init() {
    for (const facultades of this.#datos.categorias) {
      const ruta = path.join(this.#rutaDBCategorias, `${facultades.id}.json`);
      if (!existeArchivo(ruta)) {
        console.log("Creando DB");
        this.#buscarEjemplares();
        return;
      }
    }
    console.log("DB Inicializada");
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
        console.log("Libros creados de la facultad: ", facultades.facultad, " creados con exito");
      }
    }
  }
}

module.exports = DbLocal;
