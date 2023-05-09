const { chromium } = require('playwright-chromium');
const generarScriptModels = require('./scripts.models');

const options = {
  headless: true, // Ejecutar sin interfaz gráfica
  args: ['--no-sandbox'] // Parámetros de Chromium
};

const browser = async () => {
  const navegador = await chromium.launch(options);
  const context = await navegador.newContext();
  generarScriptModels.forEach(async (script) => {
    await context.addInitScript({
      content: script
    })
  });
  return context;
}

module.exports = {
  browser
};
