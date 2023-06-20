const axios = require('axios');
const https = require('https');
const cheerio = require('cheerio');
const logger = require('../utils/logger');
const constantes = require('../config/constantes');

const agent = new https.Agent({
    rejectUnauthorized: false
  });

const extraerNoticias  = async ()=>{
    try {
        const html =  await axios.get(constantes.URL_BIBLIOTECA, { httpsAgent: agent });
        const $ = cheerio.load(html.data);
        const noticias = [];
        const totalNoticias = $('.smart-slider-border2 .smart-slider-layer a img').length

        for (let i = 0; i < totalNoticias; i++) {
            const href = $('.smart-slider-border2 .smart-slider-layer > div > a').eq(i).attr('href');
            const src = $('.smart-slider-border2 .smart-slider-layer a img').eq(i).attr('src');
            noticias.push({
                img : src,
                url : href
            });
        }
        return noticias;
    } catch (e) {
        logger.error(e);
        throw e;
    }
}


module.exports = extraerNoticias;