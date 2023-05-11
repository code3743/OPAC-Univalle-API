class LibroBusqueda {
    #id ;
    #nombre ;
    #autor ;
    #ISBN ;
    #detalle ;
    #ejemplares ;
    #imagenUrl ;
    /**
     * 
     * @param {string} id 
     * @param {string} nombre 
     * @param {string} autor 
     * @param {string} detalle 
     * @param {string} ejemplares 
     */
    constructor(id, nombre, autor, detalle, ejemplares,) {
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

 /**
     * @return {{
     *  id: string,
     *  nombre: string,
     *  autor: string,
     *  ISBN: string | null,
     *  detalle: string,
     *  ejemplares: string,
     *  imagenUrl:string | null
     * }} 
     */
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