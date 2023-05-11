class LocalizacionEjemplar {
    #codigo ;
    #localizacion ;
    #estante ;
    #signatura ;
    #coleccion ;
    #estado ;
    #categoria ;
    /**
     * 
     * @param {string} codigo 
     * @param {string} localizacion 
     * @param {string} estante 
     * @param {string} signatura 
     * @param {string} coleccion 
     * @param {string} estado 
     * @param {string} categoria 
     */
    constructor(codigo, localizacion, estante, signatura, coleccion, estado, categoria) {
        this.#codigo = codigo;
        this.#localizacion = localizacion;
        this.#estante = estante;
        this.#signatura = signatura;
        this.#coleccion = coleccion;
        this.#estado = estado;
        this.#categoria = categoria;
    }
  
   toJson() {
        return {
            codigo: this.#codigo,
            localizacion: this.#localizacion,
            estante: this.#estante,
            signatura: this.#signatura,
            coleccion: this.#coleccion,
            estado: this.#estado,
            categoria: this.#categoria,
        }
    }
}

module.exports = LocalizacionEjemplar;