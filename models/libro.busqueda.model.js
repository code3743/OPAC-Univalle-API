class LibroBusqueda {
    #id ;
    #nombre ;
    #autor ;
    #ISBN ;
    #detalle ;
    #ejemplares ;
    #imagenUrl ;
    constructor(id = '', nombre = '', autor = '', detalle = '', ejemplares = '',) {
        this.#id = id;
        this.#nombre = nombre;
        this.#autor = autor;
        this.#ISBN = null;
        this.#detalle = detalle;
        this.#ejemplares = ejemplares;
        this.#imagenUrl = null;
    }

    /**
     * @param {string} imagenUrl
     */
    set imagenUrl(imagenUrl) {
        this.#imagenUrl = imagenUrl;
    }

    /**
     * @param {string} ISBN
     */
    set ISBN(ISBN) {
        this.#ISBN = ISBN;
    }


    toJson() {
        return {
            id: this.#id,
            nombre: this.#nombre,
            autor: this.#autor,
            ISBN: this.#ISBN,
            detalle: this.#detalle,
            ejemplares: this.#ejemplares,
            imagenUrl: this.#imagenUrl,
        }
    }

}

module.exports = LibroBusqueda;