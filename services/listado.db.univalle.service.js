const axios = require('axios');
const https = require('https');
const cheerio = require('cheerio');
const logger = require('../utils/logger');
const constantes = require('../config/constantes');

const agent = new https.Agent({
    rejectUnauthorized: false
  });

const listadoDBUnivalle = async()=>{
    try{ 
    const html =  await axios.get(constantes.URL_BIBLIOTECA+constantes.LISTADO_DB, { httpsAgent: agent });
    const $ = cheerio.load(html.data);
    const basesDeDatosUnivalle = $('.fancypantsaccordionholder > .accordion > .accordion-item');
    const datosProcesados = [];

basesDeDatosUnivalle.each((index, db) => {
  const accContent = $(db).find('.acc-content');
  if (accContent.find('table > tbody').length > 0) {
    const titulo = $(db).find('.headerlink').contents().filter(function () {
        return this.type === 'text';
      }).text().trim();
    const logoHTML = accContent.find('table > tbody tr:nth-child(2) td img');
    const logoUrl = constantes.URL_BIBLIOTECA + $(logoHTML[logoHTML.length - 1]).attr('src');
    const url = accContent.find('table > tbody tr:nth-child(2) td a').attr('href');
    const descripcion = accContent.find('.acc-content > p:not(:has(a, img))');
    const descripcionText = [];
    
    descripcion.each((_, des) => {
      descripcionText.push($(des).text());
    });
   
    const idioma = descripcionText.length > 1 ? descripcionText.pop() : '';
    datosProcesados.push({titulo, logoUrl, url, descripcion: descripcionText, idioma });
  }
});
    return datosProcesados;
    } catch(e){
        logger.error(e);
        throw e;
    }
}

module.exports = listadoDBUnivalle;