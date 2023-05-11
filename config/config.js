const { chromium } = require('playwright-chromium');
const generarScriptModels = require('./scripts.models');

const options = {
  headless: true, // Ejecutar sin interfaz gráfica
  args: ['--no-sandbox'] // Parámetros de Chromium
};

class BrowserSingleton {
  static singleton = null;

  static async getBrowser() {
    if (!BrowserSingleton.singleton) {
      const navegador = await chromium.launch(options);
      const context = await navegador.newContext();
      generarScriptModels.forEach(async (script) => {
        await context.addInitScript({
          content: script
        });
      });
      BrowserSingleton.singleton = context;
    }
    return BrowserSingleton.singleton;
  }
}

module.exports = BrowserSingleton;
