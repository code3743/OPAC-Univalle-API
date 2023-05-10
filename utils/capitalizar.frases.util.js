const capitalize = (texto)=>{
    return texto.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

module.exports = capitalize;