const {Page} = require('playwright-chromium');
/**
 * @param {Page} page
 * @param {string} selector
 *
*/
const selectorSimple = async(page, selector)=>{
    return await page.evaluate((query)=>{
        return document.querySelector(query).textContent;
    }, selector);
}


module.exports = selectorSimple;