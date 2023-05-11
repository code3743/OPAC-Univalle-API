const {Page} = require('playwright-chromium');
/**
 * @param {Page} page
 * @param {string} selector
 * @returns {Promise<string>}
*/
const selectorSimple = async(page, selector)=>{
    return await page.evaluate((query)=>{
        return document.querySelector(query).innerText;
    }, selector);
}


module.exports = selectorSimple;