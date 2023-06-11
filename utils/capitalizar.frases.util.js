/**
 * @param {string} texto 
 * @returns {string}
 */
const capitalize = (texto) => {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};

module.exports = capitalize;