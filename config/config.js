const { chromium} = require('playwright-chromium');

const options = {
  headless: true, // Ejecutar sin interfaz gráfica
  args: ['--no-sandbox'] // Parámetros de Chromium
};

const browser = async () => await chromium.launch(options);

module.exports = {
  browser
};
